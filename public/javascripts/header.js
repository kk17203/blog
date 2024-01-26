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
    const email = document.getElementById("email");
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
            email.value = "";
            name.value = "";
        }
    });
}

// // SUBMIT WHEN ENTER PRESSED SUBSCRIBE FORM
function handleKeyPress(event) {
    // Check if the key pressed is Enter (key code 13)
    if (event.keyCode === 13) {
        // Submit the form
        event.preventDefault();
        submitForm(event);
    }
}

function submitForm(event) {
    event.preventDefault(); // Prevents the default form submission

    const form = document.getElementById("subscribeForm");
    const formData = new FormData(form);

    console.log("Form Data");
    console.log(formData);

    fetch("/contact/subscribe", {
        method: "POST",
        body: formData,
    })
        .then((response) => {
            // If response is not ok throw error
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            // If response is ok parse data as JSON
            return response.json();
        })
        .then((data) => {
            // Handle the response data
            console.log(data);
            const name = document.getElementById("name");
            const email = document.getElementById("email");

            if (data.message === "Thank you for subscribing!") {
                // Display the "Thank You" message
                const subscribeForm = document.getElementById("subscribeForm");
                const subscribeBtn = document.getElementById("subscribeBtn");

                subscribeForm.style.display = "none";
                subscribeBtn.style.display = "block";
                subscribeBtn.innerText = "Thank You!";
            } else if (data.message === "Email already subscribed.") {
                // Email already exists
                email.value = null;
                email.placeholder = "Email Already Subscribed";
                email.style.backgroundColor = "rgba(255, 0, 0, 0.151)";
            } else if (data.message === "no name") {
                // No name
                email.placeholder = "Email";
                name.placeholder = "Please Enter Name";
                name.style.backgroundColor = "rgba(255, 0, 0, 0.151)";
                email.style.backgroundColor = null;
            } else if (data.message === "no email") {
                //No email or invalid email
                name.placeholder = "Name";
                email.value = null;
                name.style.backgroundColor = null;
                email.placeholder = "Please Enter Valid Email";
                email.style.backgroundColor = "rgba(255, 0, 0, 0.151)";
            }
        })
        .catch((error) => {
            // Handle errors
            console.error("Error:", error);

            //Display error message
        });
}
