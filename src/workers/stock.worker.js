import findRegressionCoefficients from '@/utils/regression.js'


export const processData = async(data) => {
    const series = data["Time Series (1min)"];
    /** 
        "2020-08-24 20:00:00": {
          "1. open": "125.6900",
          "2. high": "125.6900",
          "3. low": "125.6900",
          "4. close": "125.6900",
          "5. volume": "200"
        }
       */
    const datasetItems = Object.entries(series).map(
        ([dataKey, ohlcValues]) => {
            const o = ohlcValues["1. open"]; // "125.6900",
            const h = ohlcValues["2. high"]; // "125.6900",
            const l = ohlcValues["3. low"]; // "125.6900",
            const c = ohlcValues["4. close"]; // "125.6900",
            // const v = ohlcValues["5. volume"]; // "100"

            const t = dataKey.replace(" ", "T").concat("Z");
            const ohlcParsedValues = {
                o: parseFloat(o),
                h: parseFloat(h),
                l: parseFloat(l),
                c: parseFloat(c),
                t: new Date(t),
            };

            return ohlcParsedValues;
        }
    );

    return datasetItems
}

/**
 * Works as the Web Worker by using the comlink-loader.
 * Each function must be async, the Worker will process the function and return something that can be awaited in the Vue files.
 * @param {Array<{o, h, l, c, t}>} datasetItems The list of samples to find the regression coefficients
 * @returns {Object} Processed regression utilities
 */
export const processLineData = async(datasetItems) => {

    const samplesAverages = datasetItems.map(({ h, l }, index) => {
        const average = (h + l) / 2
        return [average, index];
    });


    const { intercept, declive } = findRegressionCoefficients(samplesAverages);


    function Line(intercept, declive) {
        const findPointYCoordinate = x => {
            return intercept + declive * x
        }

        const generateLinearPoints = () => {
            return [...Array(2).keys()].map(n => ({ x: n, y: findPointYCoordinate(n) }))
        }

        return generateLinearPoints()
    }

    const lineData = {};

    const dataset = {};
    dataset.label = "Time Series";
    dataset.borderColor = "red"
    dataset.data = new Line(intercept, declive);

    lineData.datasets = [dataset];

    return lineData
}

export const processChandlestickData = async(datasetItems, theme) => {
    const chandlestickData = {};

    const dataset = {};
    dataset.label = "Time Series";
    dataset.color = theme ? {
            up: theme.success,
            down: theme.error,
            unchanged: theme.foreground,
        } :
        undefined;
    dataset.data = datasetItems;

    chandlestickData.datasets = [dataset];

    return chandlestickData
}

export const processBothData = async(data, theme) => {
    const processedData = await processData(data);

    const lineData = await processLineData(processedData);

    const chandlestickData = await processChandlestickData(
        processedData,
        theme
    );

    return { chandlestickData, lineData }
}