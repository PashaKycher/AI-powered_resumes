import mongoose from "mongoose";
import bcrypt from "bcrypt";

const UserSchems = new mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
}, {timestamps: true});

UserSchems.methods.comparePassword = function(password) {
    return bcrypt.compareSync(password, this.password)
  }

const User = mongoose.model("User", UserSchems);
export default User