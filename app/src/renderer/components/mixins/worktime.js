import moment from 'moment'

export default {

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

  methods: {
    workTime (from, to) {
      const time = (to || this.now.valueOf()) - from
      return Math.max(1, Math.ceil(time / (this.multipleOf * 1000 * 60))) * this.multipleOf * 1000 * 60
    },

    formatWorkTime (time) {
      const totalMinutes = time / (1000 * 60)
      const minutes = totalMinutes % 60
      const hours = Math.floor(totalMinutes / 60)

      const pad = number => {
        const numberText = number + ''
        return numberText.length === 1
          ? '0' + numberText
          : numberText
      }

      return pad(hours) + ':' + pad(minutes)
    }
  }
}
