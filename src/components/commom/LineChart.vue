<script>
import { Line, mixins } from "vue-chartjs-financial";

export default {
  name: "line-chart",
  extends: Line,
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