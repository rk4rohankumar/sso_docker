import asyncHandler from '../utils/asyncHandler.js';
import { ApiError } from '../utils/ApiError.js';
import { Business } from '../models/business.model.js';
import { uploadOnCloudinary } from '../utils/cloudinary.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import jwt from 'jsonwebtoken';
import { query } from 'express';

const generateAccessAndRefreshTokens = async (userId) => {
  try {
    const business = await Business.findById(userId);
    const accessToken = await business.generateAccessToken();
    const refreshToken = await business.generateRefreshToken();

    business.refreshToken = refreshToken;
    await business.save({ validateBeforeSave: false });
    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(500, "Something went wrong while generating access and refresh tokens");
  }
}

const refreshAccessToken = asyncHandler(async (req, res) => {
  const incomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken;
  if (!incomingRefreshToken) {
    throw new ApiError(401, "Unauthorized access");
  }
  try {
    // Verify Token
    const decodedToken = jwt.verify(incomingRefreshToken, process.env.REFRESH_TOKEN_SECRET)
    // Find user in DB 
    const business = await Business.findById(decodedToken?._id);
    if (!business) {
      throw new ApiError(401, "Invalid refresh token");
    }

    if (incomingRefreshToken !== business?.refreshToken) {
      throw new ApiError(401, " Refresh token expired");
    }

    const options = {
      httpOnly: true,
      secure: true
    }

    const { accessToken, newRefreshToken } = await generateAccessAndRefreshTokens(business._id);

    return res.status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", newRefreshToken, options)
      .json(
        new ApiResponse(
          200,
          {
            accessToken,
            refreshToken: newRefreshToken,
          },
          "Access token refreshed successfully"
        )
      )
  } catch (error) {
    throw new ApiError(error?.message || "Something went wrong");
  }


})

const registerBusiness = asyncHandler(async (req, res) => {
  // Algorithm/Procedure that we will be performing to register Businesss
  // get Business detail from the frontend
  // validate the received Business info -- not empty, constraints
  // check if Business already registered -- through Businessname or email
  // check for images received and avatar is must
  // upload them to cloudinary server
  // create Business object -- entry in db
  // remove hashed password, refresh token from response object
  // check for Business creation 
  // return res

  const { businessName, businessAddress, pinCode, category, description, rewardTitle, rewardDescription, rewardType, rewardValue, countryCode, phoneNumber, timings, email, password, website} = req.body;  // getting Business details

  // Validating
  if (
    [timings, email, businessName, password].some((field) => field?.trim() === "")
    // Iterates over the items and checks if empty or not
  ) {
    throw new ApiError(400, "All fields are required");
  }

  // Checking if Business exists? Since only email is unique
  const existedBusiness = await Business.findOne({ email });

  if (existedBusiness) {
    throw new ApiError(409, "Business already exists");
  }

  // ? handles if it do not exist
  // Getting the path to the file on local server which is saved by multer
  const logoLocalPath = req.files?.logo[0]?.path;

  if (!logoLocalPath) {
    throw new ApiError(400, "Logo is required!!");
  }

  // Uploading files on cloudinary
  const logo = await uploadOnCloudinary(logoLocalPath);

  if (!logo) {
    throw new ApiError(400, "Logo is required");
  }

  // Creating instance of Business and storing the details in the DB
  const business = await Business.create({
    businessName,
    businessAddress,
    pinCode,
    category,
    description,
    rewardTitle,
    rewardDescription,
    rewardType,
    rewardValue,
    countryCode,
    phoneNumber,
    timings,
    website,
    logo: logo.url,
    email,
    password,
  });

  // if Business is created then select all by default and remove password and refreshToken 
  const createdBusiness = await Business.findById(business._id).select(
    "-password -refreshToken"
  );

  if (!createdBusiness) {
    throw new ApiError(500, "Something went wrong while registering Business");
  }

  return res.status(200).json(
    new ApiResponse(200, createdBusiness, "Business created successfully")
  );
})

const loginBusiness = asyncHandler(async (req, res) => {
  const { password, email } = req.body;

  if (!email) {
    throw new ApiError(400, "Email is required");
  }

  const business = await Business.findOne({ email });

  if (!business) {
    throw new ApiError(404, "Email not registered with any business!!");
  }

  const isPasswordValid = await business.isPasswordCorrect(password);

  if (!isPasswordValid) {
    throw new ApiError(401, "Invalid Password!!");
  }

  const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(business._id);

  const loggedInBusiness = await Business.findOne(business._id).select("-password -refreshToken");

  const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production', // set secure only in production
    sameSite: 'strict', // set sameSite to prevent CSRF
    // Add more options as needed (e.g., maxAge, domain)
  };

  res.cookie("accessToken", accessToken, cookieOptions);
  res.cookie("refreshToken", refreshToken, cookieOptions);

  return res.status(200).json(new ApiResponse(200, { Business: loggedInBusiness, accessToken, refreshToken }, "Business Logged In Successfully!!"));
});


const logoutBusiness = asyncHandler(async (req, res) => {
  await Business.findByIdAndUpdate(
    req.business._id,
    {
      $set: {
        refreshToken: undefined,
      }
    },
    {
      new: true // return response mein updated value milegi
    }
  )

  const options = {
    httpOnly: true,
    secure: true
  }

  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(
      new ApiResponse(200, {}, "Business logout Successfully!!")
    )
})

const getAllUsersData = asyncHandler(async (req, res) => {
  const data = await Business.find().select("-password -refreshToken");
  if (!data) {
    throw new ApiError(404, "No business exist!!");
  }
  return res.status(200).json(
    new ApiResponse(200, data, "User data fetched successfully!!")
  );
})
 
const editData = asyncHandler(async (req, res) => { 
  const { _id, businessName, businessAddress, pinCode, category, description, rewardTitle, rewardDescription, rewardType, rewardValue, countryCode, phoneNumber, timings, email } = req.body; 

  const existedBusiness = await Business.findByIdAndUpdate({_id}, { businessName, businessAddress, pinCode, category, description, rewardTitle, rewardDescription, rewardType, rewardValue, countryCode, phoneNumber, timings, email },{new : true}).select('-password -refreshToken');
  
  if (!existedBusiness) { 
    throw new ApiError(404, "user not found");
  }

  return res.status(200).json(
    new ApiResponse(200, existedBusiness, 'User updated successfully!!')
  )
})

const databyId = asyncHandler(async (req, res) => {
  const { _id } = req.query;
  const data = await Business.findById(_id).select('-password -refreshToken');
  if (!data) {
    throw new ApiError(404, "No business exist!!");
  }
  return res.status(200).json(
    new ApiResponse(200, data, "User data fetched successfully!!")
  );
})

const deleteDataById = asyncHandler(async (req, res) => {
  const { _id } = req.query;
  if (!_id) {
    throw new ApiError(400, "ID parameter is required");
  }

  const deletedData = await Business.findByIdAndDelete(_id);

  if (!deletedData) {
    throw new ApiError(404, "Data not found");
  }

  return res.status(200).json(
    new ApiResponse(200, null, "Data deleted successfully")
  );
});



export {databyId,deleteDataById, registerBusiness, loginBusiness, getAllUsersData, logoutBusiness,editData, refreshAccessToken }