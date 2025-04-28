import dotenv from "dotenv";

dotenv.config({ path: "../.env" });

export interface IConfig {
    PORT: string;
    MONGO_URI: string;
    ACCESS_TOKEN_SECRET: string;
    REFRESH_TOKEN_SECRET: string;
    ACCESS_TOKEN_LIFETIME: any;
    REFRESH_TOKEN_LIFETIME: any;
    EMAIL_USER: string;
    EMAIL_PASSWORD: string;
    ACTIVATE_TOKEN_SECRET: string;
    ACTIVATE_TOKEN_LIFETIME: any;
    RECOVERY_TOKEN_SECRET: string;
    RECOVERY_TOKEN_LIFETIME: any;
    FRONTEND_URL: string;
}

const config: IConfig = {
    PORT: process.env.PORT,
    MONGO_URI: process.env.MONGO_URI,
    ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET,
    REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET,
    ACCESS_TOKEN_LIFETIME: process.env.ACCESS_TOKEN_LIFETIME,
    REFRESH_TOKEN_LIFETIME: process.env.REFRESH_TOKEN_LIFETIME,
    EMAIL_USER: process.env.EMAIL_USER,
    EMAIL_PASSWORD: process.env.EMAIL_PASSWORD,
    ACTIVATE_TOKEN_SECRET: process.env.ACTIVATE_TOKEN_SECRET,
    ACTIVATE_TOKEN_LIFETIME: process.env.ACTIVATE_TOKEN_LIFETIME,
    RECOVERY_TOKEN_SECRET: process.env.RECOVERY_TOKEN_SECRET,
    RECOVERY_TOKEN_LIFETIME: process.env.RECOVERY_TOKEN_LIFETIME,
    FRONTEND_URL: process.env.FRONTEND_URL,
};

export { config };
