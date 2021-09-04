// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import mongoose from "mongoose";

const connectDB = handler => async (req, res) => {
  if (mongoose.connections[0].readyState) {
    // Use current db connection
    return handler(req, res);
  }
  // Use new db connection
  await mongoose.connect(process.env.DATABASE_POINT, {
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
    useNewUrlParser: true
  },async(err)=>{
    if(err) throw err;
    console.log("conncted to db")
});
  return handler(req, res);
};

export default connectDB;