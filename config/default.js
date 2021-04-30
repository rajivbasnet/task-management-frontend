import dotenv from 'dotenv';

dotenv.config();

const config = {
    "cookie_hash_key": process.env.COOKIE_HASH_KEY,
    "node_env": process.env.NODE_ENV,
  }

export default config;