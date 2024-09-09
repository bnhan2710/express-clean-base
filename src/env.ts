import dotenv from 'dotenv';
dotenv.config();

const ENV_SERVER = {
    PORT: process.env.PORT,
    SECRET_KEY : process.env.SECRET_KEY
}

const ENV_DATABASE = {
    DB_DIALECT: process.env.DB_DIALECT,
    DB_HOST: process.env.DB_HOST,
    DB_PORT: process.env.DB_PORT,
    DB_USERNAME: process.env.DB_USERNAME,
    DB_PASSWORD: process.env.DB_PASSWORD,
    DB_NAME: process.env.DB_NAME
}

export default {
    ENV_SERVER,
    ENV_DATABASE
}