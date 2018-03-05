<template>
  <tr :class="mainClasses">
    <td class="time" @click="editTime">
      <div>
        <div class="billingTime">
          {{ timeText }}
        </div>
        <div class="realTime">
          {{ startText }}-{{ stopText }}
        </div>
      </div>
      <time-edit
        v-if="isEditTime"
        @close="closeEditTime"
        @save="updateTime"
        :startTime="data.startTime"
        :stopTime="data.stopTime"
      ></time-edit>
    </td>
    <td class="text">
      <input
        v-if="isEditText"
        class="form-control"
        :value="data.text"
        ref="editTextInput"
        @blur="closeEditText"
        @keyup.enter="closeEditText"
        @input="updateText($event.target.value)"
      />
      <div
        v-else
        @click="editText"
      >{{ data.text }}</div>
    </td>
    <td class="action">
      <span v-if="data.uploadStatus == 'success'" class="uploadStatus fa fa-check fa-2x check-action"></span>
      <span v-if="data.uploadStatus == 'pending'" class="uploadStatus fa fa-spinner fa-pulse fa-2x fa-fw"></span>
      <template v-if="!isLocked">
        <button v-if="isActive" @click="stop" class="stop-action">
          <span class="fa fa-stop"></span>
        </button>
        <button v-else @click="restart" class="start-action">
          <span class="fa fa-play"></span>
        </button>
        <button v-if="isActive" @click="remove" class="remove-action">
          <span class="fa fa-trash"></span>
        </button>
      </template>
    </td>
  </tr>
</template>

<script>
  import TimeEdit from './TimeEdit'
  import worktime from './mixins/worktime'
  import moment from 'moment'

  export default {

    mixins: [ worktime ],

    components: { TimeEdit },

    props: {
      data: {
        type: Object,
        required: true
      }
    },

    data () {
      return {
        isEditText: false,
        isEditTime: false
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
      isLocked () {
        return this.data.uploadStatus === 'pending' || this.data.uploadStatus === 'success'
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
      restart () {
        this.$emit('restart')
        this.active = this.isActive
      },
      remove () {
        if (this.isLocked) {
          return
        }
        this.$emit('remove')
      },
      editText () {
        if (this.isLocked) {
          return
        }
        this.isEditText = true
        this.$nextTick(() => {
          this.$refs.editTextInput.focus()
        })
      },
      closeEditText () {
        this.isEditText = false
      },
      updateText (value) {
        if (value) {
          this.$emit('updateText', value)
        }
      },
      editTime () {
        if (this.isLocked) {
          return
        }
        this.isEditTime = true
      },
      closeEditTime () {
        this.isEditTime = false
      },
      updateTime (value) {
        this.closeEditTime()
        this.$emit('updateTime', value)
      }
    }

  }
</script>

<style lang="scss" scoped>
  @import "../scss/variables";
  @import "../scss/buttons";

  td {
    vertical-align: middle !important;
  }

  td.text {
    width: 100%;
  }

  td.time {
    background-color: $gray-600;
    color: #FFFFFF;
    width: 10%;
    height: 5em;
    padding: 0 $spacing;
    text-align: center;

    cursor: pointer;
  }

  td.action {
    padding-top: 15px ;
    display: flex;
  }

  tr.active > td.time {
    background-color: #4caf50;
  }

  .action {
    .remove-action {
      @include circle-button($gray-600);
    }
    .check-action {
      margin-left: 8px;
    }
    .stop-action {
      @include circle-button(#900);
      margin-right: 10px;
    }
    .start-action {
      @include circle-button(#4caf50);
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
