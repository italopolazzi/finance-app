<template>
  <div class="dashboard-page">
    <h1>This is an dashboard page</h1>

    <SymbolGlobalQuote api-key="demo" symbol="IBM">
      <template v-slot:default="{data}">
        <div class="headline">
          <h1>{{data.price}}</h1>
          <h5>{{data.change}}</h5>
        </div>
      </template>
    </SymbolGlobalQuote>

    <SymbolHistoricalData api-key="demo" symbol="IBM">
      <template v-slot:default="{data}">
        <CandlestickChart :chart-data="data" />
      </template>
    </SymbolHistoricalData>

  </div>
</template>


<script>
import SymbolGlobalQuote from "@/components/Dashboard/SymbolGlobalQuote.vue";
import SymbolHistoricalData from "@/components/Dashboard/SymbolHistoricalData.vue";

import CandlestickChart from "@/components/commom/CandlestickChart.vue";

export default {
  name: "dashboard-page",
  components: { SymbolGlobalQuote, SymbolHistoricalData, CandlestickChart },
};
</script>
