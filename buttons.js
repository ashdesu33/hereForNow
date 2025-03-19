window.addEventListener("scroll", function () {
  let scrollValue = window.scrollY;
  let rotation = scrollValue * 0.05; // Negative value reverses direction
  document.getElementById("sticky-button").style.transform = `rotate(${rotation}deg)`;
});

document.addEventListener("DOMContentLoaded", function () {
  const clockButton = document.getElementById("sticky-button");
  const creditButton = document.getElementById("credit-button");
  const clockSection = document.querySelector(".clock");

  // Create an Intersection Observer
  const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
          if (entry.isIntersecting) {
              clockButton.style.opacity = "0"; // Hide button
              creditButton.style.opacity = "0"; // Hide button
          } else {
              clockButton.style.opacity = "1"; // Show button
              creditButton.style.opacity = "1"; // Show button
          }
      });
  }, { threshold: 0.5 }); // Trigger when 50% of .clock is visible

  observer.observe(clockSection); 
});

document.getElementById("sticky-button").addEventListener("click", function () {
  window.scrollTo({
      top: 0,
      behavior: "smooth" 
  });
});

document.getElementById("credit-button").addEventListener("click", function () {
  document.querySelector(".credit-section").scrollIntoView({
      behavior: "smooth" // Enables smooth scrolling
  });
});