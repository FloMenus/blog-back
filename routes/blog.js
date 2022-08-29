const express = require("express");
const app = express();
const fs = require("fs");
const { body, validationResult } = require("express-validator");
const slugify = require("slugify");

const categories = require("../data/categories.json");

// GET //////////////////////////////////////////////////////////////////////////////

console.log(categories);

app.get("/", (req, res) => {
  fs.readFile("./data/posts.json", (err, data) => {
    if (err) {
      console.log(err);
    } else {
      const usableData = JSON.parse(data.toString());
      console.log(`usableData =${usableData}`);

      res.json(usableData);
    }
  });
});

app.get("/:slug", (req, res) => {
  fs.readFile("./data/posts.json", (err, data) => {
    if (err) {
      console.log(err);
    } else {
      const usableData = JSON.parse(data.toString());
      console.log(`usableData= ${usableData}`);

      const requiredData = usableData.find(
        (post) => post.slug === req.params.slug
      );
      console.log(`requiredData= ${requiredData}`);

      res.json(requiredData);
    }
  });
});

// POST //////////////////////////////////////////////////////////////////////////////

app.post(
  "/",
    body("title")
      .isLength({ min: 4 })
      .withMessage("Title must be at least 4 characters long"),
    body("autor")
      .isLength({ min: 4 })
      .withMessage("Autor must be at least 4 characters long"),
    body("description")
      .isLength({ min: 4 })
      .withMessage("Description must be at least 8 characters long"),
    body("categorie")
      .isIn(categories)
      .withMessage("Categorie must be one of the following: " + categories),
  (req, res) => {
    const { errors } = validationResult(req);

    fs.readFile("./data/posts.json", (err, data) => {
      if (err) {
        console.log(err);
      } else {
        const postObject = req.body;
        postObject.slug = slugify(postObject.title);
        postObject.time = new Date();
        const usableData = JSON.parse(data.toString());
        usableData.push(req.body);

      fs.writeFile("./data/posts.json", JSON.stringify(usableData), (err) => {
        console.log(err);
      });
    }
    res.json("Post created");
  });
  });

module.exports = app;
