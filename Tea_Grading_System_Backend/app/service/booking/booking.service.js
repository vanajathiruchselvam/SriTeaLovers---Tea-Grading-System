const {
  Reservation,
  Customer,
  User,
  Hotel,
  roomReservation,
  Room,
} = require('../../models');
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
exports.getAll = (page, itemPerPage, query) =>
  new Promise(async (resolve, reject) => {
    const { limit, offset } = getPagination(page, itemPerPage);
    var queryFilter = query
      ? { reference_number: { [Sequelize.Op.like]: `%${query}%` } }
      : null;
    Reservation.findAndCountAll({
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
          model: Hotel,
          as: 'hotel',
          attributes: ['id', 'name'],
        },
      ],
      limit,
      offset,
      order: [['id', 'DESC']],
      where: queryFilter,
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
    let total = sumBy(values.rooms, function (item) {
      return parseFloat(item.amount);
    });

    Reservation.create({
      ...values,
      total_amount: total,
      user_id: getToken(headers).key,
    })
      .then(async (doc) => {
        if (!doc) throw new Error('Invalid Id.');
        values.rooms.map(async (item) => {
          await roomReservation.create({
            ...item,
            reservation_id: doc.id,
          });
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
    Reservation.findOne({
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
          model: Hotel,
          as: 'hotel',
          attributes: ['id', 'name'],
        },
        {
          model: roomReservation,
          as: 'roomReservation',
          attributes: [
            'id',
            'adults',
            'child',
            'check_in',
            'check_out',
            'amount',
          ],
          include: [
            {
              model: Room,
              as: 'room',
              attributes: ['id', 'name'],
            },
          ],
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
    Reservation.findOne({
      where: { id: model },
    })
      .then((doc) => {
        if (!doc) throw new Error('Invalid Id.');
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
    Reservation.findOne({
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
