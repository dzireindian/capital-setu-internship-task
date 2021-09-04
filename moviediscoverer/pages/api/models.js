import mongoose from 'mongoose';

var User = new mongoose.Schema({
    email: String,
    password: String
});

mongoose.models = {};
export const Users = mongoose.model.User || mongoose.model("users", User);

// var db = mongoose.createConnection(process.env.NEXT_PUBLIC_DATABASE_POINT, 'local');
// db.once('open',function(){console.log('database connection established')});
