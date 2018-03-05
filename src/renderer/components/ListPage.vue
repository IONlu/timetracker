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
          <autocomplete
            :items="clients"
            ref="textInput"
            type="text"
            :textsync.sync="text"
            :disabled="!formIsActive"
            class="input-container"
            @inputtext="inputText($event)"
          />
        <div class="submit-button-container">
          <button type="submit" class="submit-button">
            <span class="fa fa-plus"></span>
          </button>
          <button
          @click="createTel"
          class=" tel-button">
            <span class="fa fa-phone"></span>
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
          @restart="restart(breakpoint)"
          @remove="remove(breakpoint)"
          @updateText="updateText(breakpoint, $event)"
          @updateTime="updateTime(breakpoint, $event)"
          :key="index"
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
  import autocomplete from './Autocomplete'
  import axios from 'axios'

  export default {
    name: 'main-page',
    mixins: [ worktime ],
    components: {
      Breakpoint,
      autocomplete
    },
    data () {
      return {
        text: '',
        telephone: 'Telephone',
        date: null,
        clients: []
      }
    },
    beforeCreate () {
      axios({
        url: 'http://localhost:8080/api/view_timetracker_search/search',
        method: 'post',
        headers: {
          'Wisol-Api-App-Key': 'b8ff874e-ffe9-4338-9991-e73f58f73e66',
          'Wisol-Api-Device-Key': 'timetracker'
        },
        data: {
          'where': {}
        },
        auth: {
          username: 'iondev',
          password: 'iondev123$$'
        },
        responseType: 'json'
      })
        .then((response) => {
          this.clients = response.data
        })
    },
    created () {
      this.date = this.today
    },
    computed: {
      breakpoints () {
        var nextDay = this.date.clone().add(1, 'days')
        return this.$store.getters.breakpoints
          .filter(breakpoint => moment(breakpoint.startTime).isBetween(this.date, nextDay, 'day', '[)'))
          .sort((a, b) => {
            if (a.startTime > b.startTime) return -1
            if (a.startTime < b.startTime) return 1
            return 0
          })
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
        if (!this.todayIsSelected || !this.text) {
          return
        }
        this.$store.dispatch('createBreakpoint', {
          text: this.text
        })
        this.text = ''
        this.$emit('inputtext', '')
      },
      createTel () {
        this.$store.dispatch('createBreakpoint', {
          text: this.telephone
        })
      },
      inputText (value) {
        this.text = value
      },
      stop (breakpoint) {
        this.$store.dispatch('stopBreakpoint', { breakpoint })
      },
      remove (breakpoint) {
        this.$store.dispatch('removeBreakpoint', { breakpoint })
      },
      restart (breakpoint) {
        this.$store.dispatch('restartBreakpoint', { breakpoint })
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
      updateTime (breakpoint, data) {
        this.$store.dispatch('setBreakpointTime', {
          breakpoint,
          ...data
        })
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
  @import "../scss/variables";
  @import "../scss/buttons";

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

    .submit-button-container {
      margin-left: 10px;
      margin-right: 10px;
      display: flex;

      .submit-button {
        @include circle-button(#4caf50);
      }
      .tel-button {
        @include circle-button(#4286f4);
        margin-left: 10px;
      }
    }
  }

  footer {
    background-color: $gray-300;
    padding: 0.5em 0;
  }
  .date-selector {
    background-color: $gray-300;
    padding: 0.5em 0;

    .container-fluid {
      display: flex;
      line-height: 2em;
      justify-content: space-between;
      .input-container {
        flex-grow: 1;
        margin: 0 0 0 $spacing;
        justify-content: center;
      }
      .next, .previous {
        font-size: 2em;
        color:  $gray-600;
        cursor: pointer;
      }
    }
  }

  form {
    margin: 1em 0;
  }
</style>
