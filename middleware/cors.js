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
    };

    cors(corsOptions)(req, res, next);
  };
}

module.exports = corsMiddleware;
