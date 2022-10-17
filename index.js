const express = require("express");
const { json } = require("express");
const flights = require("./controllers/flightController");
const models = require("./models/Flight");
const routes = require("./routes/flightRoute");
const Book = models;
const app = express();

app.use(json());

app.use("/", routes);

//Add/Book Flight

app.post("/books", function (req, res) {
  Book.create(
    {
      title: "flight to canada",
      time: "1pm",
      price: 26000,
      date: "26-06-2022",
    },
    (err, newBook) => {
      if (err) {
        return res.status(500).json("Server error:" + "" + err);
      } else {
        return res
          .status(200)
          .json({ message: "New book created successfully", newBook });
      }
    }
  );
});

//Get all flight

app.get("/books", (req, res) => {
  Book.find({}, (err, books) => {
    if (err) {
      return res.status(500).json({ message: err });
    } else {
      return res.status(200).json(books);
    }
  });
});

//Get single flight

app.get("/books/:id", (req, res) => {
  Book.findOne({ _id: req.params.id }, (err, book) => {
    if (err) {
      return res.status(500).json({ message: err });
    } else if (!book) {
      return res.status(404).json({ message: "Book not found" });
    } else {
      return res.status(200).json(book);
    }
  });
});

//Update/Edit Flight

app.put("/book/:id", (req, res) => {
  Book.findOneAndUpdate(
    { _id: req.params.id },
    {
      title: "flight to canada",
      time: "1pm",
      price: 26000,
      date: "26-06-2022",
    },
    (err, book) => {
      if (err) {
        return res.status(500).json({ message: err });
      } else if (!book) {
        return res.status(404).json({ message: "Book not found" });
      } else {
        book.save((err, saveBook) => {
          if (err) {
            return res.status(500).json({ message: err });
          } else {
            return res
              .status(200)
              .json({ message: "Book updated successfully", saveBook });
          }
        });
      }
    }
  );
});

//Delete flight

app.delete("/books/:id", (req, res) => {
  Book.findByIdAndDelete(req.params.id, (err, book) => {
    if (err) {
      return res.status(500).json({ message: err });
    } else if (!book) {
      return res.status(404).json({ message: "Book not found" });
    } else {
      return res.status(200).json({ message: "Book deleted successfully" });
    }
  });
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
