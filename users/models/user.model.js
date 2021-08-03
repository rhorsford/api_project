const mongoose = require('../../common/serivces/mongoose.service').mongoose;
const Schema = mongoose.Schema;


const userSchema = new Schema({
    firstName: String,
    familyName: String,
    created: Date
});

// export {userSchema as userSchemas};

//turns id to hex string
userSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

//Virtual fields are serialised.
userSchema.set('toJSON', {
    virtuals: true
});

userSchema.findById = function (cb) {
    return this.model('Users').find({uid: this.id}, cb);
};

const User = mongoose.model('Users', userSchema);

//create new user record
createUser = (userData) => {
    const user = new User(userData);
    return user.save();
};

//returns list of users
readUser = () => {
    return new Promise((resolve, reject) => {
        User.find()
            .exec(function (err, users) {
                if (err) {
                    reject(err);
                } else {
                    resolve(users);
                }
            })
    });
};

//Delete User
deleteUser = (userId) => {
    return new Promise((resolve, reject) => {
        User.deleteMany({_id: userId}, (err) => {
            if (err) {
                reject(err);
            } else {
                resolve(err);
            }
        });
    });
};

//update User
editUser = (id, userData) => {
    return User.findOneAndUpdate({_id: id}, userData);
};


module.exports = {
    User: User,
    createUser: createUser,
    readUser: readUser,
    deleteUser: deleteUser,
    editUser: editUser
};
