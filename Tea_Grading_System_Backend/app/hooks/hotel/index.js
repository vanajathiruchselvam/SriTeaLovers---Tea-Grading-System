const hooks = require('../hooks');

module.exports = (Hotel) => {
    Hotel.addHook('afterCreate', async (doc) => {
    const referenceNumber = await hooks.generateByCount(Hotel, 'HR');
    Hotel.update({ reference_number: referenceNumber }, { where: { id: doc.id } });
  });
};
