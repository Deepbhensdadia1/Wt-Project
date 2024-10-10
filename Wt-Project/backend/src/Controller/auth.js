const User = require("../models/Auth");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const uploadImage = require('../middlewares/uploadImage');

exports.users = async (req, res, next) => {
    try {
      const users = await User.find().select("-password");
      res.status(200).json(users);
  } catch (err) {
      console.log(err);
  }
};

exports.register = async (req, res) => {
    try {
      const existingUser = await User.findOne({ email: req.body.email });
  
      if (existingUser) {
        return res
          .status(400)
          .json({ status: 400, success: false, message: "Email already exists" });
      }
      
      // const { profileImage } = req.files;
      
      // uploadImage('UserImages', profileImage)(req, res, async () => {
      //   const { uploadedImage } = req;
  
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
  
        const newUser = new User({
          ...req.body,
          password: hashedPassword,
          // profileImage: uploadedImage
        });
  
        await newUser.save();
  
        res.status(200).json({ status: 200, success: true, message: "User has been created." });
      // });
    } catch (err) {
      res.status(500).json({ status: 500, success: false, message: "Internal server error", error: err });
    }
  };


exports.login = async (req, res) => { 
    const { email, password } = req.body

    try{
        const user = await User.findOne({ email: email });

        if (user){ 
          
            const isPasswordValid = await bcrypt.compare(password, user.password);

            if (isPasswordValid) { 
              const token = jwt.sign(
                  { email: email, id: user._id.toString(), isAdmin: user.isAdmin },
                  process.env.JWT
              );

              res.cookie("access_token", token, {
                  httpOnly: true
              }).status(200).json({ message: 'Login successful', token, userId: user._id, userType: user.isAdmin });
          } else {
              res.status(401).json({ message: 'Invalid credentials' });
          }
      } else {
          res.status(401).json({ message: 'Invalid credentials' });
      }
    }catch (err){
        res.status(500).json({ message: 'Internal server error' });
    }
}