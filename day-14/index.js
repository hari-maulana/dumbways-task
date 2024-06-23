const express = require('express');
const { Sequelize, QueryTypes } = require("sequelize");
const config = require("./config/config.json");
const sequelize = new Sequelize(config.development);
const path = require("path");

const app = express();
const port = 3000;

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
    res.render("index", { data: object });
}

function projectForm(req, res) {
    res.render("add-project");
}

// CREATE
async function addProject(req, res) {
    const { projectName, inputDescription, startDate, endDate } = req.body;
    
    const convertedStartDate = new Date(startDate);
    const convertedEndDate = new Date(endDate);
    
    const duration = convertedEndDate - convertedStartDate;
    const inDaysDuration = Math.floor(duration / (1000 * 60 * 60 * 24));

    const query = `INSERT INTO "Project"("projectName", "inputDescription", "startDate", "endDate", "inDaysDuration", "createdAt", "updatedAt") VALUES ('${projectName}', '${inputDescription}','${startDate}','${endDate}','${inDaysDuration}', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)`;
    await sequelize.query(query, { type: QueryTypes.INSERT });

    res.redirect("/#projects");
}

async function projectDetail(req, res) {
    const projectId = req.params.id;
    
    const query = `SELECT * FROM "Project" WHERE "id" = ${projectId}`;
    const project = await sequelize.query(query, { type: QueryTypes.SELECT });

    if (project.length > 0) {
        res.render("project-detail", { project: project[0] });
    } else {
        res.status(404).send('Project not found');
    }
}

async function editProject(req, res) {
    const { id } = req.params;
    
    const query = `SELECT * FROM "Project" WHERE "id" = ${id}`;
    const project = await sequelize.query(query, { type: QueryTypes.SELECT });

    if (project.length > 0) {
        res.render("edit-project", { project: project[0], id });
    } else {
        res.status(404).send('Project not found');
    }
}

// UPDATE
async function updateProject(req, res) {
    const { projectName, inputDescription, startDate, endDate, id } = req.body;
    
    const convertedStartDate = new Date(startDate);
    const convertedEndDate = new Date(endDate);
    
    const duration = convertedEndDate - convertedStartDate;
    const inDaysDuration = Math.floor(duration / (1000 * 60 * 60 * 24));

    const query = `UPDATE "Project" SET "projectName" = '${projectName}', "inputDescription" = '${inputDescription}', "startDate" = '${startDate}', "endDate" = '${endDate}', "inDaysDuration" = '${inDaysDuration}', "updatedAt" = CURRENT_TIMESTAMP WHERE "id" = ${id}`;
    await sequelize.query(query, { type: QueryTypes.UPDATE });

    res.redirect("/#projects");
}

// DELETE
async function deleteProject(req, res) {
    const { id } = req.params;

    const query = `DELETE FROM "Project" WHERE "id" = ${id}`;
    await sequelize.query(query, { type: QueryTypes.DELETE });

    res.redirect("/#projects");
}

function testimonials(req, res) {
    res.render("testimonials");
}

function contactMe(req, res) {
    res.render("contact-form");
}

app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
});