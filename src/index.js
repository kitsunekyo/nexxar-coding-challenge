(function () {
    const drawer = (() => {
        let isOpen = false;
        let backupHeaderText = "";

        let $body = null;
        let $headerTitleEl = null;

        const toggle = () => {
            if (!isOpen) {
                backupHeaderText = $headerTitleEl.innerHTML;
            }
            isOpen = !isOpen;
            $body.classList.toggle("drawer--open");
            $headerTitleEl.innerHTML = isOpen ? "Menu" : backupHeaderText;
        };

        document.addEventListener("DOMContentLoaded", () => {
            $body = document.querySelector("body");
            $headerTitleEl = document.querySelector(".header__title");

            document.querySelector(".overlay").addEventListener("click", toggle);
            document.querySelector(".nav-button").addEventListener("click", toggle);
        });
    })();

    const menu = (() => {
        const menuSelector = ".menu";
        const primaryMenuSelector = ".menu-primary";
        const submenuSelector = ".menu-secondary";
        const backButtonSelector = ".drawer-breadcrumbs";
        const openClass = "menu-secondary--open";

        let $menu = null;
        let $primaryMenu = null;
        let $menuItemLinks = null;
        let $backButton = null;
        let menuHeight = null;

        const closeSubmenus = () => {
            $menuItemLinks.forEach((el) => {
                const $submenu = el.parentElement.querySelector(submenuSelector);
                $submenu.classList.remove(openClass);
            });
        };

        const back = (e) => {
            e.preventDefault();

            $primaryMenu.style.transform = "translate(0)";
            closeSubmenus();
            $backButton.style.display = "none";
            $menu.style.height = `${menuHeight}px`;
        };

        const handleSubmenuOpen = (e) => {
            e.preventDefault();

            closeSubmenus();

            $backButton.style.display = "block";
            $primaryMenu.style.transform = "translate(-100%)";
            const $submenu = e.target.parentElement.querySelector(submenuSelector);
            $submenu.classList.add(openClass);
            $menu.style.height = `${$submenu.offsetHeight}px`;
        };

        document.addEventListener("DOMContentLoaded", () => {
            $primaryMenu = document.querySelector(primaryMenuSelector);
            $menu = document.querySelector(menuSelector);
            $menuItemLinks = document.querySelectorAll(`${submenuSelector} + a`);
            $backButton = document.querySelector(backButtonSelector);

            menuHeight = $menu.offsetHeight;
            $menu.style.height = `${menuHeight}px`;

            $backButton.addEventListener("click", back);

            $menuItemLinks.forEach((el) => {
                el.addEventListener("click", handleSubmenuOpen);
            });
        });
    })();
})();
