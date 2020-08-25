<script>
import StockRequests from "@/components/Dashboard/StockRequests.vue";

export default {
  name: "symbol-historical-data",
  mixins: [StockRequests],
  // ---------------------------------------------------
  // data
  // ---------------------------------------------------
  props: {
    symbol: {
      type: String,
      required: true,
    },
    apiKey: {
      type: String,
      required: true,
    },
  },

  computed: {
    requestUrl() {
      return `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${this.symbol}&interval=1min&apikey=${this.apiKey}`;
    },
  },

  // ---------------------------------------------------
  // methods
  // ---------------------------------------------------
  methods: {
    processApiData(data) {
      return new Promise((resolve, reject) => {
        try {
          if (!data) throw Error("No data received");

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

          const result = {};

          const dataset = {};
          dataset.label = "Time Series";
          dataset.color = this.$themeColors
            ? {
                up: this.$themeColors.success,
                down: this.$themeColors.error,
                unchanged: this.$themeColors.foreground,
              }
            : undefined;
          dataset.data = datasetItems;

          result.datasets = [dataset];
          resolve(result);
        } catch (error) {
          reject(error);
        }
      });
    },
  },
};
</script>
