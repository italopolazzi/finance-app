// scss objects and functions to prepend scss variables to src/assets/theme.scss

const breakpoints = {
    xs: 450,
    sm: 540,
    md: 768,
    lg: 1024,
    xl: 1400,
}

const colors = {
    foreground: "#040FD9",
    background: "#010440",
    text: "#D4DBF5",
    accent: "#F2E74B",
    dark: "#3D3D3D",
    light: "#D4DBF5",
    error: "#F20505",
    success: "#23D9B7",
    warning: "#F25116",
}

/**
 * 
 * @param {Array.<Object.<string, (string|number)>>} configObjects 
 * @returns {String} returns a string with all objects key/values as SCSS variables
 */
function createScssVariablesByConfigObjects(configObjects = []) {
    return configObjects.reduce((finalString, configItem) => {

        if (!configItem && typeof configItem !== "object") {
            throw Error("Invalid theme config object")
        }

        const configItemVariablesAsString = Object.entries(configItem)
            .reduce((configItemVariablesAsString, [key, value]) => {

                if (typeof value !== "number" && typeof value !== "string") {
                    throw Error("Invalid theme object value")
                }

                return configItemVariablesAsString.concat(`$${key}: ${value};`)
            }, "")


        return finalString.concat(configItemVariablesAsString)
    }, "")
}

module.exports = createScssVariablesByConfigObjects([breakpoints, colors])