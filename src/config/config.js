import dotenv from "dotenv";

dotenv.config();

if (!process.env.PORT) {
  throw new console.error("PORT is not defiend in environment variable");
}

if (!process.env.MONGO_URI) {
  throw new console.error("MONGO_URI is not defiend in environment variable");
}

if (!process.env.JTW_SECRET) {
  throw new console.error("JTW_SECRET is not defiend in environment variable");
}

const config = {
  PORT: process.env.PORT,
  MONGO_URI: process.env.MONGO_URI,
  JTW_SECRET: process.env.JTW_SECRET,
};

export default config;