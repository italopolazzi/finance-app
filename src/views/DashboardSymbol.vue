<template>
  <div class="dashboard-symbol">
    <template v-if="error">
      <Dialog :value="error" :dialog-title="error.message">
        <CustomButton @click="backToDashboard">Back to dashboard</CustomButton>
      </Dialog>
    </template>

    <!-- UserWatchList -->
    <section id="watch-list">
      <FakeWatchList :companies="[symbol]">
        <template v-slot:default="{data}">
          <WatchListItem :data="data[0]">
            <PushPopWatchListButton :company-code="data[0].code" slot="action" />
          </WatchListItem>
        </template>
      </FakeWatchList>
    </section>

    <section id="historical-data">
      <SymbolHistoricalData api-key="demo" :symbol="symbol">
        <template v-slot:default="{data}">
          <CandlestickChart :chart-data="data" />
        </template>
      </SymbolHistoricalData>
    </section>
  </div>
</template>


<script>
// import SymbolGlobalQuote from "@/components/Dashboard/SymbolGlobalQuote.vue";
import SymbolHistoricalData from "@/components/Dashboard/SymbolHistoricalData.vue";

import FakeWatchList from "@/components/Dashboard/FakeWatchList.vue";
import WatchListItem from "@/components/Dashboard/WatchListItem.vue";
import PushPopWatchListButton from "@/components/commom/PushPopWatchListButton.vue";

import CandlestickChart from "@/components/commom/CandlestickChart.vue";

import "@/assets/styles/dashboard.scss";

export default {
  name: "dashboard-symbol",
  components: {
    // SymbolGlobalQuote,
    SymbolHistoricalData,
    CandlestickChart,
    FakeWatchList,
    WatchListItem,
    PushPopWatchListButton,
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
    else {
      next((vm) => {
        vm.error = new Error(`Invalid Symbol ${vm.symbol}`);
      });
    }
  },

  methods: {
    backToDashboard() {
      this.$router.push({ name: "dashboard" });
    },
  },
};
</script>