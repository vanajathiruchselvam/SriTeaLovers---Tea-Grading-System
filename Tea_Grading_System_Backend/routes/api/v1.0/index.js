const express = require('express');
const router = express.Router();

/**      Auth route         */
router.use('/auth', require('./routers/auth/auth.router'));
/**      End auth route    */

/**      Customer route         */
router.use('/customers', require('./routers/customer/customer.router'));
/**      End customers route    */

/**      Settings route         */
router.use('/users', require('./routers/setting/user.router'));
router.use('/hotels', require('./routers/setting/hotel.router'));
router.use('/rooms', require('./routers/setting/room.router'));
/**      End settings route    */

/**      Master Data route         */
router.use('/designations', require('./routers/masterData/designation.router'));
router.use('/floors', require('./routers/masterData/floor.validator'));
router.use('/room-types', require('./routers/masterData/roomtype.router'));
/**      End Master Data route    */

/**      Bar route         */
router.use('/items', require('./routers/bar/item.router'));
router.use('/sales', require('./routers/bar/sales.router'));
/**      End Bar route    */

/**      Leave route         */
router.use('/leaves', require('./routers/leave/leave.router'));
router.use('/leave-approvels', require('./routers/leave/leaveApprovel.router'));
/**      End Leave route    */

/**      Staff route         */
router.use('/staffs', require('./routers/staff/Staff.router'));
/**      End Staff route    */

/**      Booking route         */
router.use('/bookings', require('./routers/booking/booking.router'));
/**      End Booking route    */

/**      Report route         */
router.use('/reports', require('./routers/reports'));
/**      End Report route    */

module.exports = router;
