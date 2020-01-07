<template>
  <div id="app">
    <Keyboard msg="This is a keyboard input" @melody="syncMelody"/>
    <Staff id="staff" :content="melodyLine" />
  </div>
</template>

<script>
import Keyboard from './components/Keyboard.vue'
import Staff from './components/Staff.vue'
export default {
  name: 'app',
  components: {
    Keyboard,
    Staff
  },
  data: function() {
    return {
      melodyLine: []
    }
  },
  methods: {
    syncMelody(variable) {
      this.melodyLine = variable;
    }
  }
}

</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
