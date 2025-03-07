

 /**
         * method to load the local csv file
         * proceed to processCSV method to draw charts
         **/
 async function loadCSV() {
    const response = await fetch('projects_spread.csv'); 
    const data = await response.text();

    const rows = data.split("\n");
    const container = document.getElementById('test-grid');

    rows.forEach(row => {
        const cols = row.split(",");
        if (cols.length < 7) return; // Skip incomplete rows

        const title = cols[0].trim();
        const media = cols[1].trim();
        const image = cols[6].trim();
        console.log(image);

        const projectDiv = document.createElement("div");
        projectDiv.classList.add("project");
        projectDiv.innerHTML = `
            <div>
                <h3>${title}</h3>
                <p>${media}</p>
                <img src="${image}" alt="${title}">
            </div>
        `;

        container.appendChild(projectDiv);
    });
}
loadCSV();
