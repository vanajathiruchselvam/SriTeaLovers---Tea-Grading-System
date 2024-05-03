const hooks = require('../hooks');

module.exports = (Item) => {
  Item.addHook('afterCreate', async (doc) => {
    const code = await hooks.generateByCount(Item, 'IC');
    Item.update({ code: code }, { where: { id: doc.id } });
  });
};
