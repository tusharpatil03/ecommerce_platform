import 'dotenv/config';

const ENV = process.env;

export const DATABASE_URL = ENV.DATABASE_URL;
export const ACCESS_TOKEN_SECRET = ENV.ACCESS_TOKEN_SECRET;
export const REFRESH_TOKEN_SECRET = ENV.REFRESH_TOKEN_SECRET;
