<template>
  <div id="app">
    <main-page></main-page>
  </div>
</template>

<script>
  import MainPage from 'components/MainPage'
  import store from 'renderer/vuex/store'

  export default {
    components: {
      MainPage
    },
    store
  }
</script>

<style lang="scss">
  @import "../../../node_modules/bootstrap/scss/bootstrap";

  $fa-font-path: "../../../node_modules/font-awesome/fonts";
  @import "../../../node_modules/font-awesome/scss/font-awesome";

  html, body, #app {
    height: 100%;
    padding: 0;
    margin: 0;
  }
</style>
