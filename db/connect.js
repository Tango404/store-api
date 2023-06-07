const mongoose = require('mongoose');

const connectDB = (url) => {
	// This returns a promise, so we can use async/await
	return mongoose.connect(url, {
		useNewUrlParser: true,
		useCreateIndex: true,
		useFindAndModify: false,
		useUnifiedTopology: true,
	});
};

module.exports = connectDB;
