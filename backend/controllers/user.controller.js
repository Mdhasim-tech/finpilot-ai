import User from "../models/user.model.js";
export const getProfile = async (req, res) => {

    try {

        res.status(200).json({

            success: true,

            user: req.user,

        });

    } catch (error) {

        res.status(500).json({

            success: false,

            message: "Internal Server Error",

        });

    }

};



export const updateProfile = async (req, res) => {

    try {

        const { name, email } = req.body;

        const user = await User.findById(req.user._id);

        user.name = name;
        user.email = email;

        await user.save();

        res.status(200).json({

            success: true,

            user,

            message: "Profile updated successfully.",

        });

    } catch (error) {

        res.status(500).json({

            success: false,

            message: "Internal Server Error",

        });

    }

};