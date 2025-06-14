var panels = document.querySelectorAll(".panel");

panels.forEach((panel) => {
    panel.addEventListener("click", () => {
        if(panel.classList.contains("active"))
        {
            panel.classList.remove("active");
        }
        else{
            removeActivePanel();
            panel.classList.add("active");
        }
    });
});

var removeActivePanel = () => {
    panels.forEach((panel) => {
        panel.classList.remove("active");
    });
};