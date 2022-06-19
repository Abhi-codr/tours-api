const {
  getAllTours,
  createTour,
  getOneTour,
  updateTour,
  deleteTour,
} = require("../controllers/tourController");

const router = require("express").Router();

router.route("/").get(getAllTours).post(createTour);

router.route("/:id").get(getOneTour).patch(updateTour).delete(deleteTour);

module.exports = router;
