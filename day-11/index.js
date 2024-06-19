const express = require('express');
const path = require("path")

const app = express()
// port yang digunakan server kita
const port = 3000;

// set hbs sebagai view engine
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'src/views'))

app.use("/assets", express.static(path.join(__dirname, 'src/assets')))

// middleware, yang berfungsi sebagai alat memproses inputan dari form (Request)
app.use(express.urlencoded({ extended: false }));

// ROUTING
app.get("/", home)
app.get("/add-project", projectForm)
app.post("/add-project", addProject)
app.get("/testimonials", testimonials)
app.get("/contact-form", contactMe)

// contoh diatas my-project misalkan, maka localhost/my-project akan tampil di bar alamat


function home(req, res) {
    res.render("index");
}
// contoh index diatas tidak perlu ada ekstensi misalnya index.hbs
function projectForm(req, res) {
    res.render("add-project");
}


function addProject(req, res) {
    const { projectName, startDate, inputDescription } = req.body;
  
    // TUGAS DAY 11
    console.log("Project Name :", projectName);
    console.log("Start Date :", startDate);
    console.log("Description :", inputDescription);
  }
  






function testimonials(req, res) {
    res.render("testimonials");
}
function contactMe(req, res) {
    res.render("contact-form");
}

app.listen(port, () => {
    console.log(`server berjalan pada port: ${port}`);
});