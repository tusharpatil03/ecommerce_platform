import "dotenv/config";

const ENV = process.env;

export const DATABASE_URL = ENV.DATABASE_URL;
export const JWT_SECRET = ENV.JWT_SECRET;
