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

function toggleShareMenu() {
    const body = document.body;
    const shareMenu = document.getElementById("shareMenu");
    const overlay = document.getElementById("shareOverlay");

    body.classList.toggle("share-menu-open");
    if (body.classList.contains("share-menu-open")) {
        overlay.style.display = "block";
    } else {
        overlay.style.display = "none";
    }

    if (shareMenu.style.right === "0px") {
        shareMenu.style.right = "-200px";
    } else {
        shareMenu.style.right = "0px";
    }
}
