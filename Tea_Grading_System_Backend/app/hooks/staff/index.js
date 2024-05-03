const hooks = require('../hooks');

module.exports = (Staff) => {
  Staff.addHook('afterCreate', async (doc) => {
    const staffNo = await hooks.generateByCount(Staff, 'SR');
    Staff.update({ staff_no: staffNo }, { where: { id: doc.id } });
  });
};
