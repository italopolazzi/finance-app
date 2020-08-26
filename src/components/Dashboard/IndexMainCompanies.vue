<script>
import StockRequests from "@/components/Dashboard/StockRequests.vue";

export default {
  name: "index-main-companies",
  mixins: [StockRequests],
  // ---------------------------------------------------
  // data
  // ---------------------------------------------------
  props: {
    symbol: {
      type: String,
      required: false,
    },
    apiKey: {
      type: String,
      required: false,
    },
    totalCompanies: {
      type: Number,
      required: true,
      default: 10,
    },
  },

  computed: {
    requestUrl() {
      return `https://bovespa.nihey.org/api/realtime`;
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

          const sortByPrice = (company1, company2) => {
            const priceToFloat = (company) => parseFloat(company.price);
            return priceToFloat(company2) - priceToFloat(company1);
          };

          const items = data.sort(sortByPrice).slice(0, this.totalCompanies);

          resolve(items);
        } catch (error) {
          reject(error);
        }
      });
    },
  },
};
</script>
