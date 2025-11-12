import User from "../models/User.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import Resume from "../models/Resume.js"

// generate token
const generateToken = (userId) => {
    const token = jwt.sign({ userId: userId }, process.env.JWT_SECRET, { expiresIn: "30d" });
    return token;
}

// register user 
// POST: /api/users/register
export const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ message: "All fields are required", succses: false, error: true });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists", succses: false, error: true });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ name, email, password: hashedPassword });
        await newUser.save();

        const token = generateToken(newUser._id);
        newUser.password = undefined;

        res.status(201).json({ message: "User registered successfully", succses: true, error: false, token, user: newUser });
    } catch (error) {
        res.status(500).json({ message: "Error registering user", error, succses: false, error: true });
    }
}

// login user
// POST: /api/users/login
export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "All fields are required", succses: false, error: true });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: "No user found", succses: false, error: true });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Incorrect password", succses: false, error: true });
        }

        const token = generateToken(user._id);
        user.password = undefined;

        res.status(200).json({ message: "User logged in successfully", succses: true, error: false, token, user });
    } catch (error) {
        res.status(500).json({ message: "Error logging in user", error, succses: false, error: true });
    }
}

// get user by id
// GET: /api/users/data
export const getUserById = async (req, res) => {
    try {
        const userId = req.userId
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: "User not found", succses: false, error: true });
        }

        user.password = undefined;

        res.status(200).json({ message: "User found successfully", succses: true, error: false, user });
    } catch (error) {
        res.status(500).json({ message: "Error getting user", error, succses: false, error: true });
    }
}

// get user resume
// GET: /api/users/resumes
export const getUserResumes = async (req, res) => {
    try {
        const userId = req.userId
        const resumes = await Resume.find({ userId: userId });

        res.status(200).json({ message: "Resume found successfully", succses: true, error: false, resumes });
    } catch (error) {
        res.status(500).json({ message: "Error getting resume", error, succses: false, error: true });
    }
}