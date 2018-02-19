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
  export default {
    name: 'timetracker',
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
@import "./scss/variables";
@import "~bootstrap/scss/bootstrap";

$fa-font-path: "../../node_modules/font-awesome/fonts";
@import "~font-awesome/scss/font-awesome";

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
