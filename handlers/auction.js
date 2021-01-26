const Auction = require("../models/Auction")
const cloudinary = require("cloudinary").v2
const { validateAuction } = require("../utils/validator")

cloudinary.config({
	cloud_name: process.env.CLOUDINARY_NAME,
	api_key: "851791775174516",
	api_secret: process.env.CLOUDINARY_SECRET
})

exports.fetchAuctions = async (req, res) => {
	const errors = {}
	try {
		const auctions = await Auction.find({})
		return res.status(201).json(auctions)
	} catch (error) {
		errors.general = "Something went wrong try again later."
		return res.status(400).json(errors)
	}
}

exports.uploadImage = (req, res) => {
	const targetFile = req.files.image
	const path = require("path")
	const fs = require("fs")
	const extName = path.extname(targetFile.name)
	const errors = {}

	const imgList = [".png", ".jpg", ".jpeg"]
	// Checking the file type
	if (!imgList.includes(extName)) {
		fs.unlinkSync(targetFile.tempFilePath)
		errors.image = "Invalid File format"
		return res.status(422).json(errors)
	}

	if (targetFile.size > 10048576) {
		fs.unlinkSync(targetFile.tempFilePath)
		errors.image = "File is too large. Max size of upload should be 2mb"
		return res.status(413).json(errors)
	}

	try {
		cloudinary.uploader.upload(targetFile.tempFilePath, function (err, image) {
			if (err) {
				console.log(err)
			}

			fs.unlinkSync(targetFile.tempFilePath)
			return res.status(201).json({ url: image.secure_url })
		})
	} catch (error) {
		errors.image = "Something went wrong. Try again."
		return res.status(400).json(errors)
	}
}

exports.createAuction = async (req, res) => {
	const { title, start, end, image } = req.body

	const { errors, valid } = validateAuction(title, start, end, image)
	if (!valid) {
		return res.status(400).json(errors)
	}

	const newAuction = new Auction({
		title,
		start,
		end,
		image
	})

	await newAuction.save()

	return res
		.status(200)
		.json({ message: "Auction has been created successfully" })
}
