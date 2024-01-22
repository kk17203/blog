function toggleMenu() {
    const body = document.body;
    const sideMenu = document.getElementById("sideMenu");
    const overlay = document.getElementById("overlay");

    body.classList.toggle("menu-open");
    if (body.classList.contains("menu-open")) {
        overlay.style.display = "block";
    } else {
        overlay.style.display = "none";
    }

    if (sideMenu.style.left === "0px") {
        sideMenu.style.left = "-200px";
    } else {
        sideMenu.style.left = "0px";
    }
}
