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
            return res.status(400).send(err);
        });
}

function logIn(req, res) {
    if (req.body.password && req.body.email) {
        user.findOne({
                email: req.body.email
            })
            .select("_id password")
            .exec((err, userResult) => {
                if (err || !userResult) {
                    return res.status(401).send({ error: "LoginError" });
                }

                userResult.comparePassword(req.body.password, userResult.password, function(err, isMatch) {
                    if (isMatch & !err) {

                        let dataToken = authJWT.createToken(userResult);
                        return res.status(200).send({
                            access_token: dataToken[0],
                            refresh_token: authJWT.createRefreshToken(userResult),
                            expires_in: dataToken[1],
                            role: userResult.role
                        });

                    } else {
                        return res.status(401).send({ error: "LoginError" });
                    }
                });

            });
    } else {
        return res.status(401).send({ error: "BadRequest" });
    }
}

function loginOrSignUpWithGoogle(req, res) {

    if (req === null) {
        return res.status(500).send({});
    }


    if (!req.user) {
        let errorResponse = {
            error: "No tiene permisos"
        }
        return res.status(401).send(errorResponse);
    }

    let currentUser = req.user
    let dataToken = authJWT.createToken(currentUser)
    let objUser = {
        verified: currentUser.verified,
        access_token: dataToken[0],
        refresh_token: authJWT.createRefreshToken(currentUser),
        expires_in: dataToken[1],
    }
    return res.status(200).send(objUser)
}

module.exports = {
    signUp,
    logIn,
    loginOrSignUpWithGoogle
}