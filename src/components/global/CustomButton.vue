<template>
  <component :is="tag" class="button" v-on="$listeners" v-bind="$attrs" :class="classes">
    <slot />
  </component>
</template>

<script>
export default {
  name: "custom-button",
  props: {
    href: {
      type: String,
      required: false,
    },

    size: {
      type: String,
      required: false,
      validator(v) {
        return ["small", "large"].includes(v);
      },
    },
  },
  computed: {
    tag() {
      return this.href ? "a" : "button";
    },
    classes() {
      return {
        "button--text": this.text,
        "button--small": this.size === "small",
        "button--large": this.size === "large",
      };
    },
  },
};
</script>

<style lang="scss" scoped>
.button {
  background: var(--color-light-opacity);
  border: solid transparent;
  color: var(--color-accent);
  padding: var(--size050) var(--size075);
  margin: var(--size025);
  text-transform: uppercase;
  font-weight: bolder;
  border-radius: var(--size050);
}

.button {
  font-size: var(--text-sm);
}

.button--small {
  font-size: var(--text-caption);
}

.button--large {
  font-size: var(--text-lg);
}

.button--text {
  border: none;
  padding: var(--size100);
}

.button:hover,
.button:focus {
  border: solid var(--color-accent);
}
</style>