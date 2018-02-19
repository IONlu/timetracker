<template>
  <div class="time-edit-component" @click.stop="close($event)">
    <div class="card">
      <div class="card-block">
        <p>
          <input
            class="form-control"
            v-model="startTimeString"
            placeholder="Start Time"
          />
          <input
            class="form-control"
            v-model="stopTimeString"
            placeholder="Stop Time"
            :disabled="!stopTime"
          />
        </p>
        <button class="btn btn-primary" @click="save">Save</button>
      </div>
    </div>
  </div>
</template>

<script>
  import moment from 'moment'

  export default {

    data () {
      return {
        startTimeString: null,
        stopTimeString: null
      }
    },

    props: {
      startTime: {
        type: Number,
        required: true
      },
      stopTime: {
        type: Number
      }
    },

    created () {
      this.startTimeString = moment(this.startTime).format('HH:mm')
      if (this.stopTime) {
        this.stopTimeString = moment(this.stopTime).format('HH:mm')
      } else {
        this.stopTimeString = null
      }
    },

    computed: {
      pickerOptions () {
        return {
          step: '00:01'
        }
      }
    },

    methods: {
      save () {
        if (!this.startTimeString.match(/^[0-9]{2}:[0-9]{2}$/) ||
          (this.stopTime && !this.stopTimeString.match(/^[0-9]{2}:[0-9]{2}$/))) {
          return
        }

        var startDate = moment(this.startTime).startOf('day')
        var startTime = this.startTimeString.split(':')
        startDate.add(startTime[0], 'hours')
        startDate.add(startTime[1], 'minutes')

        var stopDate = null
        if (this.stopTime) {
          stopDate = moment(this.startTime).startOf('day')
          var stopTime = this.stopTimeString.split(':')
          stopDate.add(stopTime[0], 'hours')
          stopDate.add(stopTime[1], 'minutes')
        }

        this.$emit('save', {
          startTime: startDate.valueOf(),
          stopTime: stopDate ? stopDate.valueOf() : null
        })
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

    .form-control {
      width: 80px;
      text-align: center;
      display: inline-block;
    }
  }
</style>
