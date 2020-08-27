<template>
  <div class="dashboard-page">
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

    <IndexMainCompanies :total-companies="10">
      <template v-slot:default="{data}">
        <CustomTable
          :keys-items="indexCompaniesLabels"
          :items="data"
          @rowActionClick="handleTableRowAction"
        />
      </template>
    </IndexMainCompanies>
  </div>
</template>


<script>
import SymbolGlobalQuote from "@/components/Dashboard/SymbolGlobalQuote.vue";
import SymbolHistoricalData from "@/components/Dashboard/SymbolHistoricalData.vue";
import IndexMainCompanies from "@/components/Dashboard/IndexMainCompanies.vue";

import CandlestickChart from "@/components/commom/CandlestickChart.vue";

export default {
  name: "dashboard-page",
  components: {
    SymbolGlobalQuote,
    SymbolHistoricalData,
    CandlestickChart,
    IndexMainCompanies,
  },
  data: () => ({
    indexCompaniesLabels: {
      code: "Code",
      currency: "Currency",
      high: "High",
      low: "Low",
      priceopen: "Price Open",
      closeyest: "Close yesterday",
      volume: "Volume",
    },
  }),
  methods: {
    handleTableRowAction(v) {
      console.log(v);
    },
  },
};
</script>
