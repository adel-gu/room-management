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

/* -------------------------------------------------------------------------- */
/*                             Account management                             */
/* -------------------------------------------------------------------------- */
router
  .route('/profile')
  .get(adminController.setMeId, adminController.read)
  .patch(
    upload.single('profileImage'),
    adminController.setMeId,
    adminController.allowedProfileData,
    adminController.update,
  );

/* -------------------------------------------------------------------------- */
/*                              Admin Management                              */
/* -------------------------------------------------------------------------- */
router
  .route('/users')
  .get(adminController.readAll)
  .post(upload.single('profileImage'), adminController.create);
router
  .route('/users/:id')
  .get(adminController.read)
  .patch(upload.single('profileImage'), adminController.update)
  .delete(adminController.delete);

export default router;
