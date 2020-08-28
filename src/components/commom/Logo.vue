<template functional>
  <div class="logo">
    <svg
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      x="0px"
      y="0px"
      viewBox="0 0 300 300"
      style="enable-background:new 0 0 300 300;"
      xml:space="preserve"
    >
      <g id="Camada_1" />
      <g id="aadec279-818b-408a-a9a2-133d1084e5d4">
        <circle class="st0" cx="149.4" cy="149.5" r="110.5" />
        <circle class="st1" cx="149.4" cy="149.5" r="95.1" />
        <path
          class="st2"
          d="M144.8,205.6v-13.8c-7-0.1-14.2-2.6-18.5-6l2.9-9.2c5,3.8,11.1,5.8,17.4,5.9c8.6,0,14.4-5.6,14.4-13.4
		c0-7.5-4.7-12.2-13.6-16.3c-12.3-5.5-19.9-11.8-19.9-23.7c0-11.4,7.1-20,18.2-22.1V93.2h7.5v13.3c5.6,0.1,11,1.7,15.7,4.8l-3,9
		c-4.5-3.1-9.8-4.7-15.2-4.7c-9.3,0-12.8,6.3-12.8,11.8c0,7.1,4.5,10.7,15,15.6c12.4,5.8,18.7,12.9,18.7,25.1
		c0,10.8-6.6,21-19.1,23.3v14.2H144.8z"
        />
      </g>
    </svg>
  </div>
</template>

<script>
export default {
  name: "logo",
};
</script>

<style lang="scss" scoped>
.logo svg {
  width: var(--toolbar-height);
}
.st0 {
  fill: var(--color-dark);
}
.st1 {
  opacity: 0.1;
  enable-background: new;
}
.st2 {
  fill: var(--color-accent);
}
</style>