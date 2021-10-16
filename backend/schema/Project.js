const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProjectSchema = new Schema(
    {
        userid: String,
        name: String,
        type: String,
        otherType: String,
        imgsrc: String,
        status: String,
        materials: String,
        patsrc: String,
        updates: Array,
        imgbase64: String
}
);



module.exports = mongoose.model("Project", ProjectSchema);