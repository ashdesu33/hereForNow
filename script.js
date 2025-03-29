let width = window.innerWidth;
let height = window.innerHeight;

let mobile = (width < 800)

// names of everyone in the show
const names = [
   { name: "Andrew Liu", website: "https://andrewliu.site/" },
   { name: "Anh Nguyen", website: "https://jillymun.art/" },
   { name: "Aniyah Lee", website: "https://aniyahjleedesign.com" },
   { name: "Anja Drakulovic", website: "https://www.instagram.com/adrakulo" },
   { name: "Ash Ma", website: "https://ashdesu.info/" },
   { name: "Ashley Cai", website: "https://ashleycai.com/" },
   { name: "Avery Browne", website: "https://www.averybrowne.com/" },
   { name: "Brianna Cheng", website: "briannacheng.com" },
   { name: "Chanya Vitayakul", website: "https://chanyavita.com/" },
   { name: "Dani Guerra", website: "danielaguerra.com" },
   { name: "Hannah Jeong", website: "https://hannahjeong.com/" },
   { name: "Hyun Jun Yoo", website: "" },
   { name: "Isabel Lee", website: "http://isabellee.co" },
   { name: "Jeanie Yu", website: "https://jeanieyu.com/" },
   { name: "Jolin Chen", website: "https://jolinchenyz.com/" },
   { name: "Jyot Thind", website: "https://jyotkaurportfolio.cargo.site/" },
   { name: "Leon Calzone", website: "" },
   { name: "Li Huang", website: "https://lihuang.space/" },
   { name: "Li June Choi", website: "https://lijune.cargo.site/" },
   { name: "Macaque Jagusah", website: "https://www.instagram.com/mix.macaque/" },
   { name: "Mandy Liu", website: "" },
   { name: "Manna Patiparnprechavut", website: "" },
   { name: "Miko Sellier", website: "https://mikospla.net" },
   { name: "Minah Kim", website: "https://minaherinkim.com/" },
   { name: "Radhika Chauhan", website: "https://radhikachauhan.com/" },
   { name: "Ritvi Gilara", website: "" },
   { name: "Ryan Yan", website: "https://ryanyan.ca/" },
   { name: "Sara Hu", website: "" },
   { name: "Scarlett Wang", website: "" },
   { name: "Sejal Gupta", website: "https://sejalgupta.com/" },
   { name: "Siyuan Wang", website: "https://www.instagram.com/berrr.inwork/" },
   { name: "Sophie Feng", website: "https://sophie-feng.com/" },
   { name: "Un Jingjang", website: "https://unjingjang.com/" },
   { name: "Yeriel Jeong", website: "http://yeriel.co" },
   { name: "Zeyu Shen", website: "" },
];

let nameAngle = []

const clock = document.querySelector('.clock');

//get clock style so we can get the margin left, which we can use to position the names
var clockStyle = window.getComputedStyle(clock);
let marginLeft = parseFloat(clockStyle.marginLeft);
const clockFace = document.querySelector('.clock-face');

let clockHeight = parseFloat(clockStyle.height);
//set clock style for margin top, so we can use that to position the names
let marginTop = (height - clockHeight)/2;
clock.style.top = marginTop+"px"


function addClockNumbers() {
    let clockWidth = parseFloat(clockStyle.width);
    let clockHeight = parseFloat(clockStyle.height);

    let xRadius = clockWidth/2; // The radius where the numbers will be placed (inside the clock)
    let yRadius = clockHeight/2;
    const numberCount = names.length; // Total names

    if (mobile) {
        xRadius = xRadius - 20;
    }

    // Loop through and create names
    for (let i = 0; i <= numberCount; i++) {
        const number = document.createElement('div');
        number.classList.add('name');
        number.classList.add('hide');

        // Calculate the angle in radians for this number
        const angle = (i / numberCount) * 2 * Math.PI;
        // convert to degrees, put in a list to use to calculate which names have high opacity
        nameAngle[i] = angle * (180 / Math.PI);
        
        // Position the number around the circle using trigonometry
        const x = (width/2 - marginLeft) + xRadius * Math.sin(angle);  // X position
        const y = (height/2 - marginTop)  - yRadius * Math.cos(angle);  // Y position (subtract to flip the y-axis)

        number.style.left = `${x}px`;
        number.style.top = `${y}px`;
        if (names[i]) {
            // Create a new anchor tag for each name
            const link = document.createElement('a');
            if (names[i].website) {
                link.href = names[i].website;  // Set the URL for the link (you can adjust how the URL is determined)
                number.classList.add("name")
                link.target = "_blank";  // This ensures the link opens in a new tab
            }
            link.textContent = names[i].name;  // Set the text content to the name
            // Append the link to the number div
            number.appendChild(link);
        }    
        clockFace.appendChild(number);
    }
}

