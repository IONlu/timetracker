<template>
  <tr>
    <td class="time">
      <div class="billingTime">
        {{ timeText }}
      </div>
      <div class="realTime">
        {{ startText }}-{{ stopText }}
      </div>
    </td>
    <td class="text">{{ data.text }}</td>
    <td>
      <span v-if="hasStopButton" class="action fa fa-stop" @click="stop"></span>
      <span v-if="hasDeleteButton" class="action fa fa-trash-o" @click="remove"></span>
    </td>
  </tr>
</template>

<script>
  import worktime from './mixins/worktime'
  import moment from 'moment'

  export default {

    mixins: [ worktime ],

    props: {
      data: {
        type: Object,
        required: true
      }
    },

    computed: {
      timeText () {
        const workTime = this.workTime(this.data.startTime, this.data.stopTime)
        return this.formatWorkTime(workTime)
      },
      hasStopButton () {
        return !this.data.stopTime
      },
      hasDeleteButton () {
        return !this.hasStopButton
      },
      startText () {
        return moment(this.data.startTime).format('HH:mm')
      },
      stopText () {
        return moment(this.data.stopTime || this.now.valueOf()).format('HH:mm')
      }
    },

    methods: {
      stop () {
        this.$emit('stop')
      },
      remove () {
        this.$emit('remove')
      }
    }

  }
</script>

<style scoped>
  td {
    white-space: nowrap;
  }
  td.text {
    width: 100%;
  }
  td.time {
    padding: 4px 12px;
  }
  .action {
    cursor: pointer;
  }
  .action.fa-stop {
    color: #900;
  }
  .billingTime {
    font-size: 1.4em
  }
  .realTime {
    margin-top: -0.4em;
    color: rgba(0,0,0,0.7);
    font-size: 0.6em;
  }
</style>
