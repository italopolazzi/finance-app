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
  props: {
    milliseconds: {
      type: Number,
      required: false,
      default: 60 * 1000,
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

    repeatRequestsByInterval(milliseconds = this.milliseconds) {
      this.interval = setInterval(() => {
        this.doApiRequest();
      }, milliseconds);
    },

    async doApiRequest() {
      try {
        const data = this.getFakeData();
        this.lastData = await this.processApiData(data);
      } catch (error) {
        this.error = error;
      }
    },

    getFakeData() {
      // to override
      return null;
    },

    processApiData(data) {
      // to override
      return data;
    },
  },
};
</script>
