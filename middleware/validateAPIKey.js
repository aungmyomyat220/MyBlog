const apiKey = process.env.NEXT_PUBLIC_API_KEY;
function validateApiKey(req, res, next) {
    const apiKeyHeader = req.get('API_KEY');
    if (apiKeyHeader === apiKey) {
        next();
    } else {
        res.status(401).json({ error: 'Unauthorized' });
    }
}
module.exports = validateApiKey