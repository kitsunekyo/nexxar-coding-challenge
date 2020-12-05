/* eslint-env node */
module.exports = {
    extends: ["stylelint-config-standard", "stylelint-config-prettier"],
    plugins: ["stylelint-scss"],
    rules: {
        "declaration-no-important": true,
    },
};
