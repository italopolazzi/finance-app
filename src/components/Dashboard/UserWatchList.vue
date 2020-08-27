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
      return ``;
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

          const items = data;

          resolve(items);
        } catch (error) {
          reject(error);
        }
      });
    },
  },
};
</script>
