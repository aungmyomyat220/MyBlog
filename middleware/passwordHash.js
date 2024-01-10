const bcrypt = require("bcrypt");

async function passwordHash(password) {
    const saltRounds = 10;
    try {
        const salt = await bcrypt.genSalt(saltRounds);
        return await bcrypt.hash(password, salt);
    } catch (err) {
        console.error(err.message);
        throw err;
    }
}

module.exports = passwordHash