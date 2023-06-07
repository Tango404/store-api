// This will dynamically add all of the products.json values to the database
require('dotenv').config();

const connectDB = require('./db/connect');
const Product = require('./models/product');
const jsonProducts = require('./products.json');

const start = async () => {
	try {
		await connectDB(process.env.MONGO_URI);
		await Product.deleteMany();
		await Product.create(jsonProducts);
		console.log('Success');
		process.exit(0);
	} catch (error) {
		console.log(`POPULATE.JS>>` + error);
	}
};

start();
