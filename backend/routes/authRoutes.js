import express from 'express'
import { changePassword, loginUser, registerUser } from '../controllers/authController.js';
import authUser from '../middleware/authMiddleware.js';

const authRouter = express.Router();

authRouter.post('/register', registerUser);
authRouter.post('/login', loginUser);
authRouter.put('/change-password', authUser, changePassword);

export default authRouter;