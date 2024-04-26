import { Router } from "express";
import { loginBusiness,databyId, registerBusiness, logoutBusiness, refreshAccessToken, getAllUsersData, editData, deleteDataById } from "../controllers/user.controllers.js";
import { upload } from '../middlewares/multer.middleware.js'
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();
router.route('/register').post(
  upload.fields([                   // Middleware
    {
      name: "logo",
      maxCount: 1
    }
  ]),
  registerBusiness);

router.route('/login').post(loginBusiness);
router.route('/getUserData').post(getAllUsersData);
router.route('/editData').post(editData);
router.route('/data').get(databyId);
router.route('/delete').delete(deleteDataById);
//Secured routes
router.route('/logout').post(verifyJWT, logoutBusiness);
// router.route('/refresh-token').post(refreshAccessToken);
// router.route('/change-password').post(verifyJWT, changeCurrentPassword);
// router.route('/current-user').post(verifyJWT, getCurrentUser);
// router.route('/update-account-details').post(verifyJWT, updateAccountDetails);
// router.route('/update-avatar').post(verifyJWT,upload.fields([{ name: "avatar", maxCount: 1}]), updateUserAvatar);
// router.route('/update-coverImage').post(verifyJWT,upload.fields([{ name: "coverImage", maxCount: 1}]), updateUsercoverImage);

export default router;