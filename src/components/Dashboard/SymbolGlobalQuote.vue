<script>
import StockRequests from "@/components/Dashboard/StockRequests.vue";

export default {
  name: "symbol-global-quote",
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
      return `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${this.symbol}&apikey=${this.apiKey}`;
    },
  },

  // ---------------------------------------------------
  // methods
  // ---------------------------------------------------
  methods: {
    processApiData(data) {
      return new Promise((resolve, reject) => {
        try {
          if (data) {
            const global_quote = data["Global Quote"];

            const symbol = global_quote["01. symbol"]; // "IBM"
            const open = global_quote["02. open"]; // "123.7900"
            const high = global_quote["03. high"]; // "126.0600"
            const low = global_quote["04. low"]; // "123.3600"
            const price = global_quote["05. price"]; // "125.6800"
            const volume = global_quote["06. volume"]; // "4070816"
            const latest_trading_day = global_quote["07. latest trading day"]; // "2020-08-24"
            const previous_close = global_quote["08. previous close"]; // "123.1600"
            const change = global_quote["09. change"]; // "2.5200"
            const change_percent = global_quote["10. change percent"]; // "2.0461%"

            resolve({
              symbol,
              open,
              high,
              low,
              price,
              volume,
              latest_trading_day,
              previous_close,
              change,
              change_percent,
            });
          }
        } catch (error) {
          reject(error);
        }
      });
    },
  },
};
</script>
