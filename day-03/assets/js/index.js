function submitter() {
    
    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let phone = document.getElementById("phone").value;
    let subject = document.getElementById("subject").value;
    let message = document.getElementById("message").value;


    if (name == "") {
        return alert("Please enter your name!")
    } else if (email == "") {
        return alert("Please enter your email address!")
    } else if (phone == "") {
        return alert("Please enter your phone number!")
    } else if (subject == "") {
        return alert("Please enter your subject!")
    } else if (message == "") {
        return alert("Please enter your message!")
    }

    const yourEmail = "harimaulana.xyz@gmail.com"

    let a = document.createElement("a");
    a.href = `https://mail.google.com/mail?view=cm&fs=1&to=${yourEmail}&su=${subject}&body=${message}`
    a.click();
}
