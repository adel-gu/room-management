import express from 'express';
import roomController from '../controllers/room';

const router = express.Router();

// Rooms
router.route('/rooms').get(roomController.readAll).post(roomController.create);
router
  .route('/rooms/:id')
  .get(roomController.read)
  .patch(roomController.update)
  .delete(roomController.delete);

export default router;
