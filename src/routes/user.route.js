import { Router } from "express";
import { registerUser,loginUser } from "../controllers/user.controller.js";
import { upload } from "../middleware/multer.middleware.js";

const usereRouter = Router();


usereRouter.route('/register').post(
    upload.fields([
        { name: 'avatar', maxCount: 1 },
        { name: 'cover', maxCount: 1 }
    ]),
    registerUser
);
usereRouter.route('/login').post(loginUser);

export default usereRouter;
