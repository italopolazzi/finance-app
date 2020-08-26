<script>
export default {
  name: "spacer",
  functional: true,
  render(h) {
    return h("div", { staticClass: "spacer" });
  },
};
</script>

<style lang="scss" scoped>
.spacer {
  flex-grow: 1;
}
</style>

