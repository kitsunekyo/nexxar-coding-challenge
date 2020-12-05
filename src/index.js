(function () {
    document.addEventListener("DOMContentLoaded", () => {
        menu();
    });

    const menu = () => {
        let isOpen = false;
        let backupHeaderText = '';

        const $header = document.querySelector("header");
        const $headerTitleEl = document.querySelector(".header__title");

        const toggle = () => {
            if (!isOpen) {
                backupHeaderText = $headerTitleEl.innerHTML;
            }
            isOpen = !isOpen;
            $header.classList.toggle("header--open");
            $headerTitleEl.innerHTML = isOpen ? 'Menu' : backupHeaderText;
        }

        document.querySelector(".nav-button").addEventListener("click", toggle);
    }
})();
