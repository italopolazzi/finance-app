<template>
  <div class="watch-list-item">
    <!-- headline -->
    <div class="watch-list-item__headline">
      <div class="symbol">
        <div class="code text-sm">{{data.code}}</div>
        <div class="price text-xl">
          <DynamicNumber :number="data.price | price" />
        </div>
      </div>
      <div class="text-caption">
        <div class="currency">{{data.currency}}</div>
      </div>
    </div>
    <!-- ohlc -->
    <div class="watch-list-item__ohlc">
      <table>
        <thead>
          <tr>
            <th>high</th>
            <th>open</th>
            <th>low</th>
            <th>close</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td class="high">
              <DynamicNumber :number="data.high | price" />
            </td>
            <td class="open">
              <DynamicNumber :number="data.open | price" />
            </td>
            <td class="low">
              <DynamicNumber :number="data.low | price" />
            </td>
            <td class="close">
              <DynamicNumber :number="data.close | price" />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <!-- action -->
    <div class="watch-list-item__action">
      <slot name="action" />
    </div>
  </div>
</template>


<script>
import DynamicNumber from "@/components/Dashboard/DynamicNumber.vue";

export default {
  name: "watch-list-item",

  components: {
    DynamicNumber,
  },

  filters: {
    price(v) {
      return parseFloat(v).toFixed(2);
    },
  },
  // functional: true,
  props: {
    data: {
      type: Object,
      required: true,
    },
  },
};
</script>


<style lang="scss" scoped>
.watch-list-item {
  background: var(--color-accent);
  color: var(--color-dark);
  margin-bottom: var(--size100);
  padding: var(--size100);
  display: grid;
  grid-template-areas: "headline ohlc action";
  grid-template-columns: 2fr 1fr auto;
  grid-template-rows: auto;
}

.watch-list-item__headline {
  grid-area: headline;
  display: flex;
  align-items: flex-end;
  justify-content: flex-start;
}

.watch-list-item__ohlc {
  grid-area: ohlc;
}

.watch-list-item__action {
  grid-area: action;
}

.watch-list-item__ohlc table {
  border-collapse: separate;
  border-spacing: var(--size025);
}

thead {
  text-transform: uppercase;
}

tbody {
  font-weight: bold;
}

.watch-list-item__ohlc thead tr,
.watch-list-item__ohlc tbody tr {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  font-size: var(--text-caption);
}

table th,
table td {
  padding: var(--size025) var(--size050);
  display: flex;
  flex-flow: row nowrap;
}

.symbol {
  height: 100%;
  display: flex;
  flex-flow: column;
  justify-content: space-between;
  align-items: flex-start;
}

.symbol .code {
  font-weight: bold;
}

.symbol .price {
  font-weight: 100;
  font-size: 4em;
}

.currency:before {
  content: "(";
}
.currency:after {
  content: ")";
}

@media screen and (max-width: #{$md+"px"}) {
  .watch-list-item {
    grid-template-areas: "headline ohlc " ". action";
    grid-template-columns: 2fr 1fr;
    grid-template-rows: auto auto;
  }

  .watch-list-item__ohlc,
  .watch-list-item__action {
    justify-self: end;
  }

  .symbol .price {
    font-size: 3em;
  }
}
</style>
