const express = require("express");
const { coursesController } = require("../controllers");

const router = express.Router();

// Define relative routes
router.get("/", coursesController.listCourses); // For GET /api/v1/courses
router.post("/", coursesController.createCourse); // For POST /api/v1/courses
router.get("/:id", coursesController.courseDetails); // For GET /api/v1/courses/:id
router.put("/:id", coursesController.updateCourse); // For PUT /api/v1/courses/:id
router.delete("/:id", coursesController.deleteCourse); // For DELETE /api/v1/courses/:id

module.exports = router;
