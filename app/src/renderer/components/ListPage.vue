<template>
  <div class="list-page">
    <div class="top">
      <div class="date-selector">
        <div class="container-fluid">
          <span class="fa fa-chevron-circle-left previous" @click="previousDay"></span>
          <span class="date">{{ dateText }}</span>
          <span class="fa fa-chevron-circle-right next" @click="nextDay"></span>
        </div>
      </div>
      <form @submit.prevent="create" class="new-breakpoint-form">
        <div class="input-container">
          <input ref="textInput" type="text" class="form-control" v-model="text" :disabled="!formIsActive" />
        </div>
        <div class="submit-button-container">
          <button type="submit" class="submit-button">
            <span class="fa fa-plus"></span>
          </button>
        </div>
      </form>
    </div>
    <div class="middle">
      <table class="table">
        <breakpoint
          v-for="(breakpoint, index) in breakpoints"
          :data="breakpoint"
          @stop="stop(breakpoint)"
          @remove="remove(breakpoint)"
          @updateText="updateText(breakpoint, $event)"
          key="index"
        ></breakpoint>
      </table>
    </div>
    <div class="bottom">
      <footer>
        <div class="container-fluid">
          Total: {{ totalText }}
          <button class="btn btn-primary btn-sm" @click="upload">
            Upload
          </button>
        </div>
      </footer>
    </div>
  </div>
</template>

<script>
  import Breakpoint from './Breakpoint'
  import moment from 'moment'
  import worktime from './mixins/worktime'

  export default {
    name: 'main-page',
    mixins: [ worktime ],
    components: { Breakpoint },
    data () {
      return {
        text: '',
        date: null
      }
    },
    created () {
      this.date = this.today
    },
    computed: {
      breakpoints () {
        var nextDay = this.date.clone().add(1, 'days')
        return this.$store.getters.breakpoints
          .filter(breakpoint => moment(breakpoint.startTime).isBetween(this.date, nextDay, 'day', '[)'))
          .reverse()
      },
      total () {
        return this.breakpoints.reduce((a, b) => {
          return a + this.workTime(b.startTime, b.stopTime)
        }, 0)
      },
      totalText () {
        return this.formatWorkTime(this.total)
      },
      formIsActive () {
        return this.todayIsSelected()
      },
      dateText () {
        return this.date.format('dddd, MMMM Do YYYY')
      },
      today () {
        return this.now.clone().startOf('day')
      }
    },
    methods: {
      create () {
        if (!this.todayIsSelected) {
          return
        }
        this.$store.dispatch('createBreakpoint', {
          text: this.text
        })
        this.text = ''
        this.$refs.textInput.focus()
      },
      stop (breakpoint) {
        this.$store.dispatch('stopBreakpoint', { breakpoint })
      },
      remove (breakpoint) {
        this.$store.dispatch('removeBreakpoint', { breakpoint })
      },
      todayIsSelected () {
        return this.date.isSame(this.today, 'day')
      },
      previousDay () {
        this.date = this.date.clone().add(-1, 'days')
      },
      nextDay () {
        this.date = this.date.clone().add(1, 'days')
      },
      updateText (breakpoint, text) {
        this.$store.dispatch('updateBreakpointText', { breakpoint, text })
      },
      upload () {
        this.breakpoints.forEach(breakpoint => {
          if (!breakpoint.stopTime ||
              breakpoint.uploadStatus === 'pending' ||
              breakpoint.uploadStatus === 'success') {
            return
          }
          this.$store.dispatch('uploadBreakpoint', {
            breakpoint,
            workTime: this.workTime(breakpoint.startTime, breakpoint.stopTime)
          })
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../../scss/variables";
  @import "../../../scss/buttons";

  .list-page {
    height: 100%;
    max-height: 100%;
    display: flex;
    flex-direction: column;

    .middle {
      flex-grow: 1;
      overflow: auto;
    }
  }

  .new-breakpoint-form {
    display: flex;

    .input-container {
      flex-grow: 1;
      margin: 0 0 0 $spacing;

      display: flex;
      align-items: center;
      justify-content: center;
    }

    .submit-button-container {
      margin: 0 $spacing;

      .submit-button {
        @include circle-button(#4caf50);
      }
    }
  }

  footer {
    background-color: $gray-lighter;
    padding: 0.5em 0;
  }

  .date-selector {
    background-color: $gray-lighter;
    padding: 0.5em 0;

    .container-fluid {
      display: flex;
      line-height: 2em;
      justify-content: space-between;

      .next, .previous {
        font-size: 2em;
        color:  $gray-light;
        cursor: pointer;
      }
    }
  }

  form {
    margin: 1em 0;
  }
</style>
