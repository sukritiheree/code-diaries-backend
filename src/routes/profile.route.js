import { Router } from "express";
import { updateProfile, updateSummary, uploadProfile,uploadBg, viewProfile, getPostsByEmail } from "../controllers/profile.controller.js";
import { upload } from "../middlewares/multer.middleware.js";

const profileRouter = Router();

profileRouter.route("/viewprofile/:email").get(viewProfile);
profileRouter.route("/upload/profile/:email").post(upload.single('profile_pic'),  uploadProfile);
profileRouter.route("/upload/bg/:email").post(upload.single('bg_pic'),  uploadBg);
profileRouter.route("/update/:email").post(updateProfile);
profileRouter.route("/update_summary/:email").post(updateSummary);
profileRouter.route("/getUsersPosts/:email").get(getPostsByEmail);

export default profileRouter;