<template>
  <div class="list" role="list">
    <ListItem v-for="(item, itemIndex) in items" :key="itemIndex">
      <slot name="item" :data="item" />
    </ListItem>
  </div>
</template>

<script>
export default {
  name: "list",
  props: {
    tag: {
      type: String,
      required: false,
      default: "ul",
      validator(v) {
        return ["ul", "ol", "dl"].includes(v);
      },
    },
    items: {
      type: Array,
      required: true,
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