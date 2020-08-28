<template>
  <!-- <div class="dynamic-number"> -->
  <transition name="dynamic" mode="out-in" appear>
    <div class="item-number" :class="classes" :key="number">{{number}}</div>
  </transition>
  <!-- </div> -->
</template>


<script>
export default {
  name: "dynamic-number",

  props: {
    number: {
      type: Number,
      required: true,
    },
  },

  computed: {
    classes(){
      return { positive: this.number > 0, negative: this.number < 0 }
    }
  },

  data: () => ({
    number: 0,
  }),

};
</script>

<style lang="scss" scoped>
.dynamic-enter,
.dynamic-leave-to {
  opacity: 0;
}

.dynamic-enter-to,
.dynamic-leave {
  opacity: 1;
}

.dynamic-enter-active,
.dynamic-leave-active {
  transition: background-color 0.4s linear, opacity 0.25s linear;

  &.positive {
    background-color: var(--color-success);
  }

  &.negative {
    background-color: var(--color-error);
  }
}
</style>