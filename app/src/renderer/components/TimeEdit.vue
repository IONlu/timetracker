<template>
  <div class="time-edit-component" @click.stop="close($event)">
    <div class="card">
      <div class="card-block">
        <p>
          <el-time-picker
            is-range
            v-model="value"
            placeholder="Pick a time range"
            format="HH:mm"
            :clearable="false"
          >
          </el-time-picker>
        </p>
        <button class="btn btn-primary" @click="save">Save</button>
      </div>
    </div>
  </div>
</template>

<script>
  export default {

    data () {
      return {
        value: null
      }
    },

    props: {
      data: {
        type: Object,
        required: true
      }
    },

    created () {
      this.value = []
      this.value.push(new Date(this.data.startTime))
      if (this.data.stopTime) {
        this.value.push(new Date(this.data.stopTime))
      }
    },

    methods: {
      save () {
        this.$emit('save', this.value)
      },
      close (ev) {
        if (ev.target === this.$el) {
          this.$emit('close')
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .time-edit-component {
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 999;
    width: 100%;
    height: 100%;
    top: 0px;
    left: 0px;
    background-color: rgba(0, 0, 0, 0.5);
    cursor: pointer;

    .card {
      cursor: auto;
    }
  }
</style>
