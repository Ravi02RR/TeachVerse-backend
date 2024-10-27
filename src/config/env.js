export const env = {
    Port: {
        devlopement: process.env.PORT || 3000,
    },
    Database: {
        devlopement: {
            URI: process.env.MONGO_URI || "mongodb://localhost:27017/techverse",
        }
    },
    bcrypt: {
        salt: process.env.SALT_ROUNDS
    },
    jwt: {
        ACESS_TOKEN_SECRET: process.env.ACESS_TOKEN_SECRET,
        ACESS_TOKEN_EXPIRES_IN: process.env.JWT_EXPIRES_IN,
        REFRESH_TOKEN: process.env.REFRESH_TOKEN,
        REFRESH_TOKEN_EXPIRES_IN: process.env.REFRESH_TOKEN_EXPIRES_IN
    },
    cloudinary: {
        cloudName: process.env.CLOUD_NAME,
        apiKey: process.env.cloudinary_API_key,
        apiSecret: process.env.CLOUDINARY_URL
    }
}