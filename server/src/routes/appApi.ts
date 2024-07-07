import express from 'express';
import multer from 'multer';
import roomController from '../controllers/room';
import guestsController from '../controllers/guests';

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

// Rooms
router
  .route('/guests')
  .get(guestsController.readAll)
  .post(guestsController.create);
router
  .route('/guests/:id')
  .get(guestsController.read)
  .patch(guestsController.update)
  .delete(guestsController.delete);

export default router;
