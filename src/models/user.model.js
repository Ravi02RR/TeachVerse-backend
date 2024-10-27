import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { env } from "../config/env.js";

const schema = mongoose.Schema;
const ObjectId = schema.Types.ObjectId;



const userSchema = new schema({
    username: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        index: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    fullname: {
        type: String,
        required: true,
        trim: true,
        index: true
    },
    avatar: {
        type: String,
        required: true,

    },
    coverImage: {
        type: String,
    },
    password: {
        type: String,
        required: true,
    },
    watchList: [
        {
            type: ObjectId,
            ref: "Video"
        }
    ],
    refreshToken: {
        type: String
    }

}, { timestamps: true });

//========================hash password before saving========================

userSchema.pre("save", async function (next) {
    try {
        if (this.isModified("password")) {
            this.password = await bcrypt.hash(this.password, parseInt(env.bcrypt.salt));
        }
        next();
    } catch (error) {
        next(error);
    }
});

//========================Verify Password========================

userSchema.methods.comparePassword = async function (password) {
    try {
        return await bcrypt.compare(password, this.password);
    } catch (error) {
        throw new Error(error);
    }
}

//========================Generate Access Token========================
userSchema.methods.generateAccessToken = function () {
    return jwt.sign({
        id: this._id, email: this.email,
        username: this.username,
        fullname: this.fullname
    }, env.jwt.ACESS_TOKEN_SECRET, { expiresIn: '7d' });
}

//========================Generate Refresh Token========================
userSchema.methods.generateRefreshToken = function () {
    return jwt.sign({
        id: this._id,
        email: this.email,
        username: this.username,
        fullname: this.fullname

    }, env.jwt.REFRESH_TOKEN, { expiresIn: env.jwt.REFRESH_TOKEN_EXPIRES_IN });
}

export const userModel = mongoose.model("User", userSchema);