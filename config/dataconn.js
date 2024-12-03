import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb+srv://janinemoldin2000:janine07102000@cluster0.8gndg.mongodb.net/RainShelter?retryWrites=true&w=majority&appName=Cluster0");
  } catch (err) {
    console.log(err);
  }
};

export default connectDB;