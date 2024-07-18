import express from 'express';
import multer from 'multer';
import roomController from '../controllers/room';
import guestsController from '../controllers/guests';
import bookingController from '../controllers/bookings';
import dashboard from '../controllers/dashboard';

const router = express.Router();

// Config Multer
const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5mb
  },
});

// Rooms
router
  .route('/rooms')
  .get(roomController.readAll)
  .post(upload.single('roomImage'), roomController.create);
router
  .route('/rooms/:id')
  .get(roomController.read)
  .patch(upload.single('roomImage'), roomController.update)
  .delete(roomController.delete);

// Guests
router
  .route('/guests')
  .get(guestsController.readAll)
  .post(guestsController.create);
router
  .route('/guests/:id')
  .get(guestsController.read)
  .patch(guestsController.update)
  .delete(guestsController.delete);

// Bookings
router
  .route('/bookings')
  .get(bookingController.readAll)
  .post(bookingController.create);
router
  .route('/bookings/:id')
  .get(bookingController.read)
  .patch(bookingController.update)
  .delete(bookingController.delete);

// Stats
router.route('/dashboard').get(dashboard.getStats);
router.route('/today-activities').get(dashboard.getTodayActivities);
export default router;
