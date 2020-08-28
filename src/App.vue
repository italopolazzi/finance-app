<template>
  <div id="app">
    <template v-if="haveMessages">
      <Dialog :value="message" :dialog-title="message.text">
        <CustomButton @click="backToDashboard">Back to dashboard</CustomButton>
      </Dialog>
    </template>

    <Toolbar id="nav">
      <ul>
        <li>
          <router-link to="/">Home</router-link>
        </li>
        <li>
          <router-link to="/dashboard">Dashboard</router-link>
        </li>
      </ul>
    </Toolbar>

    <Container>
      <router-view />
    </Container>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "app",

  computed: {
    ...mapState(["globalMessages"]),
    haveMessages() {
      return this.globalMessages.length;
    },
  },
};
</script>

<style lang="scss" scoped>
#nav {
  z-index: 50;
}

#app {
  background-attachment: fixed;
  background-position: center;
  background-repeat: no-repeat;
  min-height: 100vh;
}

#main-content {
  margin-top: var(--toolbar-height);
}
</style>
