var progress = document.querySelector(".progress");
var next = document.querySelector(".next");
var prev = document.querySelector(".previous");
var circles = document.querySelectorAll(".circle");

var currentActive = 1;

next.addEventListener("click", () => {
    currentActive++;
    if(currentActive > circles.length)
        currentActive = circles.length;
        update();
});

prev.addEventListener("click", () => {
    currentActive--;
    if(currentActive < 1)
        currentActive = 1;
        update();
});

const update = () => 
{
    circles.forEach((circle,index) => {
        if(index < currentActive)
        {
            circle.classList.add("active");
        }
        else{
            circle.classList.remove("active");
        }
    });
    
    var actives = document.querySelectorAll(".active");
    progress.style.width = ((actives.length - 1) / (circles.length - 1)) * 100 + "%";
    if(currentActive === 1)
    {
        prev.disabled = true;
    }
    else if(currentActive === circles.length){
        next.disabled = true;
    }
    else{
        prev.disabled = false;
        next.disabled = false;
    }
};