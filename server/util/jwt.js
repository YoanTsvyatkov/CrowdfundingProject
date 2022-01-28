const jwt = require("jsonwebtoken");

function signToken(email, password, timeExpiration) {
    return jwt.sign({
            email: email,
            password: password
        },
        process.env.SECRET, { expiresIn: timeExpiration }
    );
}

exports.signToken = signToken;