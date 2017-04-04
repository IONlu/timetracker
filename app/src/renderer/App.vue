<template>
  <div id="app">
    <header>
      <div class="container-fluid">
        <h1>Time Tracker</h1>
        <div class="page-icons">
          <a :href="pageIcon.href" v-for="pageIcon in pageIconsToShow">
            <span :class="pageIcon.iconClasses"></span>
          </a>
        </div>
      </div>
    </header>
    <div class="app-content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
  import VueRouter from 'vue-router'
  import routes from './routes'
  import store from 'renderer/vuex/store'
  import menu from './menu'
  import { remote } from 'electron'
  import 'element-ui/lib/theme-default/index.css'

  remote.Menu.setApplicationMenu(menu)

  const router = new VueRouter({ routes })

  export default {
    router,
    store,

    data () {
      return {
        pageIcons: [
          {
            href: '#/list',
            iconClasses: [ 'fa', 'fa-list' ],
            routes: [ 'settings' ]
          },
          {
            href: '#/settings',
            iconClasses: [ 'fa', 'fa-wrench' ],
            routes: [ 'list' ]
          }
        ]
      }
    },

    computed: {
      pageIconsToShow () {
        return this.pageIcons.filter(pageIcon => {
          return pageIcon.routes.indexOf(this.$route.name) > -1
        })
      }
    }
  }
</script>

<style lang="scss">
  @import "../../scss/variables";
  @import "../../node_modules/bootstrap/scss/bootstrap";

  $fa-font-path: "../../node_modules/font-awesome/fonts";
  @import "../../node_modules/font-awesome/scss/font-awesome";

  html, body, #app {
    height: 100%;
    padding: 0;
    margin: 0;
  }

  #app {
    height: 100%;
    max-height: 100%;
    display: flex;
    flex-direction: column;

    header {
      background-color: #303f9f;
      color: #FFFFFF;
      font-size: 2em;

      .container-fluid {
        padding: $spacing;
        display: flex;
        justify-content: space-between;

        h1 {
          margin: 0px;
        }

        .page-icons {
          a {
            color: #FFFFFF;
          }
        }
      }
    }

    .app-content {
      flex-grow: 1;
      overflow: auto;
      height: 100%;
    }
  }
</style>
