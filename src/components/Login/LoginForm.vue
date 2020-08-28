<template>
  <div class="login-form">
    <CustomForm ref="form">
      <fieldset>
        <legend>Login form</legend>

        <div class="custom-form__group">
          <TextInput
            type="email"
            label="e-mail"
            v-model="user.email.value"
            :validate="user.email.validations"
          />
          <TextInput
            label="password"
            type="password"
            v-model="user.password.value"
            :validate="user.password.validations"
          />
        </div>
      </fieldset>

      <div class="custom-form__actions">
        <CustomButton size="small" @click="resetForm">Reset</CustomButton>
        <Spacer />
        <CustomButton @click="login">Log in</CustomButton>
      </div>
    </CustomForm>
  </div>
</template>

<script>
export default {
  name: "login-form",
  data: () => ({
    user: {
      email: {
        value: "",
        validations: [
          (v) => !!v || "Invalid value",
          (v) => v.length > 5 || "Value is too short",
          (v) => v.length < 65 || "Value is too long",
        ],
      },

      password: {
        value: "",
        validations: [
          (v) => !!v || "Invalid value",
          (v) => v.length > 5 || "Value is too short",
          (v) => v.length < 65 || "Value is too long",
        ],
      },
    },
  }),

  methods: {
    resetForm() {
      this.$refs.form.reset();
    },
    login() {
      console.log(this.$refs.form.validate());
      if (this.$refs.form.validate()) {
        this.$store.dispatch("auth/login");
        this.$router.push({ name: "dashboard" });
      }
    },
  },
};
</script>

<style>
</style>