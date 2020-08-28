<template>
  <div id="toasts">
    <transition-group name="toast" appear mode="out-in">
      <ToastItem
        v-for="(toast, toastIndex) in toasts"
        :key="toastIndex"
        :text="toast.text"
        :type="toast.type"
      />
    </transition-group>
  </div>
</template>

<script>
export default {
  name: "toasts",

  props: {
    value: {
      type: Array,
      required: true,
    },
  },

  watch: {
    value: {
      immediate: true,
      handler(v) {
        this.toasts = v;
      },
    },
  },
};
</script>

<style lang="scss" scoped>
#toasts {
  position: fixed;
  right: var(--size100);
  top: var(--size100);
  display: flex;
  flex-direction: column;
  width: auto;
  z-index: 100;
}

#toasts .toast-item:not(:first-child) {
  margin-top: var(--size100);
}

.toast-enter,
.toast-leave-to {
  opacity: 0;
  transform: translateX(100%);
  will-change: transform;
}
.toast-leave,
.toast-enter-to {
  opacity: 1;
  transform: translateX(0);
}

.toast-enter-active,
.toast-leave-active {
  transition: all 0.25s ease;
}

</style>