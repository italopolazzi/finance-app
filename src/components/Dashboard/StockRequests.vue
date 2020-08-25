<template>
  <div class="stock-request">
    <!-- loading -->
    <div v-if="!error && !lastData">
      <slot name="loading">loading...</slot>
    </div>

    <!-- error -->
    <div v-else-if="error">
      <slot name="error">
        <div
          class="text-xl"
        >Oops! Unfortunately this service is not available now. Try again in a few minutes.</div>
        <p v-if="isDev" class="text-md">{{ error.message}}</p>
      </slot>
    </div>

    <!-- normal -->
    <slot :data="lastData" />
  </div>
</template>


<script>
export default {
  name: "stock-request",

  // ---------------------------------------------------
  // data
  // ---------------------------------------------------
  computed: {
    requestUrl() {
      // to override
      return "api/url";
    },
  },

  data: () => ({
    lastData: null,
    interval: null,
    error: null,
  }),

  // ---------------------------------------------------
  // hoooks
  // ---------------------------------------------------
  mounted() {
    this.makeFirstRequest();
    this.repeatRequestsByInterval();
  },

  beforeDestroy() {
    clearInterval(this.interval);
  },

  // ---------------------------------------------------
  // methods
  // ---------------------------------------------------
  methods: {
    makeFirstRequest() {
      this.doApiRequest();
    },

    repeatRequestsByInterval(milliseconds = 60 * 1000) {
      this.interval = setInterval(() => {
        this.doApiRequest();
      }, milliseconds);
    },

    async doApiRequest() {
      try {
        const response = await fetch(this.requestUrl);
        const data = await response.json();
        this.lastData = await this.processApiData(data);
      } catch (error) {
        this.error = error;
      }
    },

    processApiData(data) {
      // to override
      return new Promise((resolve, reject) => {
        try {
          resolve(data);
        } catch (error) {
          reject(error);
        }
      });
    },
  },
};
</script>
