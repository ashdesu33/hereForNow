

 /**
         * method to load the local csv file
         * proceed to processCSV method to draw charts
         **/

 async function loadCSV() {
    const response = await fetch('projects_sheet.tsv'); 
    const data = await response.text();

    const rows = data.split("\n");
    const container = document.getElementById('test-grid');
    let count = 0;
    rows.forEach(row => {
        count++;
        const cols = row.split("\t");
        if (cols.length < 7) return; // Skip incomplete rows

        const title = cols[0].trim();
        const media = cols[1].trim();
        const filePath = cols[6].trim();
        console.log(filePath);
        
        if (filePath.match(/\.(jpeg|jpg|png|gif|webp)$/i)) {
            mediaElement = `<img src="${filePath}" alt="${title}" 
                            style="max-width: 100%; height: auto;">`;
        } 
        else if (filePath.match(/\.(mp4|webm|ogg|mov)$/i)) {
            mediaElement = `
                <video controls style="max-width: 100%; height: auto;">
                    <source src="${filePath}" type="video/${filePath.split('.').pop()}">
                    Your browser does not support the video tag.
                </video>`;
        } 
        else if (filePath.match(/\.(pdf)$/i)) {
            mediaElement = `
                <embed src="${filePath}" type="application/pdf" width="100%" height="400px">
                `;
        } 
        else {
            mediaElement = `<p>Unsupported file format</p>`;
        }

        const projectDiv = document.createElement("div");
        projectDiv.classList.add("project");
        projectDiv.innerHTML = `
           
                <div class="project-info">
                    <p class="index">${count}</p>
                    <hr>
                    <h3>${title}</h3>
                    <p>${media}</p>
                </div>
                ${mediaElement}
            
        `;

        container.appendChild(projectDiv);
    });
    }
loadCSV();
