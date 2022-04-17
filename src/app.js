const geocode = require("./utils/geocode");
const forcast = require("./utils/forecast");
const path = require("path");
const express = require("express");
const hbs = require("hbs");

const app = express();
const port = process.env.PORT || 3000;
// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// Setup handlebars engine and view location
app.set("views", viewPath);
app.set("view engine", "hbs");
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather",
    name: "Zeeshan Saeed",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About",
    name: "Zeeshan Saeed",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    name: "Zeeshan Saeed",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "You must provide address",
    });
  }

  geocode(
    req.query.address,
    (error, { latitude, longitude, location } = {}) => {
      if (error) {
        return res.send({ error });
      }

      forcast(latitude, longitude, (error, forecastData) => {
        if (error) {
          res.send({ error });
        }

        res.send({
          forcast: forecastData,
          location,
          address: req.query.address,
        });
      });
    }
  );
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Zeeshan Saeed",
    errorMessage: "Help article not found",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Zeeshan Saeed",
    errorMessage: "Page not found",
  });
});

app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
