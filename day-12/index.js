const express = require('express');
const path = require("path");

const app = express();
const port = 3000;

// Data yang di submit akan disimpan disini dalam betuk array
const data = [];

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'src/views'));

app.use("/assets", express.static(path.join(__dirname, 'src/assets')));
app.use(express.urlencoded({ extended: false }));

//Routing
app.get("/", home);
app.get("/add-project", projectForm);
app.post("/add-project", addProject);
app.post("/update-project", updateProject);
app.post("/delete-project/:id", deleteProject);
app.get("/update-project/:id", editProject);
app.get("/testimonials", testimonials);
app.get("/contact-form", contactMe);
app.get("/project/:id", projectDetail);

function home(req, res) {
    res.render("index", { data });
}

function projectForm(req, res) {
    res.render("add-project");
}

function addProject(req, res) {
    const { projectName, startDate, inputDescription } = req.body;
    const dataProject = { projectName, inputDescription };
    data.unshift(dataProject);
    res.redirect("/#projects");
}

function projectDetail(req, res) {
    const projectId = req.params.id;
    const project = data[projectId];

    if (project) {
        res.render("project-detail", { project });
    } else {
        res.status(404).send('Error');
    }
}

function editProject(req, res) {
    const { id } = req.params;
    const project = data[parseInt(id)];

    if (project) {
        res.render("edit-project", { project, id });
    } else {
        res.status(404).send('Errror');
    }
}

function updateProject(req, res) {
    const { projectName, inputDescription, id } = req.body;

    if (id >= 0 && id < data.length) {
        data[parseInt(id)] = {
            projectName,
            inputDescription,
        };
    } else {
        return res.status(400).send('Error');
    }

    res.redirect("/#projects");
}

function deleteProject(req, res) {
    const { id } = req.params;
    const index = parseInt(id);

    if (index >= 0 && index < data.length) {
        data.splice(index, 1);
        res.redirect("/#projects");
    } else {
        res.status(400).send('Error');
    }
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
