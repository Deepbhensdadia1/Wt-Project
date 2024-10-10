
const uploadImage = (destination, profileImage) => async (req, res, next) => {
  try {

    // Check File type is Image
    if (!/^image/.test(profileImage.mimetype)) return res.json({ status: 500, success: false, message: "File type error" });

    profileImage.mv(`./uploads/${destination}/${profileImage.name}`, async err => {
      if (err) {
        return res.status(500).json({ status: 500, success: false, message: "Error uploading image" });
      }

      req.uploadedImage = profileImage.name;

      next();
    });
  } catch (err) {
    res.status(500).json({ status: 500, success: false, message: "Internal server error", error: err });
  }
};

module.exports = uploadImage;
