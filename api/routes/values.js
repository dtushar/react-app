const express = require("express");
const router = express.Router();
const fs = require("fs");

/* GET initial values. */
router.get("/initialvalues", function(req, res, next) {
  fs.readFile(
    process.cwd() + "/public/data/initialValues.json",
    (err, data) => {
      if (err) throw new Error("Error reading file : " + err);
      let values = JSON.parse(data);
      res.send(values);
    }
  );
});

router.post("/savevalues", function(req, res, next) {
  fs.writeFile(
    process.cwd() + "/public/data/modifiedValues.json",
    JSON.stringify(req.body, null, 4),
    err => {
      if (err) throw new Error("Error wriritng file : " + err);
      console.log("Data written to file");
      res.send("success");
    }
  );
});

module.exports = router;
