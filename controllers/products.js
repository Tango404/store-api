const Product = require('../models/product');

const getAllProductsStatic = async (req, res) => {
	const products = await Product.find({}).limit(4);
	res.status(200).json({ products, nbHits: products.length });
};

const getAllProducts = async (req, res) => {
	// Destruct the properties we want to query for
	const { featured, company, name, sort, fields, numericFilters } = req.query;
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

	if (numericFilters) {
		const operatorMap = {
			'>': '$gt',
			'>=': '$gte',
			'=': '$eq',
			'<': '$lt',
			'<=': '$lte',
		};

		const regEx = /\b(<|>|>=|=|<|<=)\b/g;

		let filters = numericFilters.replace(regEx, (match) => `-${operatorMap[match]}-`);

		const options = ['price', 'rating'];
		filters = filters.split(',').forEach((item) => {
			const [field, operator, value] = item.split('-');
			if (options.includes(field)) {
				queryObject[field] = { [operator]: Number(value) };
			}
		});
	}

	let result = Product.find(queryObject);

	// Sort
	if (sort) {
		const sortList = sort.split(',').join(' ');
		result = result.sort(sortList);
	} else {
		result = result.sort('createAt');
	}

	if (fields) {
		const fieldList = fields.split(',').join(' ');
		result = result.select(fieldList);
	}

	const page = Number(req.query.page) || 1;
	const limit = Number(req.query.limit) || 10;
	const skip = (page - 1) * limit;

	result = result.skip(skip).limit(limit);

	const products = await result;

	res.status(200).json({ products, nbHits: products.length });
};

module.exports = {
	getAllProductsStatic,
	getAllProducts,
};
