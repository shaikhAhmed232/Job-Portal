const router = require("express").Router();
const {applyOnJob, getAppliedJobs, deleteAppliedJobs} = require('./appliedjobs.controller');
const checkAuth = require("../../middlewares/auth");
const { chekPerm } = require("../../middlewares/checkPermission");

router.post('/', checkAuth, chekPerm, applyOnJob);
router.get('/', checkAuth, getAppliedJobs);
router.route('/:id').delete(checkAuth, chekPerm, deleteAppliedJobs);

module.exports = router;