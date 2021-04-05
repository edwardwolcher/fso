import mongoose from "mongoose";
import uniqueValidator from "mongoose-unique-validator";

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, minLength: 3, unique: true },
  name: String,
  role: {
    type: String,
    default: "user",
    enum: ["user", "author", "editor", "admin"],
  },
  passwordHash: { type: String, required: true },
  blogs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Blog",
    },
  ],
});

userSchema.plugin(uniqueValidator);

userSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
    delete returnedObject.passwordHash;
  },
});

userSchema.methods.canAuthor = function () {
  if (this.role === "author") return true;
  if (this.role === "editor") return true;
  if (this.role === "admin") return true;
  return false;
};
userSchema.methods.canEdit = function () {
  if (this.role === "editor") return true;
  if (this.role === "admin") return true;
  return false;
};

const User = mongoose.model("User", userSchema);

export default User;
