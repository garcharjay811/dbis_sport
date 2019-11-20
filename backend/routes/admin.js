const express = require("express");

const AdminController = require("../controllers/admin");

const router = express.Router();

router.post("/addSport", AdminController.createSport);
router.put("/updateSport", AdminController.updateSport);
router.get("/getSports", AdminController.getSports);
router.get("/getSportByName/:sport_name", AdminController.getSportByName);

router.post("/addInstituteAndSO", AdminController.createInstituteAndSO);
router.put("/updateInstitute", AdminController.updateInstitute);
router.get("/getInstitutes", AdminController.getInstitutes);
router.get("/getInstituteByName/:inst_name", AdminController.getInstituteByName);

router.post("/addParticipant", AdminController.createParticipant);
router.put("/updateParticipant", AdminController.updateParticipant);
router.get("/getParticipants", AdminController.getParticipants);
router.get("/getParticipantByRoll_ID/:roll_id", AdminController.getParticipantByRoll_ID);

router.post("/addReferee", AdminController.createReferee);
router.put("/updateReferee", AdminController.updateReferee);
router.get("/getReferees", AdminController.getReferees);
router.get("/getRefereeByName/:referee_name", AdminController.getRefereeByName);

router.post("/addVenue", AdminController.createVenue);
router.put("/updateVenue", AdminController.updateVenue);
router.get("/getVenues", AdminController.getVenues);
router.get("/getVenueByName/:venue_name", AdminController.getVenueByName);

router.post("/addGroup", AdminController.createGroup);
// router.post("/populateGroup", AdminController.PopulateGroup);
router.get("/getPopulatedGroups", AdminController.getPopulatedGroups);
router.get("/getGroups", AdminController.getGroups);
router.post("/PopulateGroup/:group_name", AdminController.addGroupAndPopulate);

router.post("/updateTeamMatch/:match_id", AdminController.updateTeamMatch);
router.get("/getTeamMatches", AdminController.getTeamMatches);
router.get("/getNumberOfTeamMatches", AdminController.getNumberOfTeamMatches);
router.get("/getNumberOfNullTeamMatches", AdminController.getNumberOfNullTeamMatches);

router.get("/getNullTeamMatches", AdminController.getNullTeamMatches);
router.get("/getUpcomingTeamMatches", AdminController.getUpcomingMatches);
router.get("/getCompletedTeamMatches", AdminController.getCompletedMatches);

module.exports = router;