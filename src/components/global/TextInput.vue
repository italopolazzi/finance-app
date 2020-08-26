<script>
function runValidateTests() {
  const { validate, value, errorMessage } = this;

  const returnPassed = () => {
    return {
      valid: true,
      message: null,
    };
  };

  if (!validate.length) return returnPassed();

  const results = [...validate].map((validator) => validator(value));

  const errors = results.filter(
    (value) => value === false || typeof value === "string"
  );

  if (errors.length) {
    return {
      valid: errors.length === 0,
      message:
        errors.find((value) => typeof value === "string") || errorMessage,
    };
  }

  return returnPassed();
}

function getChildren() {
  const getLabel = () => {
    return (
      this.label &&
      this.$createElement(
        "label",
        {
          staticClass: "text-input__label",
          attrs: { for: this.internalId },
        },
        this.label
      )
    );
  };

  const getInput = () => {
    const customListeners = {
      input: (event) => this.$emit("input", event.target.value),
    };
    const inputListeners = Object.assign({}, this.$listeners, customListeners);
    return this.$createElement("input", {
      staticClass: "text-input__input",
      attrs: { id: this.internalId, type: this.type },
      domProps: { value: this.value },
      on: inputListeners,
    });
  };

  const getMessage = () => {
    return (
      this.message &&
      this.$createElement("span", {
        staticClass: "text-input__message",
        attrs: { "aria-live": this.ariaLive },
        domProps: { innerText: this.message },
      })
    );
  };

  return [getLabel(), getInput(), getMessage()];
}

export default {
  name: "text-input",
  inject: ["inputValidate", "inputRegister", "inputUnregister"],

  // ---------------------------------------------------
  // data
  // ---------------------------------------------------
  props: {
    id: String,

    value: String,

    errorMessage: {
      type: String,
      default: "Invalid value",
    },

    validate: {
      type: Array,
      required: false,
      default: () => [],
      validator(value) {
        return (
          Array.isArray(value) &&
          value.every((item) => typeof item === "function")
        );
      },
    },

    label: {
      type: String,
      required: false,
    },

    type: {
      type: String,
      required: false,
      default: "text",
    },
  },

  computed: {
    internalId() {
      return this.id || `input-${this._uid}`;
    },
  },

  data: () => ({
    message: null,
    valid: false,
  }),

  // ---------------------------------------------------
  // hoooks
  // ---------------------------------------------------
  created() {
    this.inputRegister(this);
  },
  beforeDestroy() {
    this.inputUnregister(this);
  },

  // ---------------------------------------------------
  // methods
  // ---------------------------------------------------
  methods: {
    reset() {
      this.$emit("input", "");
    },
  },

  // ---------------------------------------------------
  // watchers
  // ---------------------------------------------------
  watch: {
    value: {
      handler() {
        const { valid, message } = runValidateTests.call(this);
        this.valid = valid;
        this.message = message;
        this.inputValidate(this);
      },
      immediate: false,
    },
  },

  // ---------------------------------------------------
  // render
  // ---------------------------------------------------
  render(h) {
    return h(
      "div",
      {
        staticClass: "text-input",
      },
      getChildren.call(this)
    );
  },
};
</script>

<style lang="scss" scoped>
.text-input {
    display: flex;
    flex-flow: column nowrap;
}

.text-input>input {
    padding: var(--size075) var(--size100);
    font-size: var(--size100);
    background: var(--color-light-opacity);
    color: inherit;
    border-radius: var(--size025);
    border: none;
}

.text-input>* {
    margin-bottom: var(--size050);
}

.text-input__message {
    color: var(--color-error);
    font-size: var(--text-caption);
    display: inline-block;
    align-self: baseline;
    padding: var(--size025) var(--size050);
    border-radius: var(--super-round);
    font-weight: bold;
    border: solid var(--color-error);
}
</style>