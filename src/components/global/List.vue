<template>
  <div class="list" role="list">
    <slot />
  </div>
</template>

<script>
export default {
  name: "list",
  props: {
    tag: {
      type: String,
      required: true,
      validator(v) {
        return ["ul", "ol", "dl"].includes(v);
      },
    },
  },
  computed: {
    classes() {
      return {
        "list--text": this.text,
        "list--small": this.size === "small",
        "list--large": this.size === "large",
      };
    },
  },
};
</script>