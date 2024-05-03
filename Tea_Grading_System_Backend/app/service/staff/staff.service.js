const { staff, Hotel, Designation, User } = require('../../models');

const BaseService = require('../base.service');

const Sequelize = require('sequelize');

const log4js = require('../../../config/log4js');
const log = log4js.getLogger('staff.service.js');

/**
 *
 * @param {*} page
 * @param {*} itemPerPage
 * @param {*} query
 * @param {*} status
 */
exports.getAll = (page, itemPerPage, query, headers) =>
  new Promise(async (resolve, reject) => {
    const { limit, offset } = getPagination(page, itemPerPage);
    var queryFilter = query
      ? { name: { [Sequelize.Op.like]: `%${query}%` } }
      : null;
    const user = await User.findOne({ where: { id: getToken(headers).key } });
    var condition = {
      [Sequelize.Op.and]: [queryFilter, { hotel_id: user.hotel_id }],
    };

    staff
      .findAndCountAll({
        attributes: [
          'id',
          'staff_no',
          'first_name',
          'last_name',
          'gender',
          'date_of_birth',
          'mobile',
          'email',
          'image',
          'address',
          'salary',
          'monthly_overtime',
          'overtime_amount',
          'travelling_allowance',
        ],
        include: [
          {
            model: Designation,
            as: 'designation',
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
        where: condition,
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
exports.create = (values) =>
  new Promise(async (resolve, reject) => {
    let responce = await BaseService.create(staff, values, log);
    resolve(responce);
  });

/**
 *
 * @param {*} model
 */
exports.show = (model) =>
  new Promise(async (resolve, reject) => {
    let attributes = [
      'id',
      'staff_no',
      'first_name',
      'last_name',
      'gender',
      'date_of_birth',
      'mobile',
      'email',
      'image',
      'address',
      'salary',
      'monthly_overtime',
      'overtime_amount',
      'travelling_allowance',
    ];

    const include = [
      {
        model: Designation,
        as: 'designation',
        attributes: ['id', 'name'],
      },
      {
        model: Hotel,
        as: 'hotel',
        attributes: ['id', 'name'],
      },
    ];
    let responce = await BaseService.show(
      staff,
      model,
      log,
      attributes,
      include
    );
    resolve(responce);
  });

/**
 *
 * @param {int} id
 * @param {Object} values
 * @returns{Object}
 */
exports.update = (id, values) =>
  new Promise(async (resolve, reject) => {
    if (!id) reject(new Error(`id can't be empty`));
    let responce = await BaseService.update(staff, id, values, log);
    resolve(responce);
  });

/**
 *
 * @param {int} id
 * @returns {String}
 */
exports.delete = (id) =>
  new Promise(async (resolve, reject) => {
    if (!id) reject(new Error(`id can't be empty`));
    let responce = await BaseService.delete(staff, id, log);
    resolve(responce);
  });

/**
 *
 * @param {*} query
 * @param {*} except
 * @param {*} status
 */
exports.search = (query, except, status) =>
  new Promise(async (resolve, reject) => {
    let statusData = status ? (status == 'active' ? true : null) : null;

    let queryFilter = query
      ? { name: { [Sequelize.Op.like]: `%${query}%` } }
      : null;
    let selected = except
      ? { id: { [Sequelize.Op.not]: JSON.parse(except) } }
      : null;
    let statusFilter = status ? { is_active: statusData } : null;
    let condition = {
      [Sequelize.Op.and]: [queryFilter, statusFilter, selected],
    };

    let attributes = ['id', 'first_name'];
    let values = await BaseService.search(staff, log, condition, attributes);
    resolve(values);
  });
