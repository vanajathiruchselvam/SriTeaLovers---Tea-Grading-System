const express = require('express');
const router = express.Router();

/**      Report route         */
router.use('/sales', require('./sales.routers'));
/**      End Report route    */

module.exports = router;
