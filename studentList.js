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