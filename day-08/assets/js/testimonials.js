const testimonialsData = [
  {
    image:
      "https://media.istockphoto.com/id/1148380353/photo/portrait-of-a-successful-malay-muslim-man.jpg?s=612x612&w=0&k=20&c=78PrEoXXZcpRQf8qDF0L_bfDj804gzosIz2C_c9xflM=",
    content: "Good services, I recommend him!",
    author: "Walter White",
    rating: 4,
  },
  {
    image:
      "https://media.istockphoto.com/id/1288538088/photo/portrait-young-confident-smart-asian-businessman-look-at-camera-and-smile.jpg?s=612x612&w=0&k=20&c=qkOwVHZFC-fbtbTnufVGaXFhnQBcfEjzbu5ThSXVLR0=",
    content: "He is the best.",
    author: "Papa Zola",
    rating: 5,
  },
  {
    image:
      "https://www.shutterstock.com/image-photo/portrait-sexy-smiling-male-model-600nw-439389172.jpg",
    content: "He is okay, not bad.",
    author: "John Watson",
    rating: 3,
  },
  {
    image:
      "https://images.unsplash.com/photo-1530268729831-4b0b9e170218?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fGluZGlhbiUyMG1lbnxlbnwwfHwwfHx8MA%3D%3D",
    content: "Not really bad, a little disappointed.",
    author: "William Johannesburg",
    rating: 3,
  },
  {
    image:
      "https://images.unsplash.com/photo-1562159278-1253a58da141?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGRpc3NhcG9pbnRlZCUyMG1hbnxlbnwwfHwwfHx8MA%3D%3D",
    content: "Not good at all, fix your service!",
    author: "Leo Tolostoy",
    rating: 1,
  },
];

//Menerima data forEach dari bawah
function html(item) {
  return `<div class="testimonial">
        <img src="${item.image}" alt="picture">
        <i>${item.content}</i>
        <h4>- ${item.author}</h4>
        <p>${item.rating} <i class="fa-solid fa-star" style="color: #FFD43B;"></i></p>
      </div>`;
}

function allTesti() {
  let testimonialHTML = ``;
  testimonialsData.forEach((testimonialsDataObject) => {
    testimonialHTML += html(testimonialsDataObject); //memasukan objek testimonialData ke fungsi html, lalu fungsi ditambahkan ke testimonialHTML.
  });
  document.getElementById("testimonials").innerHTML = testimonialHTML;
}

//Secara default akan menampilkan semua testimonial
allTesti();

function testimonialFilter(ratingHTML) {
  let testimonialHTML = ``;

  const testimonialFilter = testimonialsData.filter(
    (testimonialsDataObject) => {
      return testimonialsDataObject.rating === ratingHTML;
    }
  );

  if (testimonialFilter.length === 0) {
    testimonialHTML = `<h1>Data Not Found</h1>`;
  } else {
    testimonialFilter.forEach((filteredTestimonialsDataObject) => {
      testimonialHTML += html(filteredTestimonialsDataObject);
    });
  }

  document.getElementById("testimonials").innerHTML = testimonialHTML;

  console.log(testimonialFilter);
}
