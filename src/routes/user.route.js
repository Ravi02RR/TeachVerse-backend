import { Router } from "express";
import { registerUser,loginUser ,logoutUser} from "../controllers/user.controller.js";
import { upload } from "../middleware/multer.middleware.js";
import authMiddleware from "../middleware/auth.middeware.js";

const usereRouter = Router();


usereRouter.route('/register').post(
    upload.fields([
        { name: 'avatar', maxCount: 1 },
        { name: 'cover', maxCount: 1 }
    ]),
    registerUser
);
usereRouter.route('/login').post(loginUser);
usereRouter.route('/logout').post(authMiddleware,logoutUser);

export default usereRouter;
