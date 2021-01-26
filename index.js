require("dotenv").config()
const app = require("express")()
const cors = require("cors")
const mongoose = require("mongoose")
const bodyParser = require("body-parser")
const jsonParser = bodyParser.json()
const fileUpload = require("express-fileupload")
const path = require("path")
const {
	fetchAuctions,
	uploadImage,
	createAuction
} = require("./handlers/auction")

const PORT = process.env.PORT || 5000

//Middleware

app.use(cors({
	credentials: true,
	origin: 'https://beed-client.netlify.app'
}))
app.use(
	fileUpload({
		useTempFiles: true,
		tempFileDir: path.join(__dirname, "tmp")
	})
)
app.use(jsonParser)
app.all('/', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next()
  });
  
//Routes
app.get("/fetch-auctions", fetchAuctions)
app.post("/upload-image", uploadImage)
app.post("/create-auction", createAuction)



mongoose
	.connect(process.env.MONGO, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useFindAndModify: false
	})
	.then(() => {
		app.listen({ port: PORT }, () => {
			console.log("Connected to DB")
			console.log(`Server running at http://localhost:${PORT}`)
		})
	})
	.catch(error => console.log(error))
