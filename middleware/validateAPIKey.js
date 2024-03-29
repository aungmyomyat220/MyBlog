require('dotenv').config()
const apiKey = process.env.API_KEY;
function validateApiKey(req, res, next) {
    const apiKeyHeader = req.get('API_KEY');
    if (apiKeyHeader === apiKey) {
        next();
    } else {
        res.status(401).json({ error: 'Unauthorized' });
    }
}
module.exports = validateApiKey