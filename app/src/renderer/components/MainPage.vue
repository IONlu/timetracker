<template>
  <div class="main-page">
    <div class="top">
      <header>
        <div class="container-fluid">
          <h1>Time Tracker</h1>
        </div>
      </header>
      <div class="date-selector">
        <div class="container-fluid">
          <span class="fa fa-chevron-circle-left previous" @click="previousDay"></span>
          <span class="date">{{ dateText }}</span>
          <span class="fa fa-chevron-circle-right next" @click="nextDay"></span>
        </div>
      </div>
      <form @submit.prevent="create" class="new-breakpoint-form">
        <input ref="textInput" type="text" class="form-control" v-model="text" :disabled="!formIsActive" />
        <button type="submit" class="submit-button">
          <span class="fa fa-plus-circle"></span>
        </button>
      </form>
    </div>
    <div class="middle">
      <table class="table">
        <breakpoint
          v-for="breakpoint in breakpoints"
          :data="breakpoint"
          @stop="stop(breakpoint)"
          @remove="remove(breakpoint)"
        ></breakpoint>
      </table>
    </div>
    <div class="bottom">
      <footer>
        <div class="container-fluid">
          Total: {{ totalText }}
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
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../../../node_modules/bootstrap/scss/variables";
  $spacing: $grid-gutter-width-base / 2;

  .main-page {
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

    input {
      flex-grow: 1;
      margin: 0 0 0 $spacing;
    }

    .submit-button {
      border: 0;
      background: none;
      padding: 0 $spacing;
      margin: 0;

      .fa {
        font-size: 2em;
        color: #4caf50;
      }
    }
  }

  header {
    padding: 1em 0;
    background-color: #303f9f;

    h1 {
      text-align: center;
      font-size: 2em;
      margin: 0px;
      color: #FFFFFF;
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
