const { model, Schema } = require("mongoose")

const auctionSchema = new Schema({
	title: String,
	start: String,
	end: String,
	image: String
})

module.exports = model("Auction", auctionSchema)
