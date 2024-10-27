import mongoose from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";
const schema = mongoose.Schema;
const ObjectId = schema.Types.ObjectId;


const videoSchema = new schema({
    videoFile: {
        type: String,
        required: true,
    },
    thumbnail: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
        trim: true,
        index: true
    },
    description: {
        type: String,
        required: true,
        trim: true,
    },
    duration: {
        type: Number,
        required: true,
    },
    views: {
        type: Number,
        default: 0
    },
    isPublic: {
        type: Boolean,
        default: true
    },
    owner: {
        type: ObjectId,
        ref: "User"
    },


}, { timestamps: true });
videoSchema.plugin(mongooseAggregatePaginate);
export const videoModel = mongoose.model("Video", videoSchema);