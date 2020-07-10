const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const port = process.env.PORT || 3000;

let studentDetails = require("./students");
let staffDetails = require("./staffs");

app.use(bodyParser.json());

app.post("/student", (req, res) => {
  studentDetails.push(req.body);
  res.json({ message: "Student Details" });
});

app.post("/staff", (req, res) => {
  staffDetails.push(req.body);
  res.json({ message: "Staff Details" });
});

app.get("/student", (req, res) => {
  let details = studentDetails.map((data) => {
    return {
      id: data.id,
      student_name: data.student_name,
      email: data.email,
      staff_id: data.staff_id,
    };
  });
  res.json(details);
});

app.get("/staff", (req, res) => {
  let information = staffDetails.map((element) => {
    let studentCount = studentDetails.filter(
      (data) => data.staff_id == element.id
    ).length;
    return {
      id: element.id,
      staff_name: element.staff_name,
      email: element.email,
      student_count: studentCount,
    };
  });
  res.json(information);
});

app.delete("/studentRemove/:id", (req, res) => {
  let studentId = req.params.id;
  let Remove = studentDetails.filter((Remove) => {
    return Remove.id == studentId;
  })[0];
  const index = studentDetails.indexOf(Remove);
  studentDetails.splice(index, 1);
  res.json({ message: `Student ${studentId} deleted...!!!` });
});

app.listen(port, () => {
  console.log("Collection of Students Data");
});
