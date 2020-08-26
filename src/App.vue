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
    <Container>
      <router-view />
    </Container>
  </div>
</template>
