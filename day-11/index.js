const express = require('express');
const path = require("path")

const app = express()
const port = 3000;

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'src/views'))

app.use("/assets", express.static(path.join(__dirname, 'src/assets')))


app.get("/", home)
app.get("/my-project", myProject)
app.get("/testimonials", testimonials)
app.get("/contact-form", contactMe)

// contoh diatas my-project misalkan, maka localhost/my-project akan tampil di bar alamat


function home(req, res) {
    res.render("index");
}
// contoh index diatas tidak perlu ada ekstensi misalnya index.hbs
function myProject(req, res) {
    res.render("my-project");
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