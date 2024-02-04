const cors = require("cors");

function corsMiddleware(allowedOrigins) {
  return (req, res, next) => {
    const corsOptions = {
      origin: (origin, callback) => {
        if (allowedOrigins.includes(origin)) {
          callback(null, true);
        } else {
          callback(new Error('Not allowed by CORS'));
        }
      },
      credentials: true,
      methods: 'GET,OPTIONS,PATCH,DELETE,POST,PUT',
    };

    cors(corsOptions)(req, res, next);
  };
}

// Define your handler function
const handler = (req, res) => {
  const d = new Date();
  res.end(d.toString());
};

// Apply CORS middleware to the handler
const corsHandler = corsMiddleware(['https://myblog-two-lake.vercel.app','http://localhost:3000'])(handler);

module.exports = corsHandler;
