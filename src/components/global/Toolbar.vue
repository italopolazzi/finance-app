<template>
  <component :is="tag" class="toolbar" :class="classes">
    <slot />
  </component>
</template>

<script>
export default {
  name: "toolbar",
  props: {
    tag: {
      type: String,
      default: "nav",
    },
  },
  computed: {
    classes() {
      return {};
    },
  },
};
</script>

<style lang="scss" scoped>
.toolbar {
  height: var(--toolbar-height);
  width: 100%;
  background: var(--color-light-opacity);
  backdrop-filter: blur(var(--size200));
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>

