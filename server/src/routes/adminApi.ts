import express from 'express';
import multer from 'multer';
import adminController from '../controllers/admin';

const router = express.Router();

// Config Multer
const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5mb
  },
});

router
  .route('/admin/profile')
  .get(adminController.setMeId, adminController.readMe);

export default router;
