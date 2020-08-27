<template>
  <div class="dashboard-symbol">
    <template v-if="error">
      <Dialog :value="error" :dialog-title="error.message">
        <CustomButton @click="backToDashboard">Back to dashboard</CustomButton>
      </Dialog>
    </template>

    <template v-else>
      <SymbolGlobalQuote api-key="demo" :symbol="symbol">
        <template v-slot:default="{data}">
          <div class="headline">
            <h1>{{data.price}}</h1>
            <h5>{{data.change}}</h5>
          </div>
        </template>
      </SymbolGlobalQuote>

      <SymbolHistoricalData api-key="demo" :symbol="symbol">
        <template v-slot:default="{data}">
          <CandlestickChart :chart-data="data" />
        </template>
      </SymbolHistoricalData>
    </template>
  </div>
</template>


<script>
import SymbolGlobalQuote from "@/components/Dashboard/SymbolGlobalQuote.vue";
import SymbolHistoricalData from "@/components/Dashboard/SymbolHistoricalData.vue";

import CandlestickChart from "@/components/commom/CandlestickChart.vue";

export default {
  name: "dashboard-symbol",
  components: {
    SymbolGlobalQuote,
    SymbolHistoricalData,
    CandlestickChart,
  },
  computed: {
    symbol() {
      return this.$route.params.symbol;
    },
  },
  data: () => ({
    error: null,
  }),

  beforeRouteEnter(to, from, next) {
    // simulating a invalid request

    if (to.params.symbol === "IBM") next();

    next((vm) => {
      vm.error = new Error(`Invalid Symbol ${vm.symbol}`);
    });
  },

  methods: {
    backToDashboard() {
      this.$router.push({ name: "dashboard" });
    },
  },
};
</script>