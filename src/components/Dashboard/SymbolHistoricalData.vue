<script>
import StockRequests from "@/components/Dashboard/StockRequests.vue";

import { processBothData } from "@/workers/stock.worker.js";

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
    async processApiData(data) {
     return await  processBothData(data, this.$themeColors)
    },
  },
};
</script>
