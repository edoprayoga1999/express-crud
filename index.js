require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const helmet = require("helmet");
const xss = require("xss-clean");
const swaggerDocs = require("./src/helpers/swagger-output.json")
const swaggerUi = require("swagger-ui-express");

// route here
const merchantRoute = require("./src/routes/merchant.route");

const app = express();

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs))
app.use(cors());
app.use(
	helmet({
		crossOriginResourcePolicy: false,
	})
);
app.use(xss());
app.use(bodyParser.json());

app.get("/", (req, res) => {
	res.json({
    app_name: process.env.npm_package_name,
    app_version: process.env.npm_package_version,
		message: "Hello World",
	});
});

app.use(merchantRoute)

const APP_PORT = process.env.PORT || 4000
app.listen(APP_PORT, () => {
  console.log(`Service running on port ${APP_PORT}`)
})