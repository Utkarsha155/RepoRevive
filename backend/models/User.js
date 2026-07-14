import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, trim: true },
    password: { type: String, required: true },
    confirmPassword: String,
    phone: { type: String, required: true, trim: true },
    address: String,
    github: String,
    linkedin: String,
    portfolio: String,
    isDeleted: { type: Boolean, default: false },
    deletedAt: { type: Date, default: null },
    headline: {
    type: String,
    default: ""
},

bio: {
    type: String,
    default: ""
},

skills: [{
    type: String
}],

avatar: {
    type: String,
    default: ""
}
}, { timestamps: true })

export default mongoose.model("User", userSchema)