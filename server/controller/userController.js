const User = require("../Model/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { verifyEmail } = require("../emailVerify/verifyEmail");
const Session = require("../Model/sessionModel");
const { sentOTPMail } = require("../emailVerify/sendOTPMail");
const cloudinary = require("../utils/cloudinary");
require("dotenv").config();
const streamifier = require("streamifier");

//Registring User
exports.register = async (req, res) => {
  try {
    const { firstname, lastname, email, password } = req.body;

    // check empty fields
    if (!firstname || !lastname || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // check user already exists
    const userExist = await User.findOne({ email });

    if (userExist) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    // password hashing
    const hashedPassword = await bcrypt.hash(password, 10);

    // registering new user
    const newUser = await User.create({
      firstname,
      lastname,
      email,
      password: hashedPassword,
    });

    // creating token
    const token = jwt.sign({ id: newUser._id }, process.env.SECRET_KEY, {
      expiresIn: "10m",
    });

    // save token
    newUser.token = token;
    await newUser.save();

    // send verification email
    verifyEmail(token, email);

    return res.status(201).json({
      success: true,
      message: "User Registered Successfully",
      user: newUser,
    });
  } catch (err) {
    console.log(err);

    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

//verifying User
exports.verify = async (req, res) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(400).json({
        success: false,
        message: "Authorization token is missing or invalid",
      });
    }

    const token = authHeader.split(" ")[1];

    let decoded;

    try {
      decoded = jwt.verify(token, process.env.SECRET_KEY);
    } catch (err) {
      if (err.name === "TokenExpiredError") {
        return res.status(401).json({
          success: false,
          message: "Registration token has expired",
        });
      }

      return res.status(401).json({
        success: false,
        message: "Invalid token",
      });
    }

    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    if (user.isVerified) {
      return res.status(400).json({
        success: false,
        message: "Email already verified",
      });
    }

    user.token = null;
    user.isVerified = true;

    await user.save();

    return res.status(200).json({
      success: true,
      message: "Email verified successfully",
    });
  } catch (err) {
    console.log(err);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

//reverifying
exports.reVerify = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ message: "User not found", success: false });
    }
    const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, {
      expiresIn: "10m",
    });
    verifyEmail(token, email); //send email here
    user.token = token;
    await user.save();
    return res.status(200).json({
      success: true,
      message: "Verification Email Sent Again succesfully",
      token: user.token,
    });
  } catch (err) {
    return res.status(400).json({ success: false, message: err.message });
  }
};

//User Login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "All Fields are Required" });
    }
    const exisitingUser = await User.findOne({ email });
    if (!exisitingUser) {
      return res
        .status(400)
        .json({ success: false, message: "User Not Exist" });
    }
    const isPasswordValid = await bcrypt.compare(
      password,
      exisitingUser.password,
    );
    if (!isPasswordValid) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid Credentials" });
    }
    if (exisitingUser.isVerified === false) {
      return res
        .status(400)
        .json({ success: false, message: "Verify your account and login" });
    }

    //generate token
    const accessToken = jwt.sign(
      { id: exisitingUser._id },
      process.env.SECRET_KEY,
      { expiresIn: "10d" },
    );
    const refreshToken = jwt.sign(
      { id: exisitingUser._id },
      process.env.SECRET_KEY,
      { expiresIn: "30d" },
    );

    exisitingUser.isLoggedIn = true;
    await exisitingUser.save();

    //check for existing session and delete it.
    const exisitingSession = await Session.findOne({
      userId: exisitingUser._id,
    });
    if (exisitingSession) {
      await Session.deleteOne({ userId: exisitingUser._id });
    }

    //Create a new session
    await Session.create({ userId: exisitingUser._id });
    return res.status(200).json({
      success: true,
      message: `Welcome back ${exisitingUser.firstname}`,
      user: exisitingUser,
      accessToken,
      refreshToken,
    });
  } catch (err) {
    return res.status(400).json({ success: false, message: err.message });
  }
};

