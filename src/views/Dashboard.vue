<template>
  <div class="dashboard-page">
    <!-- SymbolGlobalQuote  -->
    <SymbolGlobalQuote api-key="demo" symbol="IBM">
      <template v-slot:default="{data}">
        <WatchListItem :data="data" />
      </template>
    </SymbolGlobalQuote>
    
    <!-- SymbolHistoricalData -->
    <SymbolHistoricalData api-key="demo" symbol="IBM">
      <template v-slot:default="{data}">
        <CandlestickChart :chart-data="data" />
      </template>
    </SymbolHistoricalData>

    <!-- IndexMainCompanies -->
    <IndexMainCompanies :total-companies="10">
      <template v-slot:default="{data}">
        <CustomTable
          :keys-items="indexCompaniesLabels"
          :items="data"
          @rowActionClick="handleTableRowAction"
        />
      </template>
    </IndexMainCompanies>

    <!-- UserWatchList -->
    <UserWatchList v-if="isAuthenticated">
      <template v-slot:default="{data}">
        <List :items="data">
          <template v-slot:item="{data}">
            <WatchListItem :data="data">
              <CustomButton slot="action" color="dark">Remove</CustomButton>
            </WatchListItem>
          </template>
        </List>
      </template>
    </UserWatchList>
  </div>
</template>


<script>
import SymbolGlobalQuote from "@/components/Dashboard/SymbolGlobalQuote.vue";
import SymbolHistoricalData from "@/components/Dashboard/SymbolHistoricalData.vue";
import IndexMainCompanies from "@/components/Dashboard/IndexMainCompanies.vue";
import UserWatchList from "@/components/Dashboard/UserWatchList.vue";
import WatchListItem from "@/components/Dashboard/WatchListItem.vue";

import CandlestickChart from "@/components/commom/CandlestickChart.vue";

import { mapGetters } from "vuex";

export default {
  name: "dashboard-page",
  components: {
    SymbolGlobalQuote,
    SymbolHistoricalData,
    CandlestickChart,
    IndexMainCompanies,
    UserWatchList,
    WatchListItem,
  },
  computed: {
    ...mapGetters("auth", ["isAuthenticated"]),
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
    handleTableRowAction(item) {
      this.$router.push({
        name: "dashboard-symbol",
        params: { symbol: item.code },
      });
    },
  },
};
</script>
