const mongoose = require("mongoose");

var User = new mongoose.Schema({
    email: String,
    password: String
});

var Favourite = new mongoose.Schema({
    email: String,
    favourites: []
});
// User.virtual('ID').get(()=>{
//     return this._id.toString();
// })

mongoose.models = {};
const Users = mongoose.model("users", User);
const Favourites = mongoose.model("favourites", Favourite);

module.exports = {users:Users,favs:Favourites}
