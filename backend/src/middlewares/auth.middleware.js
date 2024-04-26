import { ApiError } from '../utils/ApiError.js';
import asyncHandler from '../utils/asyncHandler.js';
import jwt from 'jsonwebtoken';
import { Business } from '../models/business.model.js';


export const verifyJWT = asyncHandler(async (req, res, next) => {
  try {
    const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "");
    // req.cookies contain access_token
    if (!token) {
      throw new ApiError("Unauthorized access token");
    }

    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    const business = await Business.findById(decodedToken?._id).select("-password -refreshToken");
    
    if (!business) {
      // Next Video ==> Discussion about frontend
      throw new ApiError(401, "Invalid access token");
    }
    req.business = business;
    next();

  } catch (error) {
    throw new ApiError(401, error?.message || "Invalid access token");
  }
})