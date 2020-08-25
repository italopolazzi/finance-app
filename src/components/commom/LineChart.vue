<script>
import { Line, mixins } from "vue-chartjs-financial";

export default {
  name: "LineChart",
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
</script>script