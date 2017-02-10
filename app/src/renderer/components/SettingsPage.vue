<template>
  <div class="settings-page">
    <div class="container-fluid">
      <div class="form-group row" v-for="field in fields">
        <label class="col-sm-4 col-form-label">{{ field.label }}</label>
        <div class="col-sm-8">
          <input :type="field.type" class="form-control" />
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
</style>

<script>
  export default {
    data () {
      return {
        fields: [
          {
            label: 'Time Precision',
            name: 'timePrecision',
            type: 'number'
          }
        ]
      }
    }
  }
</script>
