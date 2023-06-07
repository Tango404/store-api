require('dotenv').config();
require('express-async-errors');

// Async Errors

const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const notFoundMiddleWare = require('./middleware/not-found');
const errorMiddleware = require('./middleware/error-handler');
const connectDB = require('./db/connect');
const productsRouter = require('./routes/products');

// Middleware
app.use(express.json());

// Routes
app.get('/', (req, res) => {
	res.send('<h1>Store API</h1><a href="/api/v1/products">Products Route</a>');
});

app.use('/api/v1/products', productsRouter);

// Products Route

app.use(notFoundMiddleWare);
app.use(errorMiddleware);

const start = async () => {
	try {
		await connectDB(process.env.MONGO_URI);
		app.listen(port, () => {
			console.log(`Server is listening on port ${port}...`);
		});
	} catch (error) {
		console.log(error);
	}
};

start();
