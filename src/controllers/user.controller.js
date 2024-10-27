import { asyncHandler } from '../utils/asyncHandler.js';
import ApiError from '../utils/ApiError.js';
import { userModel } from '../models/user.model.js';
import { uploadOnCloudinary } from '../cloudinary/cloudinary.js';
import { ApiResponse } from '../utils/ApiResponse.js';

export const registerUser = asyncHandler(async (req, res) => {
    const { fullname, email, username, password } = req.body;

    if ([fullname, email, username, password].some((val) => !val?.trim())) {
        throw new ApiError(400, 'All fields are required');
    }

    const existedUser = await userModel.findOne({
        $or: [
            { email },
            { username }
        ]
    })

    if (existedUser) {
        throw new ApiError(409, 'Email or username already exists');
    }


    const avatarPath = req.files && req.files.avatar && req.files.avatar[0] ? req.files.avatar[0].path : null;
    const coverPath = req.files && req.files.cover && req.files.cover[0] ? req.files.cover[0].path : null;

    if (!avatarPath) {
        throw new ApiError(400, 'Please upload avatar image');
    }
    let avatarlink = await uploadOnCloudinary(avatarPath);
    let coverlink = null;
    if (coverPath) {
        coverlink = await uploadOnCloudinary(coverPath);
    }
    if (!avatarlink) {
        throw new ApiError(500, 'Failed to upload avatar image');
    }
    // if (coverPath && !coverlink) {
    //     throw new ApiError(500, 'Failed to upload cover image');
    // }

    const user = await userModel.create({
        fullname,
        email,
        username: username.toLowerCase(),
        password,
        avatar: avatarlink.secure_url,
        coverImage: coverlink?.secure_url || "",
    });


    const createdUser = await userModel.findById(user._id).select("-password -refreshToken");

    if (!createdUser) {
        throw new ApiError(500, 'Failed to create user');
    }

    return res.status(201).json(
        new ApiResponse(201, 'User created successfully', createdUser)
    );
});


export const loginUser = asyncHandler(
    async (req, res) => {
        const { username, password } = req.body;

        if (!username || !password) {
            throw new ApiError(400, 'Username and password are required');
        }

        const user = await userModel.findOne({ username: username.toLowerCase() });

        if (!user) {
            throw new ApiError(404, 'User not found');
        }

        const isMatch = await user.comparePassword(password);

        if (!isMatch) {
            throw new ApiError(400, 'Invalid credentials');
        }

        const token = user.generateAccessToken();

        return res.json(
            new ApiResponse(200, 'Login successful', { token, user: user.toJSON() })
        );
    }
)