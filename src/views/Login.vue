<template>
  <div class="login-page">
    <div class="image">
      <img src="/img/login-page-illustration.svg" />
    </div>
    <LoginForm />
  </div>
</template>

<script>
import LoginForm from "@/components/Login/LoginForm.vue";

export default {
  name: "login-page",
  components: { LoginForm },
};
</script>

<style lang="scss" scoped>
.login-page {
  display: grid;
  grid-template-areas: "image form";
  grid-template-columns: 1fr 1fr;
  grid-template-rows: auto;
  justify-items: center;
  align-items: center;
  min-height: calc(100vh - var(--toolbar-height));
}

.image img {
  width: 100%;
}
.image {
  width: 100%;
  height: auto;
  object-fit: cover;
  grid-area: image;
}
.login-form {
  grid-area: form;
}

@media screen and (max-width: #{$md+"px"}) {
  .image {
    display: none;
  }
  .login-page {
    grid-template-areas: "image" "form";
    grid-template-columns: 1fr;
    justify-items: center;
  }
  .image {
    width: 200px;
  }
}
</style>
