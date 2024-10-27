import mongoose from "mongoose"
export const dbconnection = async (uri) => {
    try {
        let res = await mongoose.connect(uri)
        console.log("Database connected successfully", res.connection.host)
    } catch (error) {
        console.log("Database connection failed")
        process.exit(1)
    }

}