const { Hotel } = require('../../models')

const BaseService = require('../base.service')

const Sequelize = require('sequelize')

const log4js = require('../../../config/log4js');
const log = log4js.getLogger('hotel.service.js');

/**
 * 
 * @param {*} page 
 * @param {*} itemPerPage 
 * @param {*} query 
 * @param {*} status 
 */
exports.getAll = (page, itemPerPage, query, status) => new Promise(async(resolve, reject) => {
    let statusData = status ? (status == 'active' ? true : false) : null;

    var queryFilter = query ? { name: { [Sequelize.Op.like]: `%${query}%` } } : null;
    var statusFilter = status ? { is_active: statusData } : null;
    var condition = { [Sequelize.Op.and]: [queryFilter, statusFilter] };

    let attributes = ['id', 'reference_number', 'name', 'street_address', 'city', 'country', 'zip_code', 'is_active', 'created_at'];      
    let responce = await BaseService.paginate(Hotel, page, itemPerPage, log,  condition, attributes );
    resolve(responce)


  });

/**
 * 
 * @param {*} values 
 */
exports.create = (values) =>new Promise(async(resolve, reject) => {
  let responce = await BaseService.create(Hotel, values, log);
  resolve(responce)
});

/**
 * 
 * @param {*} model 
 */
exports.show = (model) => new Promise(async(resolve, reject) => {
    let attributes = ['id', 'reference_number', 'name', 'street_address', 'city', 'country', 'zip_code', 'is_active', 'created_at'];      
  let responce = await BaseService.show(Hotel, model, log, attributes);
  resolve(responce)
});

/**
 *
 * @param {int} id
 * @param {Object} values
 * @returns{Object}
 */
exports.update = (id, values) => new Promise(async(resolve, reject) => {
    if (!id) reject(new Error(`id can't be empty`));
    let responce = await BaseService.update(Hotel, id, values, log);
    resolve(responce)
});

/**
 *
 * @param {int} id
 * @returns {String}
 */
exports.delete = (id) => new Promise(async(resolve, reject) => {
    if (!id) reject(new Error(`id can't be empty`));
    let responce = await BaseService.delete(Hotel, id, log);
    resolve(responce)
});



/**
 * 
 * @param {*} query 
 * @param {*} except 
 * @param {*} status 
 */
exports.search = (query, except, status) => new Promise( async(resolve, reject) => {
    let statusData = status ? (status == 'active' ? true : null) : null;

    let queryFilter = query ? { name: { [Sequelize.Op.like]: `%${query}%` } } : null;
    let selected = except ? { id: { [Sequelize.Op.not]: JSON.parse(except) } } : null;
    let statusFilter = status ? { is_active: statusData } : null;
    let condition = { [Sequelize.Op.and]: [queryFilter, statusFilter, selected] };

    let attributes = ['id', 'reference_number', 'name'];
    let values = await BaseService.search(Hotel, log, condition, attributes);
    resolve(values)
});
