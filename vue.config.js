// vue.config.js

const themeVariables = require("./theme.config.js")

module.exports = {
    css: {
        loaderOptions: {
            scss: {
                // prepend variables to src/assets/theme.scss
                prependData: themeVariables
            }
        }
    }
}