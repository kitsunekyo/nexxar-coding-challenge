(function () {
    let $header;

    document.addEventListener("DOMContentLoaded", () => {
        $header = document.querySelector("header");
        document.querySelector(".nav-button").addEventListener("click", handleNavMenuToggle);
    });

    const handleNavMenuToggle = () => {
        $header.classList.toggle("header--open");
    };
})();
