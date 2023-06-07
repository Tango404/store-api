const Product = require('../models/product');

const getAllProductsStatic = async (req, res) => {
	const products = await Product.find({}).sort('name');
	res.status(200).json({ products, nbHits: products.length });
};

const getAllProducts = async (req, res) => {
	// Destruct the properties we want to query for
	const { featured, name, company } = req.query;
	const queryObject = {};

	// If the featured field exist (isn't undefined), then check if its true or false and assign accordingly
	if (featured) {
		// Add a featured key in the object
		queryObject.featured = featured === 'true' ? true : false;
	}

	// Since we already have some type of validation in the DB, we don't have to do much
	if (company) {
		queryObject.company = company;
	}

	// If the name exists, create a new key in the object and assign it the value of the name request
	if (name) {
		// With the regex pattern, we can search for things that only include a certain letter
		// or certain word, the options 'i' just means case insensitive
		queryObject.name = { $regex: name, $options: 'i' };
	}

	const products = await Product.find(queryObject);
	res.status(200).json({ products, nbHits: products.length });
};

module.exports = {
	getAllProductsStatic,
	getAllProducts,
};
