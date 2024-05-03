const { Room, Floor, Hotel, RoomType, User } = require('../../models');

const BaseService = require('../base.service');

const Sequelize = require('sequelize');

const log4js = require('../../../config/log4js');
const log = log4js.getLogger('rooms.service.js');

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

    const user = await User.findOne({ where: { id: getToken(headers).key } });

    var queryFilter = query
      ? { name: { [Sequelize.Op.like]: `%${query}%` } }
      : null;
    var condition = {
      [Sequelize.Op.and]: [queryFilter, { hotel_id: user.hotel_id }],
    };

    Room.findAndCountAll({
      attributes: [
        'id',
        'reference_number',
        'name',
        'phone',
        'is_smoking',
        'image',
        'remarks',
        'price',
        'is_active',
        'created_at',
      ],
      include: [
        {
          model: Floor,
          as: 'floor',
          attributes: ['id', 'name'],
        },
        {
          model: Hotel,
          as: 'hotel',
          attributes: ['id', 'name'],
        },
        {
          model: RoomType,
          as: 'roomType',
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
    let responce = await BaseService.create(Room, values, log);
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
      'reference_number',
      'name',
      'phone',
      'is_smoking',
      'image',
      'remarks',
      'price',
      'is_active',
      'created_at',
    ];

    let include = [
      {
        model: Floor,
        as: 'floor',
        attributes: ['id', 'name'],
      },
      {
        model: Hotel,
        as: 'hotel',
        attributes: ['id', 'name'],
      },
      {
        model: RoomType,
        as: 'roomType',
        attributes: ['id', 'name'],
      },
    ];
    let responce = await BaseService.show(
      Room,
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
    let responce = await BaseService.update(Room, id, values, log);
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
    let responce = await BaseService.delete(Room, id, log);
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

    let attributes = ['id', 'reference_number', 'name'];
    let values = await BaseService.search(Room, log, condition, attributes);
    resolve(values);
  });

/**
 *
 * @param {*} page
 * @param {*} itemPerPage
 * @param {*} query
 * @param {*} status
 */
exports.all = (query, start, end) =>
  new Promise(async (resolve, reject) => {
    Room.findAll({
      attributes: [
        'id',
        'reference_number',
        'name',
        'phone',
        'is_smoking',
        'image',
        'remarks',
        'price',
        'is_active',
        'created_at',
      ],
      include: [
        {
          model: Floor,
          as: 'floor',
          attributes: ['id', 'name'],
        },
        {
          model: Hotel,
          as: 'hotel',
          attributes: ['id', 'name'],
        },
        {
          model: RoomType,
          as: 'roomType',
          attributes: ['id', 'name'],
        },
      ],
      distinct: true,
    })
      .then((doc) => {
        let values;
        if (doc.length > 0) values = doc;
        else values = 'No record found.';
        resolve(values);
      })
      .catch((err) => {
        log.error(err);
        reject(err);
      });
  });
