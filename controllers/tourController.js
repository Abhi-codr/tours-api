const Tour = require("../models/tourModel");

const getAllTours = async (req, res) => {
  try {
    const queryObj = req.query;
    const filterObj = { ...queryObj };
    const excludedFields = ["page", "sort", "limit", "fields", "_id"];
    excludedFields.map((excField) => delete filterObj[excField]);
    //Checking if filter has value
    Object.keys(filterObj).map((filterKey) =>
      !filterObj[filterKey] ? delete filterObj[filterKey] : ""
    );

    //Adding filters
    const query = Tour.find(filterObj);

    //Adding Sort
    if (queryObj.sort && queryObj.sort.trim()) {
      const sortStr = queryObj.sort.trim().replace(",", " ");
      query.sort(sortStr);
    }

    //Adding Field Select
    if (queryObj.fields && queryObj.fields.trim()) {
      const fieldStr = queryObj.fields.trim().replace(",", " ");
      query.select(fieldStr);
    }

    //Adding pagination
    const page = req.query.page || 1;
    const limit = req.query.limit || 50;
    const skip = (page - 1) * limit;

    if (queryObj.page) {
      const tourCount = await Tour.countDocuments();
      if (skip > tourCount) throw new Error("page does not exist");
    }

    query.skip(skip).limit(limit);

    //Querying tours
    const tours = await query;
    res
      .status(200)
      .json({ status: "success", data: { tours, count: tours.length } });
  } catch (err) {
    res.status(400).json({ status: "failure", message: "data not found", err });
  }
};

const getOneTour = async (req, res) => {
  const tourId = req.params.id;
  try {
    const tourFound = await Tour.findById(tourId);
    if (!tourFound) throw new Error("tour not found");
    res.status(200).json({ status: "success", data: { tour: tourFound } });
  } catch (err) {
    res.status(400).json({ status: "failure", message: "data not found" });
  }
};

const createTour = async (req, res) => {
  try {
    let newTour = await Tour.create(req.body);
    res.status(200).json({
      status: "success",
      data: { tour: newTour },
    });
  } catch (err) {
    res.status(400).json({ status: "failure", message: "data not found" });
  }
};

const updateTour = async (req, res) => {
  const tourId = req.params.id;
  try {
    await Tour.findByIdAndUpdate(tourId, req.body);
    res.status(200).json({ status: "success", message: "tour updated" });
  } catch (err) {
    res.status(400).json({ status: "failure", message: "tour not modified" });
  }
};

const deleteTour = async (req, res) => {
  const tourId = req.params.id;
  try {
    await Tour.deleteOne({ _id: tourId });
    res.status(200).json({ status: "success", message: "tour deleted" });
  } catch (err) {
    res.status(400).json({ status: "failure", message: "tour not deleted" });
  }
};

module.exports = {
  getAllTours,
  getOneTour,
  createTour,
  updateTour,
  deleteTour,
};
