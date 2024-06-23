const testimonials = new Promise((resolve, reject) => {
  const xhr = new XMLHttpRequest();
  xhr.open("GET", "https://api.npoint.io/98802ceeefed2e50c26d", true)

  xhr.onload = function () {
    if (xhr.status == 200) {
      resolve(JSON.parse(xhr.response));
    } else {
      reject("Error Loaded Data");
    }

  };

  xhr.onerror = function () {
    reject("404 Not Found")
  };

  xhr.send();

});

async function allTesti() {
  try {
    const response = await testimonials;
    // await disini sebagai penanda bahwa butuh waktu tunggu samapi data dari API kita dapatkan.
    // setiap penggunaan async sudah pasti pake await
    // Hasil dari pemanggilan jika tidak menggunakan await maka akan diberikan output undifinded
    // Jika pake await akan tampil datanya
    let testimonialHtml = ``;

    response.forEach((item) => {
      testimonialHtml += `<div class="card col-md-3 m-3 p-2 d-flex flex-column">
        <img src="${item.image}" alt="picture" class="mb-3">
        <i class="mb-3">${item.content}</i>
        <h5 class="mb-3 align-self-end">- ${item.author}</h5>
        <p class="mb-3 align-self-end">${item.rating} <i class="fa-solid fa-star" style="color: #FFD43B;"></i></p>
      </div>`;
    });
    //console.log(testimonialHtml);
    document.getElementById("testimonials").innerHTML = testimonialHtml;
  } catch (error) {
    console.log(error);
  }
};

allTesti();

async function testimonialFilter(ratingHTML) {
  try {
    const response = await testimonials;
    let testimonialHTML = ``;

  const testimonialFilter = response.filter(
    (testimonialsItem) => {
      return testimonialsItem.rating === ratingHTML;
    }
  );

  if (testimonialFilter.length === 0) {
    testimonialHTML = `<h1>Data Not Found</h1>`;
  } else {
    testimonialFilter.forEach((filteredItem) => {
      testimonialHTML += `<div class="card col-md-3 m-3 p-2 d-flex flex-column">
        <img src="${filteredItem.image}" alt="picture" class="mb-3">
        <i class="mb-3">${filteredItem.content}</i>
        <h5 class="mb-3 align-self-end">- ${filteredItem.author}</h5>
        <p class="mb-3 align-self-end">${filteredItem.rating} <i class="fa-solid fa-star" style="color: #FFD43B;"></i></p>
      </div>`;
    });
  }

  document.getElementById("testimonials").innerHTML = testimonialHTML;

  } catch (error) {
    console.log(error)
  };
};