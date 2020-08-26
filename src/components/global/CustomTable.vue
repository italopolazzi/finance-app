<template>
  <div class="custom-table" :class="classes">
    <table>
      <caption v-if="caption">{{caption}}</caption>

      <thead>
        <tr>
          <th :key="key" v-for="key in Object.keys(keysItems)">{{ keysItems[key] }}</th>
        </tr>
      </thead>

      <tbody>
        <tr
          :key="itemIndex"
          v-for="(item, itemIndex) in items"
          @click="rowActionClickEmit(item)"
          @keyup.enter="rowActionClickEmit(item)"
          :tabindex="rowTabIndex"
        >
          <td :key="index" v-for="(getValue, index) in values">{{getValue(item)}}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: "custom-table",
  props: {
    keysItems: {
      type: Object,
      required: true,
    },

    caption: {
      type: String,
      required: false,
    },

    items: {
      type: Array,
      required: true,
    },
  },

  computed: {
    values() {
      return Object.keys(this.keysItems).map((key) => (item) => item[key]);
    },
    rowActions() {
      return !!this.$listeners.rowActionClick;
    },
    rowTabIndex() {
      return this.rowActions ? 0 : undefined;
    },
    classes() {
      return {
        "custom-table--row-actions": this.rowActions,
      };
    },
  },

  methods: {
    rowActionClickEmit(item) {
      this.$emit("rowActionClick", item);
    },
  },
};
</script>

<style lang="scss" scoped>
* {
  transition: all 0.3s ease-in-out;
}

.custom-table {
  width: auto;
  overflow-x: auto;
}

.custom-table--row-actions tbody tr {
  cursor: pointer;
}

.custom-table table {
  width: 100%;
}

table {
  display: table;
  background: var(--color-background);
  color: var(--color-light);
  padding: var(--size100);
  border-collapse: separate;
  border-spacing: 0 var(--size100);
  overflow: hidden;
  border-radius: var(--size100) !important;
  border: solid var(--color-light-opacity);
  user-select: none;
  position: relative;
}

table thead {
  background: var(--color-light-opacity);
  padding: 20px;
}

table th {
  font-weight: bold;
  color: var(--color-accent);
}

table td,
table th {
  padding: var(--size100);
  border: solid transparent;
}

th,
td {
  vertical-align: middle;
}

table tr td:first-child {
  font-weight: bold;
  color: var(--color-accent);
}

table tr:hover {
  background: var(--color-dark) !important;
}

table td:hover {
  border: solid var(--color-accent);
  box-shadow: var(--size025) var(--size025) 0 var(--color-accent);
}

table tr:nth-child(even) {
  background: var(--color-light-opacity);
}
</style>