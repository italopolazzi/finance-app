<template>
  <div class="container" :class="classes">
    <slot />
  </div>
</template>

<script>
export default {
  name: "Container",
  props: {
    center: {
      type: Boolean,
      required: false,
      default: true,
    },

    full: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  computed: {
    classes() {
      return {
        "container--full": this.full,
        "container--center": this.center,
      };
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  max-width: var(--media-lg);
}
.container--full {
  max-width: 100%;
}
.container--center {
  margin: 0 auto;
}
</style>