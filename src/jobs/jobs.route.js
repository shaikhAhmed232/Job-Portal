const router = require('express').Router();
const {getJobs, getJob, createJob, updateJob} = require("./jobs.controller");
const checkAuth = require("../../middlewares/auth");
const {chekPerm} = require("../../middlewares/checkPermission");


router.route('/').get(checkAuth, chekPerm, getJobs).post(checkAuth, chekPerm,createJob);
router.route('/:id').get(checkAuth, chekPerm, getJob).put(checkAuth, chekPerm, updateJob);

module.exports = router;