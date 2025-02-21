import { Schema, model, models } from 'mongoose';


const UserSchema = new Schema({
    email: {
        type: String,
        unique: [true, 'Email already Exists'],
        required: [true, 'Email is required']
    },
    username: {
        type: String,
        unique: [true, 'Username already exist'],
        required: [true, "User Name is required"]
    },
    image: {
        type: String
    },
    bookmarks: [{
        type: Schema.Types.ObjectId,
        ref: 'Property'
    }]
},
    {
        timestamps: true
    }
);
const User = models.User || model('User', UserSchema)

export default User;