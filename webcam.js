// const videoElement = document.getElementById('videoElement');
// const canvasElement = document.getElementById('canvasElement');
// const photoElement = document.getElementById('photoElement');
// const startButton = document.getElementById('startButton');
// const captureButton = document.getElementById('captureButton');

// let stream;

// async function startWebcam() {
//     try {
//         stream = await navigator.mediaDevices.getUserMedia({ video: true });
//         videoElement.srcObject = stream;
//         startButton.disabled = true;
//         captureButton.disabled = false;
//     } catch (error) {
//         console.error('Error accessing webcam:', error);
//     }
// }

// startButton.addEventListener('click', startWebcam);