import * as dotenv from "dotenv";

dotenv.config();

module.exports = (on, config) => {
    config.env.googleClientId = process.env.GOOGLE_CLIENT_ID
    config.env.googleClientSecret = process.env.GOOGLE_CLIENT_SECRET
    config.env.googleRefreshToken = process.env.GOOGLE_REFRESH_TOKEN

    return config;
};
