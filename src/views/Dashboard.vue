<template>
  <div class="dashboard-page">
    <!-- SymbolGlobalQuote  -->
    <section id="headline">
      <!-- <SymbolGlobalQuote api-key="demo" symbol="IBM">
        <template v-slot:default="{data}">
          <WatchListItem :data="data" />
        </template>
      </SymbolGlobalQuote>-->
      <h2 class="section-title">Index</h2>

      <FakeWatchList :companies="['IBOVESPA']" :milliseconds="3000">
        <template v-slot:default="{data}">
          <WatchListItem :data="data[0]" />
        </template>
      </FakeWatchList>
    </section>

    <!-- SymbolHistoricalData -->
    <section id="historical-data">
      <h2 class="section-title">Historical Data</h2>
      <SymbolHistoricalData api-key="demo" symbol="IBM">
        <template v-slot:default="{data}">
          <CandlestickChart :chart-data="data.chandlestickData" />
          <LineChart :chart-data="data.lineData" />
        </template>
      </SymbolHistoricalData>
    </section>

    <!-- IndexMainCompanies -->
    <section id="top-companies">
      <h2 class="section-title">Index Main Companies</h2>
      <p>Select one to open details</p>
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
      <h2 class="section-title">Watch List</h2>
      <FakeWatchList v-if="isAuthenticated" :companies="watchList" :key="watchList.length">
        <template v-slot:default="{data}">
          <List :items="data">
            <template v-slot:item="{data}">
              <WatchListItem :data="data">
                <PushPopWatchListButton :company-code="data.code" slot="action" />
              </WatchListItem>
            </template>
          </List>
        </template>
      </FakeWatchList>

      <template v-else>
        <div>Log In to see your WatchList</div>
        <router-link to="login">Login</router-link>
      </template>
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

import PushPopWatchListButton from "@/components/commom/PushPopWatchListButton.vue";

import CandlestickChart from "@/components/commom/CandlestickChart.vue";
import LineChart from "@/components/commom/LineChart.vue";

import { mapGetters, mapState } from "vuex";

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

    PushPopWatchListButton,
    CandlestickChart,
    LineChart,
  },

  computed: {
    ...mapState("user", ["watchList"]),
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