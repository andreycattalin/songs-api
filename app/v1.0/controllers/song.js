const Song = require("../models/song");

function createSong(req, res) {

    Song.create(req.body)
        .then(response => {

            res.status(200).send(response);

        })
        .catch(err => {

            res.status(400).send(err);

        });
}

module.exports = {
    createSong
};