addClockNumbers();
let nameElements = Array.from(clockFace.children).slice(3)

function findClosestValue(A, arr) {
    let closestIndex = -1;
    let closestDifference = Infinity;

    // Loop through the array
    for (let i = 0; i < arr.length; i++) {
        const difference = Math.abs(arr[i] - A);

        // Update if the current difference is smaller than the previously found one
        if (difference < closestDifference) {
            closestDifference = difference;
            closestIndex = i;
        }
    }
    return closestIndex;
}

let secondHand = document.querySelector('.second-hand');
let hourHand = document.querySelector('.hour-hand');
let minuteHand = document.querySelector('.minute-hand'); 

let timer = null; 

const d = new Date();
let hourRotation = ((d.getHours() % 12) * 30) + (d.getMinutes() * 0.5); // Hour + minute movement
let minuteRotation = (d.getMinutes() * 6) + (d.getSeconds() * 0.1); // Minute movement includes seconds
hourHand.style.transform = `rotate(${hourRotation}deg)`;
minuteHand.style.transform = `rotate(${minuteRotation}deg)`;


let baseSecondRotation = 0;
let baseMinuteRotation = 0;
let additionalRotation = 0;
let lastScrollTime = Date.now();

// Function to update the second hand and highlight names
function updateSecondHand() {
    const now = new Date();
    baseSecondRotation = now.getSeconds() * 6 + now.getMilliseconds() * 0.006; // Smooth motion
    applyRotation();
}

function updateMinuteHand() {
    const now = new Date();
    baseMinuteRotation = now.getMinutes() * 6 + now.getSeconds() * 0.1; // Smooth minute movement
    let baseHourRotation = (now.getHours() % 12) * 30 + now.getMinutes() * 0.5; // Smooth hour movement

    minuteHand.style.transform = `rotate(${baseMinuteRotation}deg)`;
    hourHand.style.transform = `rotate(${baseHourRotation}deg)`;
}

// Function to normalize the rotation angle and apply highlighting
function applyRotation() {
    let totalRotation = (baseSecondRotation + additionalRotation) % 360;
    if (totalRotation < 0) totalRotation += 360; // Ensure positive rotation

    secondHand.style.transform = `rotate(${totalRotation}deg)`;

    let closestIndex = findClosestValue(totalRotation, nameAngle);
    highlightName(closestIndex);
}

// Function to highlight a name and unhighlight others
function highlightName(index) {
    nameElements[index].classList.remove("hide")
    nameElements[index].classList.add("show");
    setTimeout(() => {
        nameElements[index].classList.remove("show");
        nameElements[index].classList.add("hide");    
    }, 200);  

}

// Live update every frame for smooth second-hand motion
function animateSecondHand() {
    requestAnimationFrame(animateSecondHand);
    updateSecondHand();
    updateMinuteHand();
}
animateSecondHand();

// Scroll event listener
window.addEventListener('scroll', function() {
    lastScrollTime = Date.now();
    if (timer !== null) {
        clearTimeout(timer);
    }

    // Get the scroll position
    let scrollPosition = window.scrollY;

    // Calculate additional rotation from scrolling
    additionalRotation = ((scrollPosition % (360 * 12)) / 12);

    applyRotation(); // Apply the new rotation and update the name highlight

    timer = setTimeout(() => {
        additionalRotation = ((window.scrollY % (360 * 12)) / 12);
        applyRotation();
    }, 200);
});


