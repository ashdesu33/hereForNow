let width = window.innerWidth;
let height = window.innerHeight;

let mobile = (width < 800)

// names of everyone in the show
const names = [
   { name: "Andrew Liu", website: "" },
   { name: "Anh Nguyen", website: "" },
   { name: "Aniyah Lee", website: "" },
   { name: "Anja Drakulovic", website: "" },
   { name: "Ashley Cai", website: "" },
   { name: "Avery Browne", website: "" },
   { name: "Brianna Cheng", website: "" },
   { name: "Chanya Vitayakul", website: "" },
   { name: "Daniela Guerra Fioranelli", website: "" },
   { name: "Erica Yun", website: "" },
   { name: "Hannah Jeong", website: "" },
   { name: "Hyun Jun Yoo", website: "" },
   { name: "Isabel Lee", website: "" },
   { name: "Jeanie Yu", website: "" },
   { name: "Jolin Chen", website: "" },
   { name: "Jyot Thind", website: "" },
   { name: "Leonardo Calzone", website: "" },
   { name: "Li Huang", website: "" },
   { name: "Li June Choi", website: "" },
   { name: "Macaque Jagusah", website: "" },
   { name: "Mandy Liu", website: "" },
   { name: "Miko Sellier", website: "" },
   { name: "Minah Kim", website: "" },
   { name: "Radhika Chauhan", website: "" },
   { name: "Ritvi Gilara", website: "" },
   { name: "Ryan Yan", website: "" },
   { name: "Sara Hu", website: "" },
   { name: "Scarlett Wang", website: "" },
   { name: "Sejal Gupta", website: "" },
   { name: "Siyuan Wang", website: "" },
   { name: "Sophie Feng", website: "" },
   { name: "Un Jingjang", website: "" },
   { name: "Varissara Patiparnprechavut", website: "" },
   { name: "Wenqing Ma", website: "" },
   { name: "Yeriel Jeong", website: "" },
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
            number.textContent = names[i].name;
        }
        clockFace.appendChild(number);
    }
}

addClockNumbers();
let nameElements = Array.from(clockFace.children).slice(1).slice(0, -1)
nameElements[0].classList.toggle("show")
nameElements[0].classList.toggle("hide")


// function for later to find the location in an array of the most similar value
function findClosestValue(A, arr) {
    let closestIndex = -1;
    let closestDifference = Infinity;  // Start with a very large number.

    // Loop through the array
    for (let i = 0; i < arr.length; i++) {
        const difference = Math.abs(arr[i] - A);  // Calculate the absolute difference between A and the current element

        // Update if the current difference is smaller than the previously found one
        if (difference < closestDifference) {
            closestDifference = difference;
            closestIndex = i;
        }
    }

    return closestIndex;
}

let secondHand = document.querySelector('.second-hand');
let timer = null; 

window.addEventListener('scroll', function() {
    if(timer !== null) {
        clearTimeout(timer);      
        // Get the scroll position
        let scrollPosition = window.scrollY;

        // Calculate the rotation of the second hand based on scroll position
        let rotation = ((scrollPosition % (360*12)) / 12); // Make sure the rotation stays within 360 degrees
    
        // Apply the rotation to the second hand
        secondHand.style.transform = `rotate(${rotation}deg)`;
    
        let value = findClosestValue(rotation, nameAngle)
        nameElements[value].classList.remove("hide")
        nameElements[value].classList.add("show");
    
        setTimeout(() => {
            nameElements[value].classList.remove("show");
            nameElements[value].classList.add("hide");    
        }, 200);  
    }
    timer = setTimeout(function() {
          // do something
          let scrollPosition = window.scrollY;

          // Calculate the rotation of the second hand based on scroll position
          let rotation = ((scrollPosition % (360*12)) / 12); // Make sure the rotation stays within 360 degrees
  
          let value = findClosestValue(rotation, nameAngle)
          nameElements[value].classList.remove("hide")
          nameElements[value].classList.add("show");
    }, 200);
});



