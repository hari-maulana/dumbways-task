function duration() {
    const startDate = new Date(document.getElementById("start-date").value);
    const endDate = new Date(document.getElementById("end-date").value);

    // console.log(inputName);
    const differenceInMilliseconds = endDate - startDate;
    const inDays = Math.floor(differenceInMilliseconds / (1000 * 60 * 60 * 24));
    const inWeeks = Math.floor(differenceInMilliseconds / (1000 * 60 * 60 * 24 * 7));
    const inMonths = Math.floor(differenceInMilliseconds / (1000 * 60 * 60 * 24 * 7 * 4));
    
    if (30 >= inDays > 7) {
        return `${inWeeks} week(s)`;
    } else if (inWeeks > 4) {
        return `${inMonths} month(s)`;
    } else {
        return `${inDays} day(s)`;
    }
}


let dataProject = [];

function submitProject(event) {
    event.preventDefault();

    let inputName = document.getElementById("input-project").value;
    let inputDescription = document.getElementById("input-description").value;
    let inputImage = document.getElementById("input-image").files;

    // console.log(inputName);
    //console.log(endDate);
    // console.log(startDate);

    if (inputName === "") {
        alert("Nama project harus diisi!")
    } else if (inputDescription === "") {
        alert("Deskripsi harus diisi!")
    } else if (inputImage === "") {
        alert("File harus diisi!")
    };

    const project = {
        name: inputName,
        description: inputDescription,
        image: URL.createObjectURL(inputImage[0]),
        duration: duration(),
    };

    //console.log(project);
    dataProject.push(project);

    console.log(dataProject[0].duration);
    renderProject()
}



function renderProject() {
    document.getElementById("project-submitted") .innerHTML +=
        `<div id="project" class="project">
        <img src="${dataProject[0].image}" alt="image upload" />
        <div class="project-title">
          <h2>${dataProject[0].name}</h2>
          <p>Duration: ${dataProject[0].duration}</p>
        </div>
        <p>${dataProject[0].description}</p>
        <div class="tech-list">
          <i class="fa-brands fa-node-js" style="color: rgb(0, 0, 100);"></i>
          <i class="fa-brands fa-js" style="color: rgb(0, 0, 100);"></i>
          <i class="fa-brands fa-react"  style="color: rgb(0, 0, 100);"></i>
        </div>
        <div class="edit-del-button">
          <button>Edit</button>
          <button>Delete</button>
        </div>
      </div>`;
}