import mongoose from "mongoose";

// const { MONGODB_URI } = process.env;
const MONGODB_URI: string = process.env.MONGODB_URI || "";
const options = { appName: "devrel.article.nextauthjs" };

export const connectDB = async () => {
  try {
    // const { connection } = await mongoose.connect(
    //   MONGODB_URI as string,
    //   options
    // );

    const { connection } = await mongoose.connect(MONGODB_URI as string);

    if (connection.readyState === 1) {
      return Promise.resolve(true);
    }
  } catch (error) {
    console.error(error);
    return Promise.reject(error);
  }
};
