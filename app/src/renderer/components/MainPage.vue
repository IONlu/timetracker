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
          <span class="date">{{ formatDate(date) }}</span>
          <span class="fa fa-chevron-circle-right next" @click="nextDay"></span>
        </div>
      </div>
      <div class="container-fluid">
        <form @submit.prevent="create">
          <div class="row">
            <div class="col-8">
              <input ref="textInput" type="text" class="form-control" v-model="text" :disabled="formActive == true ? false : true"/>
            </div>
            <div class="col-4">
              <button class="btn btn-primary btn-block" v-bind:class="{ disabled: !formActive }">Breakpoint</button>
            </div>
          </div>
        </form>
      </div>
    </div>
    <div class="middle">
      <div class="container-fluid">
        <table class="table">
          <breakpoint
            v-for="breakpoint in breakpoints"
            :data="breakpoint"
            @stop="stop(breakpoint)"
            @remove="remove(breakpoint)"
          ></breakpoint>
        </table>
      </div>
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
        date: moment().startOf('day').valueOf(),
        formActive: true
      }
    },
    computed: {
      breakpoints () {
        var nextDay = moment(this.date).add(1, 'days').valueOf()
        return this.$store.getters.breakpoints
          .filter(breakpoint => breakpoint.startTime >= this.date && breakpoint.startTime < nextDay)
          .reverse()
      },
      total () {
        return this.breakpoints.reduce((a, b) => {
          return a + this.workTime(b.startTime, b.stopTime)
        }, 0)
      },
      totalText () {
        return this.formatWorkTime(this.total)
      }
    },
    methods: {
      create () {
        if (this.date !== moment().startOf('day').valueOf()) {
          return
        }
        this.$store.dispatch('createBreakpoint', {
          text: this.text
        })
        this.text = ''
        this.$refs.textInput.focus()
      },
      formatDate (date) {
        return moment(date).format('dddd, MMMM Do YYYY')
      },
      stop (breakpoint) {
        this.$store.dispatch('stopBreakpoint', { breakpoint })
      },
      remove (breakpoint) {
        this.$store.dispatch('removeBreakpoint', { breakpoint })
      },
      todayIsSelected () {
        return this.date === moment().startOf('day').valueOf()
      },
      previousDay () {
        this.date = moment(this.date).add(-1, 'days').valueOf()
        this.formActive = this.todayIsSelected()
      },
      nextDay () {
        this.date = moment(this.date).add(1, 'days').valueOf()
        this.formActive = this.todayIsSelected()
      }
    }
  }
</script>

<style lang="scss" scoped>
  .main-page {
    height: 100%;
    max-height: 100%;
    display: flex;
    flex-direction: column;

    .middle {
      flex-grow: 1
    }
  }

  header {
    padding: 1em 0;
    background-color: #3f51b5;

    h1 {
      text-align: center;
      font-size: 2em;
      margin: 0px;
      color: #FFFFFF;
    }
  }

  footer {
    background-color: #e8eaf6;
    padding: 0.5em 0;
  }

  .btn-primary {
    background-color: #3f51b5;
  }

  .date-selector {
    background-color: #e8eaf6;
    padding: 0.5em 0;

    .container-fluid {
      display: flex;
      line-height: 2em;
      justify-content: space-between;

      .next, .previous {
        font-size: 2em;
        color: #3f51b5;
        cursor: pointer;
      }
    }
  }

  form {
    margin: 1em 0;
  }
</style>
