/**
 * @class RegressionCoefficients
 * @type {Object}
 * @property {number} intercept The ordinate at origin
 * @property {number} declive Slope of the regression line
 */
function RegressionCoefficients(a, b) {
    return {
        intercept: a,
        declive: b
    }
}

/**
 * Processes samples and returns the coefficients of the line
 * @param {Array<Array.<number, number>>} samples The list of samples to find the regression coefficients
 * @returns {RegressionCoefficients} The intecept and declive constants
 */
function findRegressionCoefficients(samples) {
    if (!samples || samples.length < 3) throw Error("Invalid number of samples ")

    const { xSum, ySum, xySum, xToPower2Sum } = generateSums()

    const declive = findDeclive()
    const intercept = findIntercept()

    return new RegressionCoefficients(intercept, declive)

    function findDeclive() {
        const samplesLength = samples.length
        const xSumToPower2 = Math.pow(xSum, 2)
        return (samplesLength * xySum - xSum * ySum) / (samplesLength * xToPower2Sum - xSumToPower2)
    }

    function findIntercept() {
        return (ySum - declive * xSum) / samples.length
    }

    function generateSums() {
        return samples.reduce((acc, [x, y]) => {
            acc.xSum += x
            acc.ySum += y
            acc.xySum += x * y
            acc.xToPower2Sum += Math.pow(x, 2)
            return acc
        }, {
            xSum: 0,
            ySum: 0,
            xySum: 0,
            xToPower2Sum: 0
        })
    }
}

export default findRegressionCoefficients