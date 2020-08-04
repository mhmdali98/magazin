<template>
  <v-content id="pages" :class="$vuetify.theme.dark ? undefined : 'grey lighten-3'">
    <router-view />
  </v-content>
</template>

<script>
export default {
  name: "PagesCoreView",

  data: () => ({
    srcs: {
      "/pages/lock": "lock.jpg",
      "/pages/login": "login.jpg",
      "/pages/pricing": "pricing.jpg",
      "/pages/register": "register.jpg"
    }
  }),

  computed: {
    src() {
      return this.srcs[this.$route.path];
    }
  }
};
</script>

<style lang="sass">
#pages
  > .v-content__wrap > .v-image
    padding-top: 64px
    padding-bottom: 88px

  .v-responsive__sizer
    display: none

  .v-image--md
    padding: 188px 0

  .v-image--sm
    padding: 96px 0 188px 0
</style>
