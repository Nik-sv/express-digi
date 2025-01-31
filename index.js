/*


import express from "express";

const app = express();

const port = 3000;

app.use(express.json());

let teaData = [];
let nextId = 1;

// add a new tea
app.post("/teas", (req, res) => {
  const { name, price } = req.body;
  const newTea = { id: nextId++, name, price };
  teaData.push(newTea);
  res.status(201).send(newTea);
});

// get all tea
app.get("/teas", (req, res) => {
  res.status(200).send(teaData);
});

// get a tea with id
app.get("/teas/:id", (req, res) => {
  const tea = teaData.find((t) => t.id === parseInt(req.params.id));
  if (!tea) {
    return res.status(404).send("Tea not found");
  }
  res.status(200).send(tea);
});

// Update tea

app.put("/teas/:id", (req, res) => {
  const tea = teaData.find((t) => t.id === parseInt(req.params.id));

  if (!tea) {
    return res.status(404).send("Tea not found");
  }

  const { name, price } = req.body;
  tea.name = name;
  tea.price = price;
  res.send(200).send(tea);
});

// delete tea

app.delete("/teas/:id", (req, res) => {
  console.log("delete");
  console.log("req.params.id");

  const index = teaData.findIndex((t) => t.id === parseInt(req.params.id));

  if (index === -1) {
    return res.status(404).send("tea not found");
  }
  teaData.splice(index, 1);
  return res.status(204).send("deleted");
});

app.listen(port, () => {
  console.log(`Server is running it port: ${port}...`);
});

*/



import 'dotenv/config'


// Importing Express
import express from "express";

const app = express(); // Initializing Express App
const port = process.env.PORT || 3000; // Defining the server port

// Middleware to parse incoming JSON requests
app.use(express.json());

// In-memory database to store tea data (Array of objects)
let teaData = [];
let nextId = 1; // Auto-increment ID for each new tea entry

// 🟢 **Add a New Tea**
app.post("/teas", (req, res) => {
  const { name, price } = req.body; // Extracting tea details from request body
  const newTea = { id: nextId++, name, price }; // Creating new tea object
  teaData.push(newTea); // Storing tea in array
  res.status(201).send(newTea); // Responding with created tea (201: Created)
});

// 🟢 **Get All Teas**
app.get("/teas", (req, res) => {
  res.status(200).send(teaData); // Sending the entire tea list
});

// 🟢 **Get a Tea by ID**
app.get("/teas/:id", (req, res) => {
  const tea = teaData.find((t) => t.id === parseInt(req.params.id)); // Finding tea by ID
  if (!tea) {
    return res.status(404).send("Tea not found"); // 404 if tea doesn't exist
  }
  res.status(200).send(tea); // Sending found tea
});

// 🟢 **Update Tea by ID**
app.put("/teas/:id", (req, res) => {
  const tea = teaData.find((t) => t.id === parseInt(req.params.id)); // Finding tea by ID

  if (!tea) {
    return res.status(404).send("Tea not found"); // 404 if tea doesn't exist
  }

  const { name, price } = req.body; // Extracting new name & price from request
  tea.name = name; // Updating tea name
  tea.price = price; // Updating tea price
  res.status(200).send(tea); // Sending updated tea (Fixed `.send(200)` issue)
});

// 🟢 **Delete a Tea by ID**
app.delete("/teas/:id", (req, res) => {
  console.log("Deleting tea..."); // Debugging log
  console.log("Requested ID:", req.params.id); // Debugging log

  const index = teaData.findIndex((t) => t.id === parseInt(req.params.id)); // Finding tea index

  if (index === -1) {
    return res.status(404).send("Tea not found"); // 404 if tea doesn't exist
  }

  teaData.splice(index, 1); // Removing tea from array
  return res.status(204).send("Deleted"); // 204: No Content (successful deletion)
});

// 🟢 **Start the Server**
app.listen(port, () => {
  console.log(`Server is running on port: ${port}...`); // Logging the server status
});
