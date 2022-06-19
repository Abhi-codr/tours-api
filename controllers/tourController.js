const Tour = require("../models/tourModel")

const getAllTours = async(req, res) => {
    try {
        const tours = await Tour.find({})
        res.status(200).json({ status: "success", data: { tours } })
    } catch (err) {
        res.status(400).json({ status: "failure", message: "data not found", err })
    }
}

const getOneTour = async(req, res) => {
    const tourId = req.params.id
    try {
        const tourFound = await Tour.findById(tourId)
        if (!tourFound) throw new Error("tour not found")
        res.status(200).json({ status: "success", data: { tour: tourFound } })
    } catch (err) {
        res.status(400).json({ status: "failure", message: "data not found" })
    }
}

const createTour = async(req, res) => {
    try {
        let newTour = await Tour.create(req.body)
        res.status(200).json({
            status: "success",
            data: { tour: newTour }
        })
    } catch (err) {
        res.status(400).json({ status: "failure", message: "data not found" })
    }
}

const updateTour = async(req, res) => {
    const tourId = req.params.id
    try {
        await Tour.findByIdAndUpdate(tourId, req.body)
        res.status(200).json({ status: "success", message: "tour updated" })
    } catch (err) {
        res.status(400).json({ status: "failure", message: "tour not modified" })
    }
}

const deleteTour = async(req, res) => {
    const tourId = req.params.id
    try {
        await Tour.deleteOne({ _id: tourId })
        res.status(200).json({ status: "success", message: "tour deleted" })
    } catch (err) {
        res.status(400).json({ status: "failure", message: "tour not deleted" })
    }
}

module.exports = { getAllTours, getOneTour, createTour, updateTour, deleteTour }