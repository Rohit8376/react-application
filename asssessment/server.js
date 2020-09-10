const express = require("express");
const mysql = require("mysql");
var fileupload = require("express-fileupload");
var axios = require("axios");

require("dotenv").config();

const port = process.env.PORT || 5000;
const app = express();
const cors = require("cors");
app.use(express.json());
app.use(cors());
app.use(fileupload());

var mysqlConnection = mysql.createConnection({
  host: "sql12.freemysqlhosting.net",
  user: "sql12364730",
  password: "lyUT7BxLKd",
  database: "sql12364730",
});

mysqlConnection.connect((err) => {
  if (!err) console.log("database connection sunnccessfull");
  else console.log("something may be wrong ");
});

app.post("/uploadfile", function (req, res) {
  console.log(req.body);
});

app.post("/upload", function (req, res) {
  if (req.files) {
    console.log(req.files);
    var file = req.files.file;
    var filename = file.name;

    file.mv("./client/public/files/" + filename, function (err) {
      if (err) {
        // res.send(err)
        console.log("file not uploaded" + err);
      } else {
        console.log("file uploaded");
      }
    });
  }
});

app.get("/details", (req, res) => {
  mysqlConnection.query("Select * from submissions", (err, rows, fields) => {
    if (!err) res.send(rows);
    else console.log(err);
  });
});

app.delete("/details/:id", (req, res) => {
  mysqlConnection.query(
    "DELETE FROM submissions WHERE id=?",
    [req.params.id],
    (err, rows, fields) => {
      if (!err) res.send("deleted successfully");
      else console.log("console.error();");
    }
  );
});

app.post("/details", function (req, res, next) {
  const userDetails = req.body;
  var sql = "INSERT INTO submissions SET ?";
  mysqlConnection.query(sql, userDetails, function (err, data) {
    if (err) throw err;
    console.log("User dat is inserted successfully ");
  });
});

//   if(process.env.NODE_ENV ==="production"){
//       app.use(app.use(express.static("client/build")))
//   }

app.listen(4000, () => {
  console.log("server is running on port ");
});
