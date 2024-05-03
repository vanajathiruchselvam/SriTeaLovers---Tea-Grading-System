const hooks  = require('../hooks');

module.exports = (Sale) => {
    Sale.addHook('afterCreate', async (doc) => {
        const referenceNumber = await hooks.generateByCount(Sale, 'SR')
        Sale.update({reference_number: referenceNumber}, { where: {id: doc.id} })
    });
}