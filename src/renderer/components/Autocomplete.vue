<template>
  <div
      class="autocomplete"
      role="combobox"
      aria-haspopup="listbox"
      :aria-expanded="isOpen"
    >
      <input
        type="text"
        @input="onChange"
        v-model="search"
        @keyup.down="onArrowDown"
        @keyup.up="onArrowUp"
        @keyup.enter="onEnter"
        aria-multiline="false"
        role="searchbox"
        class="input-container form-control"
        aria-autocomplete="list"
        aria-controls="autocomplete-results"
        :aria-activedescendant="activedescendant"
      />
      <ul
        id="autocomplete-results"
        v-show="isOpen"
        class="autocomplete-results"
        role="listbox">
        <li class="loading" v-if="isLoading">
          Loading results...
        </li>
        <li
          v-else v-for="(result, i) in results"
          :key="i"
          @click="setResult(result.searchtext)"
          class="autocomplete-result"
          :class="{ 'is-active': isSelected(i) }"
          role="option"
          :id="getId(i)"
          :aria-selected="isSelected(i)">
          {{ result.searchtext }}
        </li>
      </ul>
    </div>
</template>

<script>

export default{
  name: 'autocomplete',
  template: '#autocomplete',
  props: {
    items: {
      type: Array,
      required: false,
      default: () => []
    },
    isAsync: {
      type: Boolean,
      required: false,
      default: false
    },
    textsync: {
      type: String
    }
  },

  data () {
    return {
      isOpen: false,
      results: [],
      search: '',
      isLoading: false,
      arrowCounter: 0,
      activedescendant: ''
    }
  },

  methods: {
    onChange () {
      if (this.isAsync) {
        this.isLoading = true
      } else {
        this.filterResults()
        this.isOpen = true
      }
    },
    filterResults () {
      this.results = this.items.filter(item => {
        return item.searchtext.toLowerCase().indexOf(this.search.toLowerCase()) > -1
      })
    },
    setResult (result) {
      this.$emit('update:textsync', result)
      this.search = result
      this.isOpen = false
    },
    onArrowDown (evt) {
      if (this.isOpen) {
        if (this.arrowCounter < this.results.length) {
          this.arrowCounter = this.arrowCounter + 1
          this.setActiveDescendent()
        }
      }
    },
    onArrowUp () {
      if (this.isOpen) {
        if (this.arrowCounter > 0) {
          this.arrowCounter = this.arrowCounter - 1
          this.setActiveDescendent()
        }
      }
    },
    onEnter () {
      this.search = this.results[this.arrowCounter]
      this.isOpen = false
      this.arrowCounter = -1
      this.search = ''
    },
    handleClickOutside (evt) {
      if (!this.$el.contains(evt.target)) {
        this.isOpen = false
        this.arrowCounter = -1
        this.search = ''
      }
    },
    setActiveDescendent () {
      this.activedescendant = this.getId(this.arrowCounter)
    },
    isSelected (index) {
      return index === this.arrowCounter
    },
    getId (index) {
      return `result-option-${index}`
    }
  },
  watch: {
    items: function (val, oldValue) {
      if (val.length !== oldValue.length) {
        this.results = val
        this.isLoading = false
      }
    }
  },
  mounted () {
    document.addEventListener('click', this.handleClickOutside)
  },
  destroyed () {
    document.removeEventListener('click', this.handleClickOutside)
  }
}
</script>
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}

.autocomplete {
  position: relative;
  width: auto;
  height: auto;
}

.input-container{
  width: 100%;
  height: 45px;
  align-items: center;
  background-color: white;
  justify-content: center;
}
.autocomplete-results{
  flex-grow: 1;
  width: 88%;
  overflow: auto;
  height: 193px;
  align-items: center;
  position: fixed;
  background-color: white;
  justify-content: center;
}
::-webkit-scrollbar {
    display: none;
}
.autocomplete-result {
  text-align: left;
  padding: 4px 10px;
  cursor: pointer;
  width: 100%;
}

.autocomplete-result.is-active,
.autocomplete-result:hover {
  background-color: #4aae9b;
  width: 95%;
  color: white;
}

</style>
