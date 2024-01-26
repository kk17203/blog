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

function toggleSubscribe() {
    const subscribeBtn = document.getElementById("subscribeBtn");
    const subscribeForm = document.getElementById("subscribeForm");
    const subscribeInput = document.getElementById("subscribeInput");
    const name = document.getElementById("name");
    if ((subscribeForm.style.display = "none")) {
        subscribeBtn.style.display = "none";
        subscribeForm.style.display = "block";
    } else {
        subscribeForm.style.display = "none";
        subscribeBtn.style.display = "block";
    }

    window.addEventListener("click", function (event) {
        const isClickInsideContainer = subscribeForm.contains(event.target);
        const isClickInsideSubscribeBtn = subscribeBtn.contains(event.target);

        if (!isClickInsideContainer && !isClickInsideSubscribeBtn) {
            subscribeForm.style.display = "none";
            subscribeBtn.style.display = "block";
            subscribeInput.value = "";
            name.value = "";
        }
    });
}
