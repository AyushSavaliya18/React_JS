const express = require("express");
const mongoose = require("mongoose");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

// MongoDB Connection
const db = mongoose.connect("mongodb://localhost:27017/Ayush",(error)=>{
    if(error){
        console.log("Error in connecting to Database MongoDB");
    }
    else{
        console.log("Database is connected to MongoDB");
    }
});
module.exports = {db};


const MessageSchema = new mongoose.Schema(
  {
    name: {type: String, required: true},
    email: {type: String, required: true},
    phone: {type: String, required: true},
    message: {type: String, required: true},
  },
  {timestamps: true}
);

const Message = mongoose.model("Message", MessageSchema);

app.post("/api/messages", async (req, res) => {
  try {
    const {name, email, phone, message} = req.body;

    const messagedata = {
      name: name,
      email: email,
      phone: phone,
      message: message,
    };

    if (!name || !email || !phone || !message) {
      return res.status(400).send({error: "All fields are required!"});
    }

    const data = await Message.create(messagedata);
    console.log("Created Admin: ", data);


    res.status(201).send({success: true, message: "Message stored successfully!"});
  } catch (error) {
    res.status(500).send({error: "Server error!"});
  }
});


app.listen(PORT, () => {
  console.log(` Server running on port ${PORT}`);
});
