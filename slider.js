const track = document.querySelector(".slider-track");
const slides = document.querySelectorAll(".slider-track img");

const prevBtn = document.querySelector(".prev");
const nextBtn = document.querySelector(".next");
const dotsContainer = document.querySelector(".dots");

let currentIndex = 1;
let slideWidth = slides[0].clientWidth;

// Position on first real image
track.style.transform = `translateX(-${slideWidth}px)`;

// Create indicator dots
for(let i = 1; i < slides.length - 1; i++){

    const dot = document.createElement("span");
    dot.classList.add("dot");

    if(i === 1){
        dot.classList.add("active");
    }

    dot.dataset.index = i;

    dot.addEventListener("click", () => {
        currentIndex = i;
        moveSlider();
    });

    dotsContainer.appendChild(dot);
}

const dots = document.querySelectorAll(".dot");

function updateDots(){

    dots.forEach(dot => dot.classList.remove("active"));

    let activeIndex = currentIndex - 1;

    if(activeIndex < 0){
        activeIndex = dots.length - 1;
    }

    if(activeIndex >= dots.length){
        activeIndex = 0;
    }

    dots[activeIndex].classList.add("active");
}

function moveSlider(){

    track.style.transition = "transform 0.5s ease-in-out";
    track.style.transform = `translateX(-${slideWidth * currentIndex}px)`;

    updateDots();
}

nextBtn.addEventListener("click", () => {

    if(currentIndex >= slides.length - 1) return;

    currentIndex++;
    moveSlider();

});

prevBtn.addEventListener("click", () => {

    if(currentIndex <= 0) return;

    currentIndex--;
    moveSlider();

});

track.addEventListener("transitionend", () => {

    if(currentIndex === slides.length - 1){

        track.style.transition = "none";
        currentIndex = 1;
        track.style.transform = `translateX(-${slideWidth}px)`;
    }

    if(currentIndex === 0){

        track.style.transition = "none";
        currentIndex = slides.length - 2;
        track.style.transform = `translateX(-${slideWidth * currentIndex}px)`;
    }

    updateDots();

});

window.addEventListener("resize", () => {

    slideWidth = slides[0].clientWidth;

    track.style.transition = "none";
    track.style.transform = `translateX(-${slideWidth * currentIndex}px)`;

});
