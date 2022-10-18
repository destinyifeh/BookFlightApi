const { Flights } = require("../models/Flight");
const { v4: uuid } = require("uuid");

exports.addFlight = async (req, res) => {
  try {
    console.log(req.body);
    const { title, price } = await req.body;
    const newFlight = {
      id: uuid(),
      title,
      price,
      time: new Date().toLocaleDateString(),
      date: new Date().toLocaleTimeString(),
    };
    Flights.push(newFlight);
    res.status(200).json({ message: "Flight created", newFlight: newFlight });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
};

exports.getFlights = async (req, res) => {
  try {
    const flights = Flights;
    res.status(200).json({ message: "All flights", flights });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
};

exports.getFlight = async (req, res) => {
  try {
    let id = req.params.id;
    let flight = Flights.find((flight) => flight.id === id);
    if (flight) {
      res.status(200).json({ message: "Flight found", flight: flight });
    } else {
      res.status(404).json({ message: "Flight not found" });
    }
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: err.message });
  }
};

exports.updateFlight = async (req, res) => {
  try {
    let id = req.params.id;
    let flight = Flights.find((flight) => flight.id === id);
    const { title, price } = await req.body;
    if (flight) {
      (flight.title = title),
        (flight.price = price),
        res.status(200).json({ message: "Flight found", flight: flight });
    } else {
      res.status(404).json({ message: "Flight not found" });
    }
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: err.message });
  }
};

exports.deleteFlight = async (req, res) => {
  try {
    let id = req.params.id;

    let flight = Flights.find((flight) => flight.id === id);
    if (flight) {
      Flights.splice(Flights.indexOf(flight), 1);
      res.status(200).json({ message: "delated", flight });
    } else {
      res.status(404).json({ message: "Flight not found" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
};
