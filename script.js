let secondHand = document.querySelector('.second-hand');

window.addEventListener('scroll', function() {
    // Get the scroll position
    let scrollPosition = window.scrollY;

    // Calculate the rotation of the second hand based on scroll position
    let rotation = (scrollPosition % 360); // Make sure the rotation stays within 360 degrees
    console.log(window.scrollY)

    // Apply the rotation to the second hand
    secondHand.style.transform = `rotate(${rotation}deg)`;
});