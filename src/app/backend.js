const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");

app.use(express.json());
app.use(cors());

main().catch((err) => console.log("Error connecting to MongoDB: ", err));
async function main() {
  await mongoose.connect("mongodb://localhost:27017/userInfo");
}

const userSchema = new mongoose.Schema({
  email: String,
  password: String,
  backupCodes: [Number],
});

const User = mongoose.model("User", userSchema);

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.post("/signup/api", async (req, res) => {
  const { email, password, backupCodes } = req.body;

  try {
    const existingUser = await User.findOne({email: email, password: password})
    if (existingUser) {
      return res.status(200).json({ message: "User exists" });
    }
    const newUser = new User({
      email: email,
      password: password,
      backupCodes: backupCodes,
    });
    await newUser.save();

    res.status(200).json({ message: "Success" });
  } catch (err) {
    console.log("Error saving to MongoDB: ", err);
  }
});

app.post("/login/api", async (req, res) => {
  const {email, password} = req.body;
  try {
    const user = await User.findOne({email: email, password: password})

    if (user) {
      res.status(200).json({message: "Login successful"})
    } else {
      res.status(200).json({message: "Login failed"});
    }
  } catch(err) {
    console.log("Error while requesting for login info: ", err);
  }
})

app.post('/backupcode/api', async (req, res) => {
  const { backupCode, email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user) {
      if (user.backupCodes.includes(backupCode)) {
        res.status(200).json({message: "Code exists"});
      } else {
        res.status(200).json({message: "Code does not exist"});
      }
    } else {
      res.status(200).json("User not found");
    }
  } catch (err) {
    console.log("Error while checking for code: ", err);
    res.status(500).json("Internal Server Error");
  }
});


app.listen(3000, () => {
  console.log("Server Listening at Port 3000.");
});
