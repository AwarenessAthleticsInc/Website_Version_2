const mongoose = require("mongoose");
const businessSchema = new mongoose.Schema({
  donations: Number
});
const Business = new mongoose.model("Business Information", businessSchema);
exports.model = Business;

exports.updateDonations = (total) => {
  return new Promise((resolve, reject) => {
    Business.findByIdAndUpdate()
  })
}
