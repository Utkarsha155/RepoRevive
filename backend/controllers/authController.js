import jwt from "jsonwebtoken"
import User from "../models/User.js"
import bcrypt from "bcrypt"
import validator from "validator"

const createToken = (userId) => {
    const payload = {
        userId: userId
    }
    const secretKey = process.env.JWT_SECRET;
    const options = {
        expiresIn: '7d',
        algorithm: 'HS256'  //HS256 algorithm uses a single secret key while RS256 uses a private key to sign and a public key to verify
    }
    return jwt.sign(payload, secretKey, options);   // syntax of creating token
}

const registerUser = async (req, res) => {
    try {

        const { name, email, password, phone, address, github, linkedin, portfolio } = req.body;   //Extract data from request body

        if (!name || !email || !password || !phone) {                                              //Checking for required details 
            return res.status(400).json({ error: "Please fill the required details" })
        }

        if (!validator.isEmail(email)) {                                                           //Checking if email is valid or not
            return res.status(400).json({ error: "Invalid email" });
        }

        const existingUser = await User.findOne({ email, isDeleted: false });
        if (existingUser) {
            return res.status(400).json({ error: "Email already registered" });                    //Checking if user already exists
        }

        if (password.length < 8) {
            return res.status(400).json({ error: "Minimum length of password must be 8" })        //Checking password length
        }

        if (!validator.isMobilePhone(phone, "en-IN")) {                                           //Checking if phone number is valid or not 
            return res.status(400).json({ error: "Invalid phone number" });
        }

        if (github && (!validator.isURL(github) || !github.includes("github.com"))) {
            return res.status(400).json({ success: false, message: "Invalid GitHub profile URL" });

        }
        if (linkedin && (!validator.isURL(linkedin) || !linkedin.includes("linkedin.com"))) {
            return res.status(400).json({ success: false, message: "Invalid LinkedIn profile URL" });
        }
        if (portfolio && !validator.isURL(portfolio)) {
            return res.status(400).json({ success: false, message: "Invalid portfolio URL" });
        }
        const salt = await bcrypt.genSalt(10);                                                   //hashing the password
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({                                                              //Create and save new user to the database
            name: name,
            email: email,
            password: hashedPassword,
            phone: phone,
            address: address,
            github: github,
            linkedin: linkedin,
            portfolio: portfolio
        });

        const savedUser = await newUser.save();

        const token = createToken(savedUser._id);                                                 //generating token

        return res.status(201).json({ success: true, token, message: "User registered successfully", user: { _id: savedUser._id, name: savedUser.name, email: savedUser.email } });   //Return a success message

    } catch (error) {
        console.error("Signup.error:", error);
        return res.status(500).json({ success: false, error: "Internal server error" })
    }
}

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ success: false, message: "Please fill all the required details" })
        }
        const userExist = await User.findOne({ email, isDeleted: false });   //checking if user exist and account not deleted
        if (!userExist) {
            return res.status(400).json({ success: false, message: "User not found. Please register yourself!" })
        }
        const isMatch = await bcrypt.compare(password, userExist.password);   //matching password with the one stored in database associated to the given email
        if (!isMatch) {
            return res.status(400).json({ success: false, message: "Password not matched. Try again!" });
        }
        const token = createToken(userExist._id);
        res.json({ success: true, token, user: { _id: userExist._id, name: userExist.name, email: userExist.email } });
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

const changePassword = async (req, res) => {
    try {
        const userId = req.user.userId;
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }
        const { currentPassword, newPassword, confirmPassword } = req.body;
        if (!currentPassword || !newPassword || !confirmPassword) {
            return res.status(400).json({ success: false, message: "Please fill all the required details" })
        }
        if (newPassword.length < 8) {
            return res.status(400).json({ error: "Minimum length of password must be 8" })        //Checking password length
        }
        const isMatch = await bcrypt.compare(currentPassword, user.password);
        if (!isMatch) {
            return res.status(400).json({ success: false, message: "Your current password is incorrect" })
        }
        if (confirmPassword != newPassword) {
            return res.status(400).json({ success: false, message: "Check your new password again" })
        }
        const isSamePassword = await bcrypt.compare(newPassword, user.password);

        if (isSamePassword) {
            return res.status(400).json({ success: false, message: "New password must be different from current password" });
        }
        const salt = await bcrypt.genSalt(10);                                                   //hashing the password
        const hashedPassword = await bcrypt.hash(newPassword, salt);
        user.password = hashedPassword;
        await user.save();
        return res.status(200).json({ success: true, message: "Password updated successfully" });
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

export { registerUser, loginUser, changePassword }