import findRegressionCoefficients from '@/utils/regression.js'

/**
 * Works as the Web Worker by using the comlink-loader.
 * Each function must be async, the Worker will process the function and return something that can be awaited in the Vue files.
 * @param {Array<Array.<number, number>>} samples The list of samples to find the regression coefficients
 * @returns {Object} Processed regression utilities
 */
export const processStockDataWithRegression = async(samples) => {

    const samplesAverages = samples.map(([priceHigh], index) => {
        return [priceHigh, index];
    });

    const { intercept, declive } = findRegressionCoefficients(samplesAverages);

    function Line(intercept, declive, totalPoints = 2) {
        const findLineYPoint = x => {
            return intercept + declive * x
        }

        const generateLinearPoints = () => {
            return [...Array(totalPoints)].map(index => [index, findLineYPoint(index)])
        }

        return generateLinearPoints()
    }

    return {
        line: new Line(intercept, declive, samples.length)
    }
}