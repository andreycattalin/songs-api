const user = require("../models/user");
const authJWT = require("../helpers/jwt");

function signUp(req, res) {
    // Save new user
    user.create(req.body)
        .then(user => {

            let dataToken = authJWT.createToken(user);
            let userResponse = {
                access_token: dataToken[0],
                refresh_token: authJWT.createRefreshToken(user),
                expires_in: dataToken[1],
                role: user.role
            };

            return res.status(200).send(userResponse);

        })
        .catch(err => {
            console.log(err)
            return res.status(400).send(err);
        });
}

module.exports = {
    signUp
}