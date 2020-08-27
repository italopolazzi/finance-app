<template>
  <div id="app">
    <Toolbar id="nav">
      <ul>
        <li>
          <router-link to="/login">Login</router-link>
        </li>
        <li>
          <router-link to="/dashboard">Dashboard</router-link>
        </li>
      </ul>
    </Toolbar>
    <Container id="main-content">
      <router-view />
    </Container>
  </div>
</template>

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
