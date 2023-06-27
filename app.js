"use strict"
console.log("Odd Duck js loaded")

const projectContainer = document.querySelector("section")
const resultsButton = document.querySelector("section + div")
const image1 = document.querySelector("section img:first-child")
const image2 = document.querySelector("section img:nth-child(2)")
const image3 = document.querySelector("section img:nth-child(3)")

let clicks = 0
const maxClicksAllowed = 5 // change this to 25 later

let allProjects = [];
let pastProjects = [];


function getRandomNumber(){
    let x = Math.floor(Math.random() * allProjects.length)
    return x
}


function Project(name, src){
    this.name = name;
    this.src = src;
    this.clicks = 0;
    this.views = 0;
    allProjects.push(this);
    // console.log(allProjects)
}

function renderProjects(){
    let project1 = getRandomNumber();
    let project2 = getRandomNumber();
    let project3 = getRandomNumber();

    console.log(project1, project2, project3)
    console.log(pastProjects)

    while (project1 === project2 || 
        project1 === project3 || 
        project2 === project3 ||
        pastProjects.includes(project1) ||
        pastProjects.includes(project2) ||
        pastProjects.includes(project3)
        ){
        project1 = getRandomNumber();
        project2 = getRandomNumber();
        project3 = getRandomNumber();
    }
    console.log(`first is ${project1}, second is ${project2} and third is ${project3}`)

    image1.src = allProjects[project1].src
    image2.src = allProjects[project2].src
    image3.src = allProjects[project3].src
    image1.alt = allProjects[project1].name
    image2.alt = allProjects[project2].name
    image3.alt = allProjects[project3].name
    allProjects[project1].views++
    allProjects[project2].views++
    allProjects[project3].views++
    pastProjects = [];
    pastProjects.push(project1, project2, project3)
    console.log(pastProjects)

    console.log(`${allProjects[project1].views} while loop is working?`)
    // console.log(pastProjects)
}

function projectClickedOn(event){
    if (event.target === projectContainer){
        alert("Please select a project you believe would be best to do next.")
    } else {
        clicks++;
        console.log(clicks)
        let clickedProject = event.target.alt;
        for (let i =0; i < allProjects.length; i++){
            if (clickedProject === allProjects[i].name){
                allProjects[i].clicks++;
                break
            }
        }
    }
    if (clicks === maxClicksAllowed){
        projectContainer.removeEventListener("click", projectClickedOn);
        projectContainer.className = "no-voting";
        // resultsButton.addEventListener("click", renderResults);
        resultsButton.addEventListener("click", renderChat);
        resultsButton.className = "clicks-allowed"
        image1.classList.add("noProjects")
        image2.classList.add("noProjects")
        image3.classList.add("noProjects")
        


    } else {
    renderProjects();
    }
}

const bag = new Project("bag", "images/bag.jpg")
const banana = new Project("banana","images/banana.jpg")
const bathroom = new Project("bathroom", "images/bathroom.jpg")
const boots = new Project("boots","images/boots.jpg")
const breakfast = new Project("breakfast", "images/breakfast.jpg")
const bubblegum = new Project("bubblegum","images/bubblegum.jpg")
const chair = new Project("chair","images/chair.jpg")
const cthulhu = new Project("cthulhu", "images/cthulhu.jpg")
const dogduck = new Project ("dog-duck","images/dog-duck.jpg")
const dragon = new Project("dragon","images/dragon.jpg")
const pen = new Project("pen","images/pen.jpg")
const petsweep = new Project("pet-sweep","images/pet-sweep.jpg")
const scissors = new Project("scissors","images/scissors.jpg")
const shark = new Project("shark","images/shark.jpg")
const sweep = new Project("sweep","images/sweep.png")
const tauntaun = new Project("tauntaun","images/tauntaun.jpg")
const unicorn = new Project("unicorn", "images/unicorn.jpg")
const watercan = new Project("water-can","images/water-can.jpg")
const wineglass = new Project("wine-glass","images/wine-glass.jpg")

// Use this later
// for (let i = 0; i < productNames.length; i++) {
//     new Project(productNames[i], `imgs/${productNames[i]}.jpg`);
// }

function renderResults(){
    console.log("Here are the results")
    let ul = document.querySelector("ul")
    for(let i = 0; i < allProjects.length; i++){
        let li = document.createElement("li")
        li.textContent = `${allProjects[i].name} had ${allProjects[i].clicks} votes, and was seen ${allProjects[i].views} times.`
        ul.appendChild(li);
    }
}

renderProjects()

projectContainer.addEventListener("click", projectClickedOn)

function renderChat(){
    resultsButton.className = "resultsShown"
    const projectNames = [];
    const projectViews = [];
    const projectClicks = [];

    for (let i = 0; i < allProjects.length; i++){
        projectNames.push(allProjects[i].name)
        projectViews.push(allProjects[i].views)
        projectClicks.push(allProjects[i].clicks)
    }

    const data = {
        labels: projectNames,
        datasets: [
            {
                label: "views",
                data: projectViews,
                backgroundColor: ["yellow"],
                borderColor: ["green"],
                borderWidth: 1,
            },
            {
                label: "clicks",
                data: projectClicks,
                backgroundColor: ["magenta"],
                borderColor: ["green"],
                borderWidth: 1,
            },
        ]
    }
    const config = {
        type: "bar",
        data: data,
    };

    const projectChart = document.getElementById("chart");
    const resultChart = new Chart(projectChart,config)
}