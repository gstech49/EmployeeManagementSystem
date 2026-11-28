import "dotenv/config"
import connectDB from "./config/db.js"
import User from "./models/User.js"
import bcrypt from "bcrypt"

const TemporaryPassword = "admin1234"
async function registerAdmin() {
  try {
    const ADMIN_EMAIL = process.env.ADMIN_EMAIL;
    if(!ADMIN_EMAIL) {
      console.error("ADMIN_EMAIL is not defined in the environment variables.");
      process.exit(1);
    }
      await connectDB(); 
      const existingAdmin = await User.findOne({ email: process.env.ADMIN_EMAIL });
      if(existingAdmin) {
        console.log("User already exists as role", existingAdmin.role);
        process.exit(0);
      } else {
        const hashedPassword = await bcrypt.hash(TemporaryPassword, 10);
        const admin = await User.create({
          name: "Admin",
          email: process.env.ADMIN_EMAIL,
          password: hashedPassword,
          role: "ADMIN"
        });
        console.log("Admin registered successfully");
        console.log("\nEmail:", admin.email);
        console.log("Password:", TemporaryPassword);
        console.log("Please change the password after first login.");
        process.exit(0);
      }
  } catch (error) {
    console.error("Seed Failed:", error);
  }
}

registerAdmin();