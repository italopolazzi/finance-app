<template>
  <div class="dashboard-page">
    <!-- SymbolGlobalQuote  -->
    <section id="headline">
      <!-- <SymbolGlobalQuote api-key="demo" symbol="IBM">
        <template v-slot:default="{data}">
          <WatchListItem :data="data" />
        </template>
      </SymbolGlobalQuote>-->

      <FakeWatchList :companies="['IBOVESPA']" :milliseconds="3000">
        <template v-slot:default="{data}">
          <WatchListItem :data="data[0]" />
        </template>
      </FakeWatchList>
    </section>

    <!-- SymbolHistoricalData -->
    <section id="historical-data">
      <SymbolHistoricalData api-key="demo" symbol="IBM">
        <template v-slot:default="{data}">
          <CandlestickChart :chart-data="data.chandlestickData" />
          <LineChart :chart-data="data.lineData" />
        </template>
      </SymbolHistoricalData>
    </section>

    <!-- SymbolHistoricalData -->
    <section id="trend-line"></section>

    <!-- IndexMainCompanies -->
    <section id="top-companies">
      <IndexMainCompanies :total-companies="10">
        <template v-slot:default="{data}">
          <CustomTable
            :keys-items="indexCompaniesLabels"
            :items="data"
            @rowActionClick="handleTableRowAction"
          />
        </template>
      </IndexMainCompanies>
    </section>

    <!-- UserWatchList -->
    <section id="watch-list">
      <FakeWatchList>
        <template v-slot:default="{data}">
          <List :items="data">
            <template v-slot:item="{data}">
              <WatchListItem :data="data">
                <CustomButton slot="action" color="dark">Remove</CustomButton>
              </WatchListItem>
            </template>
          </List>
        </template>
      </FakeWatchList>
    </section>
  </div>
</template>


<script>
// simulate requests using setInteval and the lib faker.js
import FakeWatchList from "@/components/Dashboard/FakeWatchList.vue";

// import SymbolGlobalQuote from "@/components/Dashboard/SymbolGlobalQuote.vue";
import SymbolHistoricalData from "@/components/Dashboard/SymbolHistoricalData.vue";
import IndexMainCompanies from "@/components/Dashboard/IndexMainCompanies.vue";
// import UserWatchList from "@/components/Dashboard/UserWatchList.vue";
import WatchListItem from "@/components/Dashboard/WatchListItem.vue";

import CandlestickChart from "@/components/commom/CandlestickChart.vue";
import LineChart from "@/components/commom/LineChart.vue";

import { mapGetters } from "vuex";

import "@/assets/styles/dashboard.scss";

export default {
  name: "dashboard-page",
  components: {
    FakeWatchList,

    // SymbolGlobalQuote,
    SymbolHistoricalData,
    IndexMainCompanies,
    // UserWatchList,
    WatchListItem,

    CandlestickChart,
    LineChart,
  },

  computed: {
    ...mapGetters("auth", ["isAuthenticated"]),
    watchListFetchOptions() {
      const headers = new Headers();
      headers.append("pragma", "no-cache");
      headers.append("cache-control", "no-cache");

      const fetchOptions = {
        method: "GET",
        headers: headers,
      };

      return fetchOptions;
    },
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