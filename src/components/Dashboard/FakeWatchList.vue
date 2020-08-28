<script>
import FakeStockRequests from "@/components/Dashboard/FakeStockRequests.vue";

export default {
  name: "fake-watch-list",
  mixins: [FakeStockRequests],

  props: {
    companies: {
      type: Array,
      required: true,
    },
  },

  // ---------------------------------------------------
  // methods
  // ---------------------------------------------------
  methods: {
    getFakeData() {
      // to override
      
      const faker = this.$faker();

      function randomQuote(code, currency) {
        const positiveOrNegative = () => {
          const { price } = faker.commerce;
          const { boolean } = faker.random;

          const number = price();

          return boolean() ? number : number * -1;
        };

        return {
          price: positiveOrNegative(),
          high: positiveOrNegative(),
          low: positiveOrNegative(),
          open: positiveOrNegative(),
          close: positiveOrNegative(),
          currency,
          code,
        };
      }

      const currency = "BRL";

      const watchList = this.companies.map((code) => randomQuote(code, currency));

      return watchList;
    },

    processApiData(data) {
      // to override
      return data;
    },
  },
};
</script>
