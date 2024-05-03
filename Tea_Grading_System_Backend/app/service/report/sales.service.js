const { Sale, Customer, User, SaleItems, Item } = require('../../models');
const Sequelize = require('sequelize');
const log4js = require('../../../config/log4js');
const log = log4js.getLogger('sales.service.js');
const moment = require('moment');

exports.getAll = (from, to) =>
  new Promise(async (resolve, reject) => {
    let startDate = from
      ? moment(from).startOf('day').format('YYYY-MM-DD HH:mm:ss')
      : null;
    let EndDate = to
      ? moment(to).endOf('day').format('YYYY-MM-DD HH:mm:ss')
      : null;
    var DateRangeFilter;

    if (startDate != null && EndDate != null) {
      DateRangeFilter = {
        date: { [Sequelize.Op.between]: [startDate, EndDate] },
      };
    } else if (startDate != null && EndDate == null) {
      DateRangeFilter = {
        date: {
          [Sequelize.Op.between]: [
            moment(startDate).startOf('day').format('YYYY-MM-DD HH:mm:ss'),
            moment(startDate).endOf('day').format('YYYY-MM-DD HH:mm:ss'),
          ],
        },
      };
    } else {
      DateRangeFilter = null;
    }
    Sale.findAll({
      attributes: [
        'id',
        'reference_number',
        'date',
        'total_amount',
        'paid_amount',
        'status',
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
      order: [['id', 'ASC']],
      where: DateRangeFilter,
      distinct: true,
    })
      .then(resolve)
      .catch((err) => {
        log.error(err);
        reject(err);
      });
  });
