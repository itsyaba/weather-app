const path = require("path");
const express = require("express");
const hbs = require("hbs");

const geocode = require("./utils/geocode");
const forcast = require("./utils/forcast");
// console.log(path.join(__dirname  ));

const app = express();
const publicDir = path.join(__dirname, "../public");

app.set("view engine", "hbs");
app.use(express.static(publicDir));
app.set("views", path.join(__dirname, "../templates/views"));
hbs.registerPartials(path.join(__dirname, "../templates/partials"));
// app.get("/about", (req, res) => {
//   res.send("<h1>About Page</h1>");
// });

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather App",
    name: "Yaba",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Me",
    name: "Yaba",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help Page",
    message: "This is the Help page.",
    name: "Yaba",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.adress) {
    return res.send({
      error: "Adress Is Required",
    });
  }

  geocode(req.query.adress, (error, { longitude, latitude, location } = {}) => {
    if (error) {
      return res.send({ error });
    }
    forcast(latitude, longitude, (error, forcastData) => {
      if (error) {
        return res.send({ error });
      }
      console.log(location);
      console.log(forcastData);
      res.send({
        forcast: forcastData,
        location,
        adress: req.query.adress,
      });
    });
  });
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "You must provide a search term ",
    });
  }
  res.send({
    products: [],
  });
});

app.get("/help/*", (req, res) => {
  res.send("Help Article Not Found");
});

app.get("*", (req, res) => {
  res.render("error");
});

app.listen(3000, () => {
  console.log("Server is up and running on port 3000!");
});
