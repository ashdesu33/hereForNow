function toggleList() {
  var list = document.getElementById("student-names");
  var title = document.querySelector(".mobile-student-list-title");

  list.classList.toggle("show");

  if (list.classList.contains("show")) {
    title.textContent = "Exhibitor List ↓";  // Expanded state
} else {
    title.textContent = "Exhibitor List <";  // Collapsed state
}
}

document.addEventListener("DOMContentLoaded", function () {
  const studentListContainer = document.getElementById("student-names");

  names.forEach(student => {
      const studentItem = document.createElement("div");
      studentItem.textContent = student.name;
      studentItem.classList.add("student-item");

      // Check if the student has a website
      if (student.website) {
          studentItem.classList.add("clickable");
          studentItem.addEventListener("click", () => {
              window.open(student.website, "_blank"); // Open in new tab
          });
      }

      studentListContainer.appendChild(studentItem);
  });
});