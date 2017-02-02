<template>
  <tr>
    <td>{{ timeText }}</td>
    <td class="text">{{ data.text }}</td>
    <td>
      <span v-if="hasStopButton" class="action fa fa-stop" @click="stop"></span>
      <span v-if="hasDeleteButton" class="action fa fa-trash-o" @click="remove"></span>
    </td>
  </tr>
</template>

<script>
  import worktime from './mixins/worktime'

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

  .action {
    cursor: pointer;
  }

  .action.fa-stop {
    color: #900;
  }
</style>
