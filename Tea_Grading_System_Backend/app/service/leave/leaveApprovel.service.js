const { Leave, staff, User } = require('../../models');

const log4js = require('../../../config/log4js');
const log = log4js.getLogger('item.service.js');

/**
 *
 * @param {*} page
 * @param {*} itemPerPage
 * @param {*} query
 * @param {*} status
 */
exports.getAll = (page, itemPerPage, headers) =>
  new Promise(async (resolve, reject) => {
    const { limit, offset } = getPagination(page, itemPerPage);
    Leave.findAndCountAll({
      attributes: ['id', 'from_date', 'to_date', 'reason', 'status'],
      include: [
        {
          model: staff,
          as: 'staff',
          attributes: ['id', 'staff_no', 'first_name'],
        },
      ],
      limit,
      offset,
      order: [['id', 'DESC']],
      distinct: true,
      where: { approver_id: getToken(headers).key },
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
