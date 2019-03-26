const User = require('../../mongoDb/models/user.model').User;

const getAllUsers = (req, res) => {
    console.log(User);
    return User.find({})
        .then((users) => {
            res.json(users);
        })
        .catch((error) => {
            res.json(error.message);
        });
}

module.exports = { getAllUsers };
