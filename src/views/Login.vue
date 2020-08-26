<template>
  <div class="login-page">
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
