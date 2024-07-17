import express from 'express';
import auth from '../controllers/auth';

const router = express.Router();

router.route('/signup').post(auth.signup);
router.route('/verify').get(auth.verifyAccount);
router.route('/login').post(auth.login);
router.route('/forgot-password').post(auth.forgotPassword);
router.route('/reset-password/:token').patch(auth.resetPassword);
router.route('/logout').post(auth.checkAuthToken, auth.logout);

router.get('/validate-auth', auth.checkAuthToken, auth.validateAuth);

export default router;
