<template>
  <div
    class="list-item"
    role="listitem"
    v-on="$listeners"
    v-on:keyup.enter="$listeners.click"
    v-bind="attrs"
  >
    <slot />
  </div>
</template>

<script>
export default {
  name: "list-item",
  computed: {
    attrs() {
      const { tabindex, ...rest } = this.$attrs;

      const isClickable = this.$listeners.click ? "0" : undefined;

      return {
        tabindex: tabindex ? toString(tabindex) : isClickable,
        ...rest,
      };
    },
  },
};
</script>

<style lang="scss" scoped>
[tabindex="0"] {
  cursor: pointer;
}

.list-item:focus,
.list-item:hover {
  background: var(--color-foreground);
}
</style>