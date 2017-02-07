<template>
  <tr :class="mainClasses">
    <td class="time">
      <div>
        <div class="billingTime">
          {{ timeText }}
        </div>
        <div class="realTime">
          {{ startText }}-{{ stopText }}
        </div>
      </div>
    </td>
    <td class="text">{{ data.text }}</td>
    <td class="action">
      <span v-if="isActive" class="fa fa-stop-circle" @click="stop"></span>
      <span v-if="!isActive" class="fa fa-trash-o" @click="remove"></span>
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
      startText () {
        return moment(this.data.startTime).format('HH:mm')
      },
      stopText () {
        return moment(this.data.stopTime || this.now.valueOf()).format('HH:mm')
      },
      isActive () {
        return !this.data.stopTime
      },
      mainClasses () {
        return {
          active: this.isActive
        }
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

<style lang="scss" scoped>
  @import "../../../../node_modules/bootstrap/scss/variables";
  $spacing: $grid-gutter-width-base / 2;

  td {
    white-space: nowrap;
    vertical-align: middle;
  }

  td.text {
    width: 100%;
  }

  td.time {
    background-color: $gray-light;
    color: #FFFFFF;
    vertical-align: middle;

    height: 5em;
    padding: 0 $spacing;
    text-align: center;
  }

  .active td.time {
    background-color: #4caf50;
  }

  .action {
    span {
      cursor: pointer;
      font-size: 2em;
    }

    .fa-stop-circle {
      color: #900;
    }
  }

  .billingTime {
    font-size: 1.5em;
    font-weight: bold;
  }

  .realTime {
    color: rgba(255,255,255,0.7);
    font-size: 0.7em;
  }
</style>
