import bcrypt from "bcrypt"
import validator from "validator"
import User from "../models/User.js";
import Project from "../models/Project.js";
import Certificate from "../models/Certificate.js";

const getProfile = async (req, res) => {
    try {
        const userId = req.user.userId;
        const user = await User.findById(userId).select('-password');    //finding and getting the user associated with the userid excluding the password
        if (!user) {
            return res.status(400).json({ success: false, message: "User not found" });
        }
        return res.status(200).json({ success: true, user });
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

const updateProfile = async (req, res) => {

    try {

        const userId = req.user.userId;

        const user = await User.findById(userId);

        const {
            email,
            name,
            phone,
            address,
            github,
            linkedin,
            portfolio,
            headline,
            bio,
            skills,
            avatar
        } = req.body;

        if (!user) {

            return res.status(404).json({
                success: false,
                message: "User not found"
            });

        }

        if (email && !validator.isEmail(email)) {

            return res.status(400).json({
                success: false,
                message: "Invalid email"
            });

        }

        if (
            email &&
            email !== user.email &&
            await User.findOne({ email })
        ) {

            return res.status(400).json({
                success: false,
                message: "Email already registered"
            });

        }

        if (phone && !validator.isMobilePhone(phone, "en-IN")) {

            return res.status(400).json({
                success: false,
                message: "Invalid phone number"
            });

        }

        if (
            github &&
            (!validator.isURL(github) || !github.includes("github.com"))
        ) {

            return res.status(400).json({
                success: false,
                message: "Invalid GitHub profile URL"
            });

        }

        if (
            linkedin &&
            (!validator.isURL(linkedin) || !linkedin.includes("linkedin.com"))
        ) {

            return res.status(400).json({
                success: false,
                message: "Invalid LinkedIn profile URL"
            });

        }

        if (
            portfolio &&
            !validator.isURL(portfolio)
        ) {

            return res.status(400).json({
                success: false,
                message: "Invalid Portfolio URL"
            });

        }

        // Update fields

        user.email = email ?? user.email;
        user.name = name ?? user.name;
        user.phone = phone ?? user.phone;
        user.address = address ?? user.address;
        user.github = github ?? user.github;
        user.linkedin = linkedin ?? user.linkedin;
        user.portfolio = portfolio ?? user.portfolio;

        user.headline = headline ?? user.headline;
        user.bio = bio ?? user.bio;
        user.skills = skills ?? user.skills;
        user.avatar = avatar ?? user.avatar;

        await user.save();

        return res.status(200).json({

            success: true,
            message: "Profile updated successfully",
            user

        });

    }

    catch (error) {

        console.log(error);

        res.status(500).json({

            success: false,
            message: error.message

        });

    }

};

const deleteAccount = async (req, res) => {
    try {
        const userId = req.user.userId;
        const { password } = req.body;
        if (!password) {
            return res.status(400).json({ success: false, message: "Password is required" });
        }
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ success: false, message: "Incorrect password" });
        }
        user.isDeleted = true;
        user.deletedAt = new Date();

        await user.save();
        return res.status(200).json({ success: true, message: " Account deleted successfully!" });
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: error.message })
    }
}

const getDeveloperProfile = async (req,res)=>{

    try{

        const {id}=req.params;

        const user=await User.findById(id).select(
            "-password"
        );

        if(!user){

            return res.status(404).json({
                success:false,
                message:"Developer not found"
            });

        }

        const projectsCount=await Project.countDocuments({
            owner:id
        });

        const certificatesCount=await Certificate.countDocuments({
            $or:[
                {buyer:id},
                {seller:id}
            ]
        });

        const ownershipCount=await Certificate.countDocuments({
            buyer:id
        });

        res.json({

            success:true,

            user,

            stats:{

                projects:projectsCount,

                certificates:certificatesCount,

                ownerships:ownershipCount

            }

        });

    }

    catch(error){

        console.log(error);

        res.status(500).json({

            success:false,

            message:"Server Error"

        });

    }

};

export { getProfile, updateProfile, deleteAccount, getDeveloperProfile };