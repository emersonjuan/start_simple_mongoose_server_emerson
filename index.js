const mongoose = require('mongoose');

const express = require('express')
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// require('dotenv').config();

const port = process.env.PORT || 3000;

// Create a Schema object

const Schema = mongoose.Schema;

// Create a Schema object
const studentSchema = new Schema({
    Name: { type: String, required: true },
    id: { type: Number, required: true }
});

// Create a Model object

const Student = mongoose.model("student",studentSchema);

app.get('/', (req, res) => {
  res.sendFile(__dirname + "/form.html")
});

app.post('/', async (req, res) => {
  // get the data from the form
  const myuri = req.body.myuri;

  // connect to the database and log the connection
  try {
    await mongoose.connect(myuri, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log("Connected to MongoDB");

  // add the data to the database
    const student = new Student({ Name: "Emerson Silva", id: "300375229"});
    await student.save();
    console.log("Student data saved to database");

  // send a response to the user
  res.send(`<h1>Document  Added</h1>`);
  }catch (error) {
    console.error("Error connecting to database:", error);
    res.status(500).send("Error saving data to database");
  }

});

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
