<template>
  <div class="settings-page">
    <div class="container-fluid">
      <ul class="nav nav-tabs">
        <li class="nav-item" v-for="tab in tabs">
          <a :class="tabClasses(tab)" @click="selectTab(tab)">{{ tab.label }}</a>
        </li>
      </ul>
      <div class="tab-content">
        <div class="tab-pane active">
          <div class="form-group row" v-for="field in activeTab.fields">
            <label class="col-sm-4 col-form-label">{{ field.label }}</label>
            <div class="col-sm-8">
              <input
                :type="field.type"
                class="form-control"
                :value="setting(field.name)"
                @input="updateSetting(field.name, $event.target.value)"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  @import "../../../scss/variables";

  .container-fluid {
    padding: $spacing;
  }

  .nav-tabs {
    margin-bottom: 1rem;
  }
</style>

<script>
  export default {
    data () {
      return {
        activeTab: null,
        tabs: [
          {
            label: 'General',
            fields: [
              {
                label: 'Time Precision',
                name: 'timePrecision',
                type: 'number'
              }
            ]
          },
          {
            label: 'Wisol',
            fields: [
              {
                label: 'Server Url',
                name: 'wisolServerUrl',
                type: 'text'
              },
              {
                label: 'Device Key',
                name: 'wisolDeviceKey',
                type: 'text'
              },
              {
                label: 'Username',
                name: 'wisolUsername',
                type: 'text'
              },
              {
                label: 'Password',
                name: 'wisolPassword',
                type: 'password'
              },
              {
                label: 'Vendeur',
                name: 'wisolVendeur',
                type: 'text'
              }
            ]
          },
          {
            label: 'API',
            fields: [
              {
                label: 'Port',
                name: 'apiPort',
                type: 'text'
              }
            ]
          }
        ]
      }
    },

    beforeMount () {
      if (this.tabs.length > 0) {
        this.activeTab = this.tabs[0]
      }
    },

    methods: {
      setting (name) {
        return this.$store.getters.setting(name)
      },

      tabClasses (tab) {
        return {
          'nav-link': true,
          'active': tab === this.activeTab
        }
      },

      selectTab (tab) {
        this.activeTab = tab
      },

      updateSetting (name, value) {
        this.$store.dispatch('updateSetting', { name, value })
      }
    }
  }
</script>
