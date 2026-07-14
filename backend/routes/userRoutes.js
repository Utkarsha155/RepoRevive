import express from 'express';
import { deleteAccount, getProfile, updateProfile, getDeveloperProfile } from "../controllers/userController.js"
import authUser from "../middleware/authMiddleware.js"

const userRouter = express.Router();

userRouter.get('/getuser', authUser, getProfile);
userRouter.put('/updateuser', authUser, updateProfile);
userRouter.delete('/delete', authUser, deleteAccount);
userRouter.get(
    "/:id",
    getDeveloperProfile
);

export default userRouter;