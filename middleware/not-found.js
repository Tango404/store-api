// If something is not found, this middleware just sends a 404 and sends the following message
const notFound = (req, res) => res.status(404).send('Route does not exist');

module.exports = notFound;
