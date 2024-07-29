const express = require("express");
const app = express();

app.get("/", (req, res) => res.send("Express on Vercel"));

app.listen(3000, () => console.log("Server ready on port 3000."));

// simple post method
app.post("/post", (req, res) => {
    res.send("Post method called");
});

module.exports = app;
