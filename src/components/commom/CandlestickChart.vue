<script>
import { Candlestick, mixins } from "vue-chartjs-financial";

export default {
  name: "candlestick-chart",
  extends: Candlestick,
  mixins: [mixins.reactiveProp],
  props: {
    chartData: Object,
    options: Object,
  },
  mounted() {
    this.renderChart(this.chartData, this.options);
  },
};
</script>