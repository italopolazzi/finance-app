<script>
import StockRequests from "@/components/Dashboard/StockRequests.vue";

export default {
  name: "user-watch-list",
  mixins: [StockRequests],
  // ---------------------------------------------------
  // data
  // ---------------------------------------------------
  props: {},

  computed: {
    requestUrl() {
      return "https://7247000e-7bad-488d-81d2-777b186efae6.mock.pstmn.io/user/1/watchlist";
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

          const watchList = data.watchList;

          resolve(watchList);
        } catch (error) {
          reject(error);
        }
      });
    },
  },
};
</script>
