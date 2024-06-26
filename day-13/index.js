const express = require('express');

const { Sequelize, QueryTypes } = require("sequelize");
const config = require("./config/config.json");
const sequelize = new Sequelize(config.development);


const path = require("path");
const { log } = require('console');

const app = express();
const port = 3000;

const data = [];

app.set('view engine', 'hbs');


app.set('views', path.join(__dirname, 'src/views'));

app.use("/assets", express.static(path.join(__dirname, 'src/assets')));
app.use(express.urlencoded({ extended: false }));

app.get("/", home);
app.get("/add-project", projectForm);
app.get("/testimonials", testimonials);
app.get("/contact-form", contactMe);
app.get("/project/:id", projectDetail);

app.post("/add-project", addProject);
app.post("/update-project", updateProject);
app.post("/delete-project/:id", deleteProject);
app.get("/update-project/:id", editProject);


// READ
async function home(req, res) {
    const query = `SELECT * FROM "Project"`;

    const object = await sequelize.query(query, { type: QueryTypes.SELECT });


    console.log(object.id);

    res.render("index", { data: object });
}

function projectForm(req, res) {
    res.render("add-project");
}

// CREATE
async function addProject(req, res) {
    const { projectName, inputDescription, startDate, endDate, } = req.body;
    
    const convertedStartDate = new Date(startDate);
    const convertedEndDate = new Date(endDate);
    
    // Duration dalam hari
    const duration = convertedEndDate - convertedStartDate;
    const inDaysDuration = Math.floor(duration / (1000 * 60 * 60 * 24));

    const query = `INSERT INTO "Project"("projectName", "inputDescription", "startDate", "endDate", "inDaysDuration", "createdAt", "updatedAt") VALUES ('${projectName}', '${inputDescription}','${startDate}','${endDate}','${inDaysDuration}', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)`;
    await sequelize.query(query, { type: QueryTypes.INSERT });

    res.redirect("/#projects");
}

function projectDetail(req, res) {
    const projectId = req.params.id;
    const project = data[projectId];

    if (project) {
        res.render("project-detail", { project });
    } else {
        res.status(404).send('Project not found');
    }
}

function editProject(req, res) {
    const { id } = req.params;
    const project = data[parseInt(id)];

    if (project) {
        res.render("edit-project", { project, id });
    } else {
        res.status(404).send('Project not found');
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
        return res.status(400).send('Invalid project ID');
    }

    res.redirect("/#projects");
}

function deleteProject(req, res) {
    const { id } = req.params;
    const index = parseInt(id);

    if (index >= 0 && index < data.length) {
        data.splice(index, 1); // Remove the project from the array
        res.redirect("/#projects"); // Redirect back to the home page
    } else {
        res.status(400).send('Invalid project ID');
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
