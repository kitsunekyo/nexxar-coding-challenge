(function () {
    document.addEventListener("DOMContentLoaded", () => {
        drawer();
        menu();
    });

    const drawer = () => {
        let isOpen = false;
        let backupHeaderText = "";

        const $body = document.querySelector("body");
        const $headerTitleEl = document.querySelector(".header__title");

        const toggle = () => {
            if (!isOpen) {
                backupHeaderText = $headerTitleEl.innerHTML;
            }
            isOpen = !isOpen;
            $body.classList.toggle("drawer--open");
            $headerTitleEl.innerHTML = isOpen ? "Menu" : backupHeaderText;
        };
        document.querySelector('.overlay').addEventListener('click', toggle);
        document.querySelector(".nav-button").addEventListener("click", toggle);
    };

    const menu = () => {
        let activeMenu = "main";
        const $mainMenuEl = document.querySelector(".menu");
        const $secondaryMenuEl = document.querySelector(".menu--secondary");

        const handleNavItemClick = (e) => {
            e.preventDefault();
            navigate(e.target.dataset.menuTarget);
        };

        const navigate = (target) => {
            activeMenu = target;

            switch (activeMenu) {
                case "main":
                    $mainMenuEl.style.display = "block";
                    $secondaryMenuEl.style.display = "none";
                    break;
                case "secondary":
                    $mainMenuEl.style.display = "none";
                    $secondaryMenuEl.style.display = "block";
                    break;
                default:
                    break;
            }
        };

        document.querySelectorAll("[data-menu-target]").forEach((el) => {
            el.addEventListener("click", handleNavItemClick);
        });
    };
})();
