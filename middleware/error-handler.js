// If there is an error, it will log the error and send a 500 and status with the following message
const errorHandlerMiddleware = async (err, req, res, next) => {
	console.log(err);
	return res.status(500).json({ msg: 'Something went wrong, please try again.' });
};

module.exports = errorHandlerMiddleware;
