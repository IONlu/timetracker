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
  import moment from 'moment'

  export default {

    props: {
      data: {
        type: Object,
        required: true
      }
    },

    data () {
      return {
        now: moment(),
        multipleOf: 15
      }
    },

    created () {
      this.$timer = setInterval(() => {
        this.now = moment()
      }, 1000)
    },

    beforeDestroy () {
      clearTimeout(this.$timer)
    },

    computed: {
      timeText () {
        const time = (this.data.stopTime || this.now.valueOf()) - this.data.startTime
        const totalMinutes = Math.max(1, Math.ceil(time / (this.multipleOf * 1000 * 60))) * this.multipleOf
        const minutes = totalMinutes % 60
        const hours = Math.ceil(totalMinutes / 60)

        const pad = number => {
          const numberText = number + ''
          return numberText.length === 1
            ? '0' + numberText
            : numberText
        }

        return pad(hours) + ':' + pad(minutes)
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
