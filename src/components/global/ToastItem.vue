<template>
  <div class="toast-item" :type="type" role="alert" aria-atomic="true">{{text}}</div>
</template>

<script>
export default {
  name: "toast-item",
  props: {
    text: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: false,
      default: "info",
    },
  },
};
</script>

<style lang="scss" scoped>
.toast-item {
	padding: var(--size100);
	background: var(--color-dark-opacity);
	-webkit-backdrop-filter: blur(var(--size100));
	backdrop-filter: blur(var(--size100));
	border-radius: var(--size025);
	width: 100%;
	border-left: var(--size100) solid currentColor;
	color: var(--color-light);
}

.toast-item[type="error"] {
  border-left-color: var(--color-error);
}

.toast-item[type="success"] {
  border-left-color: var(--color-success);
}

.toast-item[type="info"] {
  border-left-color: var(--color-accent);
}

[role="alert"]:empty {
  display: none;
}
</style>