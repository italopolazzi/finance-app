<template>
  <div id="app" class="dark">
    <template v-if="haveMessages">
      <Toasts v-model="globalMessages" />
    </template>

    <Toolbar id="nav">
      <div class="toolbar-item">
        <Logo />
        <div class="toolbar-title">
          <h1>FinanceApp</h1>
          <p>Stock trader market updates</p>
        </div>
      </div>

      <ul class="toolbar-item">
        <li>
          <router-link to="/dashboard">
            <CustomButton color="light">Dashboard</CustomButton>
          </router-link>
        </li>

        <li>
          <router-link to="/">
            <CustomButton color="light">Login</CustomButton>
          </router-link>
        </li>
      </ul>

      <!-- <div class="toolbar-item">
        <CustomButton color="light">Dark</CustomButton>
      </div>-->
    </Toolbar>

    <transition appear mode="out-in" :name="pageTransitionName">
      <Container id="main-content" :key="$route.path">
        <router-view />
      </Container>
    </transition>
  </div>
</template>

<script>
import Logo from "@/components/commom/Logo.vue";

import { mapState } from "vuex";

export default {
  name: "app",

  components: {
    Logo,
  },

  data: () => ({
    pageTransitionName: null,
  }),

  computed: {
    ...mapState(["globalMessages"]),
    haveMessages() {
      return this.globalMessages.length;
    },
  },

  methods: {
    setRandomPageTransitionName() {
      const transitions = ["slide", "edils"];
      const random = Math.round(Math.random());
      console.log(random);
      this.pageTransitionName = transitions[random];
    },
  },

  watch: {
    ["$route.path"]: {
      immediate: true,
      handler() {
        this.setRandomPageTransitionName();
      },
    },
  },
};
</script>

<style lang="scss" scoped>
.toolbar-item {
  display: flex;
  align-items: center;
  justify-content: center;
}

.toolbar-title h1 {
  font-weight: 100;
}

.toolbar-title p {
  font-size: var(--text-caption);
  margin-top: var(--size025);
  font-weight: normal;
  color: var(--color-accent);
}

#nav {
  z-index: 50;
}

#app {
  background-attachment: fixed;
  background-position: center;
  background-repeat: no-repeat;
  // min-height: 100vh;
}

#main-content {
  margin-top: var(--toolbar-height);
}
</style>
