<template>
  <component :is="tag" class="button" v-on="$listeners" v-bind="$attrs" :class="classes">
    <slot />
  </component>
</template>

<script>
export default {
  name: "Button",
  props: {
    href: {
      type: String,
      required: false,
    },
  },
  computed: {
    tag() {
      return this.href ? "a" : "button";
    },
    classes() {
      return {};
    },
  },
};
</script>

<style lang="scss" scoped>
.button {
  background: transparent;
  border: solid var(--color-text);
  color: var(--color-text);
  padding: 1em 2em;
  margin: var(--size025);
  text-transform: uppercase;
  font-weight: bolder;
  border-radius: var(--super-round);
}
</style>