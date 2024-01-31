const apiKey = "927e0f9a-4451-4210-8dd1-eb47f8ca9089";
function validateApiKey(req, res, next) {
    const apiKeyHeader = req.get('API_KEY');
    if (apiKeyHeader === apiKey) {
        next();
    } else {
        res.status(401).json({ error: 'Unauthorized' });
    }
}

module.exports = validateApiKey