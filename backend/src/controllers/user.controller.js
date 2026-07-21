import { User } from "../models/user.model.js";

const registerUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            return res.status(400).json({ message: "All Fields are Required !" })
        }

        const existing = await User.findOne({ email: email.toLowerCase() });

        if (existing) {
            return res.status(400).json({ message: "This User Already Exists !" })
        }

        const user = await User.create({
            username,
            email: email.toLowerCase(),
            password,
            loggedIn: false,
        });

        res.status(201).json({ message: "User Created Successfully ! ", user: { id: user.id, email: user.email, username: user.username } })

    } catch (error) {
        res.status(500).json({ message: "Internal Server Error !", error: error.message });
    }
};

export{
    registerUser
}