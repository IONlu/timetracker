<template>
  <div id="app">
    <header>
      <div class="container-fluid">
        <h1>Time Tracker</h1>
      </div>
    </header>
    <router-view></router-view>
  </div>
</template>

<script>
  import VueRouter from 'vue-router'
  import routes from './routes'
  import store from 'renderer/vuex/store'

  const router = new VueRouter({ routes })

  export default {
    router,
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

  header {
    padding: 1em 0;
    background-color: #303f9f;

    h1 {
      text-align: center;
      font-size: 2em;
      margin: 0px;
      color: #FFFFFF;
    }
  }
</style>
