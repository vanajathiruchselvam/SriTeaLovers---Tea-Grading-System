const hooks  = require('../hooks');

module.exports = (Reservation) => {
    Reservation.addHook('afterCreate', async (doc) => {
        const referenceNumber = await hooks.generateByCount(Reservation, 'RB')
        Reservation.update({reference_number: referenceNumber}, { where: {id: doc.id} })
    });
}