// grab the things we need
var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var autoIncrement = require('mongoose-auto-increment');

var connection = mongoose.createConnection("mongodb://localhost/cafeStore");

autoIncrement.initialize(connection);

// create a schema
var userSchema = new Schema({
    seq: { type: Schema.Types.ObjectId, ref: 'Seq' },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    name: String,
    admin: Boolean,
    location: String,
    meta: {
        age: Number,
        website: String
    },
    created_at: Date,
    updated_at: Date
},
{
    versionKey: false
});

userSchema.plugin(autoIncrement.plugin, 'User');

// the schema is useless so far
// we need to create a model using it
var User = mongoose.model('User', userSchema);

// make this available to our users in our Node applications
module.exports = User;
