(function () {
    const buttons = [...document.querySelectorAll(".control")];

    function changeTab(index) {
        if (index < 0 || index >= buttons.length) return;

        document.querySelector(".active-btn")?.classList.remove("active-btn");
        document.querySelector(".active")?.classList.remove("active");

        const button = buttons[index];

        button.classList.add("active-btn");
        document.getElementById(button.dataset.id).classList.add("active");

        // Volta a aba para o topo
        window.scrollTo(0, 0);
    }

    // Botões
    buttons.forEach((button, index) => {
        button.addEventListener("click", function () {
            changeTab(index);
        });
    });

    // Scroll entre as abas
    let scrollAmount = 0;
    let scrollTimeout;
    
    window.addEventListener("wheel", function (event) {
        const activeIndex = buttons.findIndex(button =>
            button.classList.contains("active-btn")
        );
    
        // Acumula a força do scroll
        scrollAmount += event.deltaY;
    
        // Só troca depois de um scroll mais intencional
        const threshold = 350;
    
        if (scrollAmount > threshold) {
            changeTab(activeIndex + 1);
            scrollAmount = 0;
        }
    
        else if (scrollAmount < -threshold) {
            changeTab(activeIndex - 1);
            scrollAmount = 0;
        }
    
        // Se parar de scrollar, reseta
        clearTimeout(scrollTimeout);
    
        scrollTimeout = setTimeout(() => {
            scrollAmount = 0;
        }, 250);
    });

    // Tema claro/escuro
    document.querySelector(".theme-btn").addEventListener("click", () => {
        document.body.classList.toggle("light-mode");
    });
})();
