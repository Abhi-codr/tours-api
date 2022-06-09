const fs = require("fs").promises

const getAllTours = async(req, res) => {
    try {
        const tours = JSON.parse(await fs.readFile("../dev-data/data/tours-simple.json", "utf-8"))
        res.status(200).json({ status: "success", data: { tours } })
    } catch (err) {
        res.status(400).json({ status: "failure", message: "data not found", err })
    }
}

const getOneTour = async(req, res) => {
    const tourId = req.params.id
    try {
        const tours = JSON.parse(await fs.readFile("../dev-data/data/tours-simple.json", "utf-8"))
        const tourFound = tours.find(tour => tour.id == tourId)
        if (!tourFound) throw new Error("tour not found")
        res.status(200).json({ status: "success", data: { tour: tourFound } })
    } catch (err) {
        res.status(400).json({ status: "failure", message: "data not found" })
    }
}

const createTour = async(req, res) => {
    const tourId = req.params.id
    try {
        let tours = JSON.parse(await fs.readFile("../dev-data/data/tours-simple.json", "utf-8"))
        const newTour = {...req.body, ... { id: tours[tours.length - 1].id + 1 } }
        tours.push(newTour);
        await fs.writeFile("./dev-data/data/tours-simple.json", JSON.stringify(tours))
        res.status(200).json({
            status: "success",
            data: { tour: newTour }
        })
    } catch (err) {
        res.status(400).json({ status: "failure", message: "data not found" })
    }
}

const updateTour = async(req, res) => {
    try {
        //Some updating operation
        const tours = {}
        res.status(200).json({ status: "success", data: { tours } })
    } catch (err) {
        res.status(400).json({ status: "failure", message: "data not found" })
    }
}

const deleteTour = async(req, res) => {
    try {
        //Some deletion operation
        res.status(200).json({ status: "success" })
    } catch (err) {
        res.status(400).json({ status: "failure", message: "tour not deleted" })
    }
}

module.exports = { getAllTours, getOneTour, createTour, updateTour, deleteTour }