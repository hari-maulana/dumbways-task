let isOpen = false;

function openHamburger() {
    let burger = document.getElementById("hamburger-nav");
    if (!isOpen) {
        burger.style.display = "block";
        isOpen = true;
    } else {
        burger.style.display = "none";
        isOpen = false;
    }
}