//user Logout
exports.logout = async (req, res) => {
  try {
    const userId = req.id;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    await Session.deleteMany({ userId });

    await User.findByIdAndUpdate(userId, {
      isLoggedIn: false,
    });

    return res.status(200).json({
      success: true,
      message: "User logged out successfully",
    });
  } catch (err) {
    console.error(err);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

//ForgotPassword
exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required",
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    user.otp = otp;
    user.otpExpiry = new Date(Date.now() + 10 * 60 * 1000);

    await user.save();

    await sentOTPMail(otp, email);

    return res.status(200).json({
      success: true,
      message: "OTP sent successfully",
    });
  } catch (err) {
    console.error(err);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

//otp verifying
exports.verifyOTP = async (req, res) => {
  try {
    const otp = req.body?.otp;
    const { email } = req.params;

    if (!otp) {
      return res.status(400).json({
        success: false,
        message: "Otp required",
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User Not Found",
      });
    }

    if (!user.otp || !user.otpExpiry) {
      return res.status(400).json({
        success: false,
        message: "OTP not generated or already verified",
      });
    }

    if (user.otpExpiry < new Date()) {
      return res.status(400).json({
        success: false,
        message: "OTP has expired, please request a new one",
      });
    }

    if (String(otp) !== String(user.otp)) {
      return res.status(400).json({
        success: false,
        message: "OTP is invalid",
      });
    }

    user.otp = null;
    user.otpExpiry = null;

    await user.save();

    return res.status(200).json({
      success: true,
      message: "OTP verified successfully",
    });
  } catch (err) {
    console.log(err);
    console.log("VERIFY OTP ERROR:", err);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

//change password
exports.changePassword = async (req, res) => {
  try {
    const { newpassword, confirmpassword } = req.body;
    const { email } = req.params;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }

    if (!newpassword || !confirmpassword) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    if (newpassword !== confirmpassword) {
      return res.status(400).json({
        success: false,
        message: "Passwords do not match",
      });
    }

    const hashedPassword = await bcrypt.hash(newpassword, 10);

    user.password = hashedPassword;

    await user.save();

    return res.status(200).json({
      success: true,
      message: "Password changed successfully",
    });
  } catch (err) {
    console.log(err);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

//All users
exports.allUser = async (req, res) => {
  try {
    const users = await User.find();
    return res.status(200).json({ success: true, users });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

//GetUserById
exports.getUserById = async (req, res) => {
  try {
    const { userId } = req.params; //extract user id from request params

    console.log("Received userId:", userId);

    const user = await User.findById(userId).select(
      "-password -otp -otpExpiry -token",
    );

    console.log("User found:", user);

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not Found" });
    }

    res.status(200).json({ success: true, user });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

//get all user
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password -otp -otpExpiry -token");

    res.status(200).json({
      success: true,
      count: users.length,
      users,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

//updateUser
exports.updateUser = async (req, res) => {
  try {
    const userIdToUpdate = req.params.id;
    const loggedInUser = req.user;

    const { firstname, lastname, address, city, zipCode, phone, role } =
      req.body;

    // AUTH CHECK
    if (
      loggedInUser._id.toString() !== userIdToUpdate &&
      loggedInUser.role !== "admin"
    ) {
      return res.status(403).json({
        success: false,
        message: "You are not allowed to update this profile",
      });
    }

    let user = await User.findById(userIdToUpdate);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User Not Found",
      });
    }

    let profilePicUrl = user.profilePic;
    let profilePicPublicId = user.profilePicPublicId;

    // ===============================
    // CLOUDINARY UPLOAD FIXED
    // ===============================
    if (req.file) {
      try {
        // delete old image
        if (profilePicPublicId) {
          await cloudinary.v2.uploader.destroy(profilePicPublicId);
        }

        const uploadResult = await new Promise((resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream(
            { folder: "profiles" },
            (err, result) => {
              if (err) {
                return reject(err);
              }
              resolve(result);
            },
          );

          streamifier.createReadStream(req.file.buffer).pipe(stream);
        });

        profilePicUrl = uploadResult.secure_url;
        profilePicPublicId = uploadResult.public_id;
      } catch (uploadErr) {
        return res.status(500).json({
          success: false,
          message: "Image upload failed",
          error: uploadErr.message,
        });
      }
    }

    // ===============================
    // UPDATE FIELDS
    // ===============================
    user.firstname = firstname || user.firstname;
    user.lastname = lastname || user.lastname;
    user.address = address || user.address;
    user.city = city || user.city;
    user.zipCode = zipCode || user.zipCode;
    user.phone = phone || user.phone;

    if (loggedInUser.role === "admin" && role) {
      user.role = role;
    }

    user.profilePic = profilePicUrl;
    user.profilePicPublicId = profilePicPublicId;

    const updatedUser = await user.save();

    return res.status(200).json({
      success: true,
      message: "Profile updated Successfully",
      user: updatedUser,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
