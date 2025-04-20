const { compare, hash } = require("bcrypt");
const { theme, author, account } = require("../model/model");

const userCon = {
  // Lấy danh sách người dùng
  getUser: async (req, res) => {
    try {
      const user = await account.find();
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  // Xóa người dùng
  deleteUser: async (req, res) => {
    try {
      await account.findByIdAndDelete(req.params.id);
      res.status(200).json("Xóa thành công !!!");
    } catch (error) {
      res.status(500).json(error);
    }
  },

  // Lấy thông tin chi tiết của một người dùng
  getAnUser: async (req, res) => {
    try {
      const au = await account.findById(req.params.id);
      res.status(200).json(au);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  // Cập nhật thông tin người dùng
  updateUser: async (req, res) => {
    try {
      const authorToUpdate = await account.findById(req.params.id);
      await authorToUpdate.updateOne({ $set: req.body });
      res.status(200).json("Cập nhật thành công !!!");
    } catch (error) {
      res.status(500).json(error);
    }
  },

  // Khôi phục mật khẩu
  forgotPassword: async (req, res) => {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Email là bắt buộc!" });
    }

    try {
      // Tìm người dùng theo email
      const user = await account.findOne({ email });

      if (!user) {
        return res.status(404).json({ message: "Người dùng không tồn tại!" });
      }

      // Tạo token khôi phục mật khẩu
      const resetToken = Math.random().toString(36).substring(2);
      user.resetToken = resetToken;
      await user.save();

      // Cấu hình dịch vụ gửi email
      const transporter = nodemailer.createTransport({
        service: "gmail", // Bạn có thể sử dụng SMTP khác như SendGrid
        auth: {
          user: "your-email@gmail.com", // Thay bằng email của bạn
          pass: "your-email-password", // Thay bằng mật khẩu email của bạn
        },
      });

      // Nội dung email
      const resetLink = `http://localhost:3000/reset-password/${resetToken}`;
      const mailOptions = {
        from: "your-email@gmail.com",
        to: email,
        subject: "Khôi phục mật khẩu",
        text: `Nhấn vào đây để khôi phục mật khẩu: ${resetLink}`,
      };

      // Gửi email
      await transporter.sendMail(mailOptions);

      res.status(200).json({ message: "Email khôi phục đã được gửi!" });
    } catch (error) {
      res.status(500).json({ message: "Có lỗi xảy ra!", error });
    }
  },
};

module.exports = userCon;
