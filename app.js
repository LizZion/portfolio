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
    let scrollLocked = false;

    window.addEventListener("wheel", function (event) {
        if (scrollLocked) return;

        const activeIndex = buttons.findIndex(button =>
            button.classList.contains("active-btn")
        );

        // Scroll para baixo
        if (event.deltaY > 0) {
            changeTab(activeIndex + 1);
        }

        // Scroll para cima
        else if (event.deltaY < 0) {
            changeTab(activeIndex - 1);
        }

        // Evita trocar 5 abas com uma única girada
        scrollLocked = true;

        setTimeout(() => {
            scrollLocked = false;
        }, 600);
    });

    // Tema claro/escuro
    document.querySelector(".theme-btn").addEventListener("click", () => {
        document.body.classList.toggle("light-mode");
    });
})();
