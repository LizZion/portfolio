(function () {
    const buttons = [...document.querySelectorAll(".control")];

    function changeTab(index) {
        if (index < 0 || index >= buttons.length) return;

        document.querySelector(".active-btn")?.classList.remove("active-btn");
        document.querySelector(".active")?.classList.remove("active");

        const button = buttons[index];

        button.classList.add("active-btn");
        document.getElementById(button.dataset.id).classList.add("active");

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }

    // Botões
    buttons.forEach((button, index) => {
        button.addEventListener("click", function () {
            changeTab(index);
        });
    });

    let scrollAmount = 0;
    let scrollTimeout;
    let locked = false;

    window.addEventListener("wheel", function (event) {
        if (locked) return;

        const activeIndex = buttons.findIndex(button =>
            button.classList.contains("active-btn")
        );

        const scrollTop = window.scrollY;

        const documentHeight = document.documentElement.scrollHeight;
        const windowHeight = window.innerHeight;

        const atTop = scrollTop <= 5;

        const atBottom =
            scrollTop + windowHeight >= documentHeight - 20;

        // Só acumula scroll para trocar quando estiver
        // no TOPO ou no FINAL da página
        if (
            (event.deltaY > 0 && atBottom) ||
            (event.deltaY < 0 && atTop)
        ) {
            scrollAmount += event.deltaY;
        } else {
            scrollAmount = 0;
            return;
        }

        // Precisa insistir bastante no scroll
        const threshold = 900;

        // Próxima aba
        if (scrollAmount > threshold) {
            changeTab(activeIndex + 1);

            scrollAmount = 0;
            locked = true;

            setTimeout(() => {
                locked = false;
            }, 1000);
        }

        // Aba anterior
        else if (scrollAmount < -threshold) {
            changeTab(activeIndex - 1);

            scrollAmount = 0;
            locked = true;

            setTimeout(() => {
                locked = false;
            }, 1000);
        }

        clearTimeout(scrollTimeout);

        scrollTimeout = setTimeout(() => {
            scrollAmount = 0;
        }, 400);
    });

    // Tema
    document.querySelector(".theme-btn").addEventListener("click", () => {
        document.body.classList.toggle("light-mode");
    });
})();
