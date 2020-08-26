<template>
  <CustomForm>
    <fieldset>
      <legend>Login form</legend>

      <div class="custom-form__group">
        <TextInput label="e-mail" v-model="user.email.value" :validate="user.email.validations" />
        <TextInput
          label="password"
          type="password"
          v-model="user.password.value"
          :validate="user.password.validations"
        />
      </div>
    </fieldset>

    <div class="custom-form__actions">
      <CustomButton size="small">Reset</CustomButton>
      <Spacer />
      <CustomButton>Log in</CustomButton>
    </div>
  </CustomForm>
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
};
</script>

<style>
</style>