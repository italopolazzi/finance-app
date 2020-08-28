<template>
  <div class="push-pop-watch-list-button" :title="action.title">
    <CustomButton @click="action.method(companyCode)" color="dark">{{action.label}}</CustomButton>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "push-pop-watch-list-button",

  props: {
    companyCode: {
      type: String,
      required: true,
    },
  },

  computed: {
    ...mapGetters("user", ["isCompanyWatched"]),
    action() {
      const { isCompanyWatched, companyCode, remove, add } = this;
      if (isCompanyWatched(companyCode)) {
        return {
          method: remove,
          label: "Remove",
          title: `Remove ${companyCode} from your WatchList`,
        };
      }
      return {
        method: add,
        label: "Watch",
        title: `Add ${companyCode} to your WatchList`,
      };
    },
  },

  methods: {
    ...mapActions("user", {
      remove: "removeCompanyFromWatchList",
      add: "addCompanyToWatchList",
    }),
  },
};
</script>

<style>
</style>