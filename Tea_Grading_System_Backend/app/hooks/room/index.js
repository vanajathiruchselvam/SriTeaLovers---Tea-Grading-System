const hooks  = require('../hooks');

module.exports = (Room) => {
    Room.addHook('afterCreate', async (doc) => {
        const referenceNumber = await hooks.generateByCount(Room, 'RR')
        Room.update({reference_number: referenceNumber}, { where: {id: doc.id} })
    });
}