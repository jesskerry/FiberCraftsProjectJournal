const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema(
    {
        username: String,
        pwd: String,
        email: String,
        communities: Array,
        projects: Array
}
);



module.exports = mongoose.model("User", UserSchema);