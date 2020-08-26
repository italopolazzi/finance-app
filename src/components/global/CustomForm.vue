
<script>
function updateErrorAlerts(vm, input) {
  const { _uid, valid } = input;
  vm.$set(vm.errorAlerts, _uid, valid);
}

function inputValidate(input) {
  updateErrorAlerts(this, input);
}

function inputRegister(input) {
  this.inputs.push(input);
  updateErrorAlerts(this, input);
}

function inputUnregister(input) {
  const { _uid } = input;
  this.inputs.filter((input) => input._uid === _uid);
  this.$delete(this.errorAlerts, _uid);
}

export default {
  name: "custom-form",
  provide() {
    return {
      inputValidate: inputValidate.bind(this),
      inputRegister: inputRegister.bind(this),
      inputUnregister: inputUnregister.bind(this),
    };
  },

  // ---------------------------------------------------
  // data
  // ---------------------------------------------------
  props: {},

  computed: {
    valid() {
      return Object.values(this.errorAlerts).every(Boolean);
    },
    classes() {
      return {
        "custom-form--invalid": !this.valid,
      };
    },
  },

  data: () => ({
    inputs: [],
    errorAlerts: {},
  }),

  // ---------------------------------------------------
  // methods
  // ---------------------------------------------------
  methods: {
    reset() {
      this.inputs.forEach((input) => {
        input.reset();
      });
    },
  },

  // ---------------------------------------------------
  // render
  // ---------------------------------------------------
  render(h) {
    return h(
      "form",
      {
        staticClass: "custom-form",
        class: this.classes,
        on: {
          submit: (event) => this.$emit("submit", event),
        },
      },
      this.$slots.default
    );
  },
};
</script>

<style lang="scss" scoped>
.custom-form {
    display: flex;
    flex-flow: column nowrap;
/*     background: var(--color-background); */
    background: var(--color-background);
    border: solid var(--color-light-opacity);
}

.custom-form .text-input:not(:last-child) {
    margin-bottom: var(--size100);
}

.custom-form legend {
    padding: var(--size100);
    width: 100%;
    background: var(--color-foreground)
}

.custom-form.custom-form--invalid legend {
    background: var(--color-error)
}

.custom-form__group, .custom-form__actions {
    padding: var(--size100);
}

.custom-form__actions {
	display: flex;
	flex-flow: row nowrap;
	justify-content: flex-start;
	align-items: center;
}

.custom-form--invalid {
    animation: shake .25s linear;
    animation-iteration-count: 3;
    will-change: transform;
    transform: translateX(0);
}
</style>