<template>
  <div class="input">
  <ul id="keyboard">
    <li data-note="C" class="white-key" id="0" @mousedown="keypress" @mouseup="keyrelease">C{{ octave }}</li>
    <li data-note="C#" class="black-key" id="0" @mousedown="keypress" @mouseup="keyrelease">R</li>
    <li data-note="D" class="white-key" id="0" @mousedown="keypress" @mouseup="keyrelease">F</li>
    <li data-note="D#" class="black-key" id="0" @mousedown="keypress" @mouseup="keyrelease">T</li>
    <li data-note="E" class="white-key" id="0" @mousedown="keypress" @mouseup="keyrelease">G</li>
    <li data-note="F" class="white-key" id="0" @mousedown="keypress" @mouseup="keyrelease">H</li>
    <li data-note="F#" class="black-key" id="0" @mousedown="keypress" @mouseup="keyrelease">U</li>
    <li data-note="G" class="white-key" id="0" @mousedown="keypress" @mouseup="keyrelease">J</li>
    <li data-note="G#" class="black-key" id="0" @mousedown="keypress" @mouseup="keyrelease">I</li>
    <li data-note="A" class="white-key" id="0" @mousedown="keypress" @mouseup="keyrelease">K</li>
    <li data-note="A#" class="black-key" id="0" @mousedown="keypress" @mouseup="keyrelease">O</li>
    <li data-note="B" class="white-key" id="0" @mousedown="keypress" @mouseup="keyrelease">L</li>
    <li data-note="C" class="white-key" id="1" @mousedown="keypress" @mouseup="keyrelease">D</li>
    <li data-note="C#" class="black-key" id="1" @mousedown="keypress" @mouseup="keyrelease">R</li>
    <li data-note="D" class="white-key" id="1" @mousedown="keypress" @mouseup="keyrelease">F</li>
    <li data-note="D#" class="black-key" id="1" @mousedown="keypress" @mouseup="keyrelease">T</li>
    <li data-note="E" class="white-key" id="1" @mousedown="keypress" @mouseup="keyrelease">G</li>
    <li data-note="F" class="white-key" id="1" @mousedown="keypress" @mouseup="keyrelease">H</li>
    <li data-note="F#" class="black-key" id="1" @mousedown="keypress" @mouseup="keyrelease">U</li>
    <li data-note="G" class="white-key" id="1" @mousedown="keypress" @mouseup="keyrelease">J</li>
    <li data-note="G#" class="black-key" id="1" @mousedown="keypress" @mouseup="keyrelease">I</li>
    <li data-note="A" class="white-key" id="1" @mousedown="keypress" @mouseup="keyrelease">K</li>
    <li data-note="A#" class="black-key" id="1" @mousedown="keypress" @mouseup="keyrelease">O</li>
    <li data-note="B" class="white-key" id="1" @mousedown="keypress" @mouseup="keyrelease">L</li>
  </ul>
  <br>
  Octave: <span id="octave">{{ octave }}-{{ octave+1 }}</span> 
  <input id="octave_down" type="button" value="-" @mousedown="octave_change">
  <input id="octave_up" type="button" value="+" @mousedown="octave_change">
  <br>
  <input id="clear_melody" type="button" value="Clear Melody" @mousedown="clear">
  <input id="submit_melody" type="button" value="Confirm">
  <br>
  <span id="melody_disp"></span>
  </div>
</template>

<script>
export default {
  name: 'Keyboard',
  props: {
    msg: String
  },
  data() {
    return {
      melody: [],
      octave: 4,
      envelope: {
        attack : 0.01,
        decay : 0.2,
        sustain : 0.4,
        release : 1.5,
        attackCurve : "linear",
        decayCurve : "linear",
        releaseCurve : "linear"
      },
      synth: new this.$Tone.Synth(this.envelope),
    }
  },
  methods: {
    keypress: function() {
      const level = parseInt(event.currentTarget.id);
      const note = event.currentTarget.dataset.note.concat(this.octave+level);
      this.synth.triggerAttack(note);
      this.melody.push(note);
      this.$emit("melody", this.melody);
    },
    keyrelease: function() {
      this.synth.triggerRelease();
    },
    octave_change: function() {
      if (event.currentTarget.value == "+") {
        if (this.octave < 7) {
          this.octave++;
          window.console.log(this.octave);
        } else {
          alert("Out of range!\nYou can only lower the pitches.");
        }
      } else {
        if (this.octave > 0) {
          this.octave--;
          window.console.log(this.octave);
        } else {
          alert("Out of range!\nYou can only higher the pitches.");
        }
      }
    },
    clear: function() {
      this.melody = [];
      this.$emit("melody", this.melody);
    }
  },
  mounted() {
    this.synth.toMaster();
    const whitekeys = document.getElementsByClassName("white-key");
    const blackkeys = document.getElementsByClassName("black-key");
    for (const key of whitekeys) {
      key.innerHTML = key.dataset.note.concat(parseInt(key.id) + this.octave);
    }
    for (const key of blackkeys) {
      key.innerHTML = key.dataset.note.concat(parseInt(key.id) + this.octave);
    }
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
body {
  overflow-x: scroll;
}
ul {
  list-style: none;
  display: inline-block;
  padding: 0;
  width: 700px;
  position: relative;
}
ul li {
  position: relative;
  float: left;
  border-style: solid;
  border-color: #000;
  border-width: 2px 1px 2px 1px;
  border-radius: 0 0 4px 4px;
  color: #ccc;
  text-align: center;
  cursor: pointer;
}
ul .white-key {
  width: 30px;
  height: 150px;
  background:#fff;
}
ul .black-key {
  background:#000;
  z-index: 10;
  width: 20px;
  height: 90px;
  margin: 0 0 0 -10px;
}
/* positioning */
.black-key + .white-key {
  margin-left: -12px;
}
</style>
