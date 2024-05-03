const { Sale, Customer, User, SaleItems, Item } = require('../../models');
const Sequelize = require('sequelize');
const { sumBy, toArray } = require('lodash');

const log4js = require('../../../config/log4js');
const log = log4js.getLogger('item.service.js');

/**
 *
 * @param {*} page
 * @param {*} itemPerPage
 * @param {*} query
 * @param {*} status
 */
exports.getAll = (page, itemPerPage, query, status) =>
  new Promise(async (resolve, reject) => {
    const { limit, offset } = getPagination(page, itemPerPage);
    Sale.findAndCountAll({
      attributes: [
        'id',
        'date',
        'reference_number',
        'paid_amount',
        'status',
        'total_amount',
        'payment_method',
      ],
      include: [
        {
          model: Customer,
          as: 'customer',
          attributes: ['id', 'full_name'],
        },
        {
          model: User,
          as: 'user',
          attributes: ['id', 'name'],
        },
        {
          model: SaleItems,
          as: 'saleItems',
          attributes: ['id', 'quantity', 'amount'],
          include: {
            model: Item,
            as: 'item',
            attributes: ['id', 'name', 'code'],
          },
        },
      ],
      limit,
      offset,
      order: [['id', 'DESC']],
      distinct: true,
    })
      .then((doc) => {
        let values;
        if (doc.rows.length > 0) values = getPagingData(doc, page, itemPerPage);
        else values = 'No record found.';
        resolve(values);
      })
      .catch((err) => {
        log.error(err);
        reject(err);
      });
  });

/**
 *
 * @param {*} values
 */
exports.create = (values, headers) =>
  new Promise(async (resolve, reject) => {
    let total = sumBy(values.items, function (item) {
      return parseFloat(item.amount) * parseInt(item.quantity);
    });

    Sale.create({
      ...values,
      total_amount: total,
      user_id: getToken(headers).key,
    })
      .then(async (doc) => {
        if (!doc) throw new Error('Invalid Id.');
        values.items.map(async (item) => {
          await SaleItems.create({
            ...item,
            sale_id: doc.id,
          });
          await updateStock(item.items_id, '-', item.quantity);
        });
        resolve(doc);
      })
      .catch((err) => {
        log.error(err);
        reject(err);
      });
  });

/**
 *
 * @param {*} model
 */
exports.show = (model) =>
  new Promise(async (resolve, reject) => {
    Sale.findOne({
      attributes: [
        'id',
        'date',
        'reference_number',
        'paid_amount',
        'status',
        'total_amount',
        'payment_method',
      ],
      include: [
        {
          model: Customer,
          as: 'customer',
          attributes: ['id', 'full_name'],
        },
        {
          model: User,
          as: 'user',
          attributes: ['id', 'name'],
        },
        {
          model: SaleItems,
          as: 'saleItems',
          attributes: ['id', 'quantity', 'amount'],
          include: {
            model: Item,
            as: 'item',
            attributes: ['id', 'name', 'code'],
          },
        },
      ],
      where: { id: model },
    })
      .then(resolve)
      .catch((err) => {
        log.error(err);
        reject(err);
      });
  });

/**
 *
 * @param {*} model
 */
exports.cancel = (model) =>
  new Promise(async (resolve, reject) => {
    Sale.findOne({
      include: [
        {
          model: SaleItems,
          as: 'saleItems',
          attributes: ['id', 'quantity', 'amount'],
          include: {
            model: Item,
            as: 'item',
            attributes: ['id', 'name', 'code'],
          },
        },
      ],
      where: { id: model },
    })
      .then((doc) => {
        if (!doc) throw new Error('Invalid Id.');
        if (doc && doc.saleItems != 0) {
          doc.saleItems.map(async (item) => {
            await updateStock(item.items_id, '+', item.quantity);
          });
        }
        doc.update({
          status: 'Cancelled',
        });
        resolve(true);
      })
      .catch((err) => {
        log.error(err);
        reject(err);
      });
  });

/**
 *
 * @param {*} model
 */
exports.payment = (model, values) =>
  new Promise(async (resolve, reject) => {
    Sale.findOne({
      where: { id: model },
    })
      .then(async (doc) => {
        if (!doc) throw new Error('Invalid Id.');
        var paidAmount =
          parseFloat(doc.paid_amount) + parseFloat(values.paid_amount);

        let status;

        if (doc.total_amount <= paidAmount) {
          status = 'Completed';
        }
        if (doc.total_amount > paidAmount) {
          status = 'PartiallyPaid';
        }

        await doc.update({
          payment_method: values.payment_method,
          paid_amount: paidAmount,
          status: status,
        });

        resolve(true);
      })
      .catch((err) => {
        log.error(err);
        reject(err);
      });
  });

const updateStock = (item, operator, count) => {
  if (!item) reject(new Error(`item can't be empty`));
  if (!count) reject(new Error(`count can't be empty`));
  if (!operator) reject(new Error(`operator can't be empty`));

  Item.findOne({ where: { id: item } }).then(async (doc) => {
    let totalCount = 0;
    if (operator === '+') {
      totalCount = parseInt(doc.available_stock) + parseInt(count);
    }
    if (operator === '-') {
      totalCount = parseInt(doc.available_stock) - parseInt(count);
    }
    doc.update({
      available_stock: totalCount,
    });
    return 'count Successfully Updated';
  });
};
