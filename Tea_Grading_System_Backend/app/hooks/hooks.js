const moment = require('moment');


exports.generateByDate =  async (Model, date, field, prefix, sequelize) => {
  if (!date) reject(new Error(`Date can't be empty`))
  const created = { [sequelize.options.operatorsAliases.between]: [ moment(date).startOf('day').format('YYYY-MM-DD HH:mm:ss') ,  moment(date).endOf('day').format('YYYY-MM-DD HH:mm:ss')] }

 return await Model
    .count({ where: { [field]: created } })
    .then(data => {
      let count ;
      count = data+1

      let referenceNumber = `${prefix}-${ moment(created).format('DD-MM-YYYY')}-${count}`;
      return Promise.resolve(referenceNumber)
    })
    .catch(err =>  {
      return Promise.reject(err)
    })
}

exports.generateByCount = async (Model, prefix) => {
  return await Model
    .count()
    .then(doc => {
        let count = doc + 1
       let referenceNumber = `${prefix}-${ moment().format('DD-MM-YYYY')}-${count}`;
      return Promise.resolve(referenceNumber)
    })
    .catch(err =>  {
      return Promise.reject(err)
    })
}
