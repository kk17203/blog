function toggleContent(index) {
    const button = document.getElementById(`seeMoreButton${index}`);
    const previewContent = document.getElementById(
        `blogPreviewContent${index}`
    );
    const fullContent = document.getElementById(`blogFullContent${index}`);

    const blogContainer = document.getElementById(`blogContainer${index}`);

    console.log(fullContent);
    console.log("test");

    if (fullContent.style.display === "none") {
        previewContent.style.display = "none";
        fullContent.style.display = "block";
        button.innerText = "See Less";
    } else {
        previewContent.style.display = "block";
        fullContent.style.display = "none";
        button.innerText = "See More";
    }

    window.addEventListener("click", function (Event) {
        const isClickInsideContainer = blogContainer.contains(event.target);

        if (!isClickInsideContainer) {
            previewContent.style.display = "block";
            fullContent.style.display = "none";
            button.innerText = "See More";
        }
    });
}

function toggleFeaturedContent(index) {
    const button = document.getElementById(`featuredSeeMoreButton${index}`);
    const previewContent = document.getElementById(
        `featuredBlogPreviewContent${index}`
    );
    const fullContent = document.getElementById(
        `featuredBlogFullContent${index}`
    );

    const blogContainer = document.getElementById(
        `featuredBlogContainer${index}`
    );

    console.log(fullContent);
    console.log("test");

    if (fullContent.style.display === "none") {
        previewContent.style.display = "none";
        fullContent.style.display = "block";
        button.innerText = "See Less";
    } else {
        previewContent.style.display = "block";
        fullContent.style.display = "none";
        button.innerText = "See More";
    }

    window.addEventListener("click", function (Event) {
        const isClickInsideContainer = blogContainer.contains(event.target);

        if (!isClickInsideContainer) {
            previewContent.style.display = "block";
            fullContent.style.display = "none";
            button.innerText = "See More";
        }
    });
}
