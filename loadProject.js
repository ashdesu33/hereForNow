
const startCam = () => {
    const video = document.getElementById('video');
    if (navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia({ video: true })
            .then(stream => {
                video.srcObject = stream;
            })
            .catch(error => {
                console.error("Something went wrong!", error);
            });
    } else {
        console.log("getUserMedia not supported on your browser!");
    }
};

$(document).ready(() => {
    startCam();
});
 /**
         * method to load the local csv file
         * proceed to processCSV method to draw charts
         **/
 $(document).ready(function () {
    let projectsData = []; // Stores project rows from TSV
    let loadedCount = 0; // Number of loaded projects per scroll
    const loadBatch = 8; // Number of projects to load per batch
    const $container = $("#test-grid");
    /**
     * Function to load the local CSV file using jQuery
     * Processes and appends projects dynamically


/**
 * Fetch and store TSV data
 */
function fetchTSV() {
    $.get('projects_sheet.tsv', function (data) {
        projectsData = data.split("\n").map(row => row.split("\t"));
        loadMoreProjects(); // Load initial batch
    });
}

/**
 * Load projects in batches on scroll
 */
function loadMoreProjects() {
    for (let i = 0; i < loadBatch && loadedCount < projectsData.length; i++, loadedCount++) {
        const cols = projectsData[loadedCount];
        if (cols.length < 7) continue; // Skip incomplete rows

        const title = cols[0].trim();
        const media = cols[1].trim();
        const author = cols[3].trim();
        const filePath = cols[6].trim();

        let mediaElement = "";
        if (filePath.match(/\.(jpeg|jpg|png|gif|webp)$/i)) {
            mediaElement = `<img src="${filePath}" alt="${title}" class="lazy-media" style="max-width: 100%; height: auto; opacity: 0;">`;
        } else if (filePath.match(/\.(mp4|webm|ogg|mov)$/i)) {
            mediaElement = `
                <video controls class="lazy-media" style="max-width: 100%; height: auto; opacity: 0;">
                    <source src="${filePath}" type="video/${filePath.split('.').pop()}">
                    Your browser does not support the video tag.
                </video>`;
        } else if (filePath.match(/\.(pdf)$/i)) {
            mediaElement = `<embed src="${filePath}" type="application/pdf" width="100%" height="400px" class="lazy-media" style="opacity: 0;">`;
        } else {
            mediaElement = `<p>Unsupported file format</p>`;
        }

        const $projectDiv = $(`
            <div class="project hidden" style="opacity: 0; transform: translateY(20px);">
                <div class="project-info">
                    <p class="index">${loadedCount + 1}</p>
                    <hr>
                    <h3 class="project-title">${title}</h3>
                    <p class="project-author">${author}</p>
                    <p class="project-media">${media}</p>
                </div>
                <div class="project-image">
                    ${mediaElement}
                </div>
            </div>
        `);

        $container.append($projectDiv);
    }
    observeProjects(); // Start observing loaded projects
}

/**
 * Observe projects and fade them in when they enter the viewport
 */
function observeProjects() {
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                $(entry.target).css({
                    transform: "translateY(0)",
                    transition: "opacity 0.8s ease-out, transform 0.8s ease-out",
                    opacity:1
                });

                $(entry.target).find(".lazy-media").each(function () {
                    $(this).on("load", function () {
                        $(this).fadeTo(600, 1); // Fade media in smoothly
                    }).attr("src", $(this).attr("src")); // Trigger image load
                });
                observer.unobserve(entry.target); // Stop observing once it's loaded
            }
        });
    }, { threshold: 0.1 }); // Trigger when 30% of the element is visible

    $(".project.hidden").each(function () {
        observer.observe(this);
        $(this).removeClass("hidden");
    });
}

/**
 * Load more projects when reaching the bottom
 */
$(window).on("scroll", function () {
    if ($(window).scrollTop() + $(window).height() >= $(document).height()*0.5) {
        loadMoreProjects(); // Load more projects when near bottom
    }
});

// Start fetching and loading projects
fetchTSV();
});

var options = {
    animate: true,
    patternWidth: 100,
    patternHeight: 100,
    grainOpacity: 0.3,
    grainDensity: 5,
    grainWidth: 1,
    grainHeight: 1
};
grained('#grained', options);