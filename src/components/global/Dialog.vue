<template>
  <div class="dialog">
    <slot name="activator" :open="dialogListeners.open" />

    <!-- dialog-wrapper -->
    <div v-if="isOpen" :id="dialogId" class="dialog-wrapper">
      <div role="dialog" aria-labelledby="dialog-title" aria-describedby="dialog-desc">
        <Container>
          <slot name="desactivator" :close="dialogListeners.close" />

          <div v-if="dialogTitle" id="dialog-title">{{dialogTitle}}</div>
          <div v-if="dialogDesc" id="dialog-desc">{{dialogDesc}}</div>

          <slot />
        </Container>
      </div>
    </div>
    <!-- dialog-wrapper -->
  </div>
</template>

<script>
import Focusable from "@/mixins/Focusable.js";

export default {
  // ---------------------------------------------------
  // config
  // ---------------------------------------------------
  name: "Dialog",
  mixins: [Focusable],
  props: {
    value: {
      type: Boolean,
      required: true,
      default: false,
    },
    dialogTitle: {
      type: String,
      required: false,
    },
    dialogDesc: {
      type: String,
      required: false,
    },
  },

  // ---------------------------------------------------
  // data
  // ---------------------------------------------------
  computed: {
    dialogListeners() {
      const openListeners = {
        click: (event) => this.handleOpen(event),
      };
      const closeListeners = {
        click: (event) => this.handleClose(event),
      };
      return {
        open: openListeners,
        close: closeListeners,
      };
    },

    dialogId() {
      return `dialog-${this._uid}`;
    },

    isOpen: {
      get() {
        return this.value;
      },
      set(boolean) {
        this.$emit("input", boolean);
      },
    },
  },

  data: () => ({
    activatorElement: null,
    focusableChildrenList: [],
  }),

  // ---------------------------------------------------
  // watchers
  // ---------------------------------------------------

  watch: {
    isOpen: {
      async handler(isOpenNew) {
        this.alternateHasDialog();

        if (isOpenNew) {
          await this.$nextTick();
          this.focusFirstChild();
        }
      },
      immediate: true,
    },
  },

  // ---------------------------------------------------
  // hooks
  // ---------------------------------------------------
  mounted() {
    if (window) window.addEventListener("keydown", this.handleKeyDown);
  },

  updated() {
    this.updateFocusabledChildrenList();
  },

  beforeDestroy() {
    if (window) window.removeEventListener("keydown", this.handleKeyDown);
  },

  destroyed(){
    document.documentElement.classList.remove("has-dialog")
  },

  // ---------------------------------------------------
  // methods
  // ---------------------------------------------------
  methods: {
    handleOpen(event) {
      this.activatorElement = event.target;
      this.isOpen = true;
    },

    handleClose() {
      if (this.activatorElement) this.activatorElement.focus();
      this.isOpen = false;
    },

    handleKeyDown(event) {
      const { key, shiftKey } = event;
      const isTabPressed = key === "Tab";

      if (!isTabPressed) {
        return;
      }

      if (shiftKey && document.activeElement === this.getFirstFocusabled()) {
        this.focusLastChild();
        event.preventDefault();
      } else if (document.activeElement === this.getLastFocusabled()) {
        this.focusFirstChild();
        event.preventDefault();
      }
    },

    getFirstFocusabled() {
      return this.focusableChildrenList.slice().shift();
    },

    getLastFocusabled() {
      return this.focusableChildrenList.slice().pop();
    },

    focusFirstChild() {
      const firstFocusable = this.getFirstFocusabled();
      if (firstFocusable) firstFocusable.focus();
    },

    focusLastChild() {
      const lastFocusabled = this.getLastFocusabled();
      if (lastFocusabled) lastFocusabled.focus();
    },

    alternateHasDialog() {
      this.isOpen
        ? document.documentElement.classList.add("has-dialog")
        : document.documentElement.classList.remove("has-dialog");
    },

    updateFocusabledChildrenList() {
      const dialogElement = document.getElementById(this.dialogId);
      if (dialogElement) {
        this.focusableChildrenList = this.findFocusableChildren(dialogElement);
      }
    },
  },
};
</script>


<style lang="scss" scoped>
[role="dialog"] {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  height: 100%;
  width: 100%;
  background: var(--color-dark-opacity);
  overflow-y: auto;
}

.dialog-wrapper {
  z-index: 100;
  position: relative;
}
</style>