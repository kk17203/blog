function deleteConfirm(index) {
    const deleteBtn = document.getElementById(`deleteBtn${index}`);
    const confirmContainer = document.getElementById(
        `confirmContainer${index}`
    );
    if (confirmContainer.style.display === "none") {
        deleteBtn.style.display = "none";
        confirmContainer.style.display = "block";
    } else {
        confirmContainer.style.display = "none";
        deleteBtn.style.display = "block";
    }
    window.addEventListener("click", function (Event) {
        const isClickInsideContainer = confirmContainer.contains(event.target);
        const isClickInsideDeleteBtn = deleteBtn.contains(event.target);

        if (!isClickInsideContainer && !isClickInsideDeleteBtn) {
            deleteBtn.style.display = "block";
            confirmContainer.style.display = "none";
        }
    });
}

function featuredDeleteConfirm(index) {
    const deleteBtn = document.getElementById(`featuredDeleteBtn${index}`);
    const confirmContainer = document.getElementById(
        `featuredConfirmContainer${index}`
    );
    if (confirmContainer.style.display === "none") {
        deleteBtn.style.display = "none";
        confirmContainer.style.display = "block";
    } else {
        confirmContainer.style.display = "none";
        deleteBtn.style.display = "block";
    }
    window.addEventListener("click", function (Event) {
        const isClickInsideContainer = confirmContainer.contains(event.target);
        const isClickInsideDeleteBtn = deleteBtn.contains(event.target);

        if (!isClickInsideContainer && !isClickInsideDeleteBtn) {
            deleteBtn.style.display = "block";
            confirmContainer.style.display = "none";
        }
    });
}

function openEmailList() {
    const openBtn = document.getElementById("emailNumber");
    const list = document.getElementById("emailList");

    if (list.style.display === "none") {
        list.style.display = "flex";
    } else {
        list.style.display = "none";
    }
    window.addEventListener("click", function (Event) {
        const isClickInsideList = list.contains(event.target);
        const isClickInsideOpenBtn = openBtn.contains(event.target);

        if (!isClickInsideList && !isClickInsideOpenBtn) {
            list.style.display = "none";
        }
    });
}
