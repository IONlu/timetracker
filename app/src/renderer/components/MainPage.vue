<template>
  <div>
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
            <input ref="textInput" type="text" class="form-control" v-model="text" />
          </div>
          <div class="col-4">
            <button class="btn btn-primary btn-block">Breakpoint</button>
          </div>
        </div>
      </form>
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
</template>

<script>
  import Breakpoint from './Breakpoint'
  import moment from 'moment'

  export default {
    name: 'main-page',
    components: { Breakpoint },
    data () {
      return {
        text: '',
        date: moment().startOf('day').valueOf()
      }
    },
    computed: {
      breakpoints () {
        var nextDay = moment(this.date).add(1, 'days').valueOf()
        return this.$store.getters.breakpoints
          .filter(breakpoint => breakpoint.startTime >= this.date && breakpoint.startTime < nextDay)
          .reverse()
      }
    },
    methods: {
      create () {
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
      previousDay () {
        this.date = moment(this.date).add(-1, 'days').valueOf()
      },
      nextDay () {
        this.date = moment(this.date).add(1, 'days').valueOf()
      }
    }
  }
</script>

<style lang="scss" scoped>
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
