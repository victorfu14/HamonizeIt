<template>
  <div class="input">
  <div class="table">
    <ul id="keyboard">
      <li data-note="C" class="white-key" id="0" @mousedown="keypress" @mouseup="keyrelease"></li>
      <li data-note="C#" class="black-key" id="0" @mousedown="keypress" @mouseup="keyrelease"></li>
      <li data-note="D" class="white-key" id="0" @mousedown="keypress" @mouseup="keyrelease"></li>
      <li data-note="D#" class="black-key" id="0" @mousedown="keypress" @mouseup="keyrelease"></li>
      <li data-note="E" class="white-key" id="0" @mousedown="keypress" @mouseup="keyrelease"></li>
      <li data-note="F" class="white-key" id="0" @mousedown="keypress" @mouseup="keyrelease"></li>
      <li data-note="F#" class="black-key" id="0" @mousedown="keypress" @mouseup="keyrelease"></li>
      <li data-note="G" class="white-key" id="0" @mousedown="keypress" @mouseup="keyrelease"></li>
      <li data-note="G#" class="black-key" id="0" @mousedown="keypress" @mouseup="keyrelease"></li>
      <li data-note="A" class="white-key" id="0" @mousedown="keypress" @mouseup="keyrelease"></li>
      <li data-note="A#" class="black-key" id="0" @mousedown="keypress" @mouseup="keyrelease"></li>
      <li data-note="B" class="white-key" id="0" @mousedown="keypress" @mouseup="keyrelease"></li>
      <li data-note="C" class="white-key" id="1" @mousedown="keypress" @mouseup="keyrelease"></li>
      <li data-note="C#" class="black-key" id="1" @mousedown="keypress" @mouseup="keyrelease"></li>
      <li data-note="D" class="white-key" id="1" @mousedown="keypress" @mouseup="keyrelease"></li>
      <li data-note="D#" class="black-key" id="1" @mousedown="keypress" @mouseup="keyrelease"></li>
      <li data-note="E" class="white-key" id="1" @mousedown="keypress" @mouseup="keyrelease"></li>
      <li data-note="F" class="white-key" id="1" @mousedown="keypress" @mouseup="keyrelease"></li>
      <li data-note="F#" class="black-key" id="1" @mousedown="keypress" @mouseup="keyrelease"></li>
      <li data-note="G" class="white-key" id="1" @mousedown="keypress" @mouseup="keyrelease"></li>
      <li data-note="G#" class="black-key" id="1" @mousedown="keypress" @mouseup="keyrelease"></li>
      <li data-note="A" class="white-key" id="1" @mousedown="keypress" @mouseup="keyrelease"></li>
      <li data-note="A#" class="black-key" id="1" @mousedown="keypress" @mouseup="keyrelease"></li>
      <li data-note="B" class="white-key" id="1" @mousedown="keypress" @mouseup="keyrelease"></li>
    </ul>
  </div>
  <br>
  Octave: <span id="octave">{{ octave }}-{{ octave+1 }}</span> 
  <input id="octave_down" type="button" value="-" @mousedown="octave_change">
  <input id="octave_up" type="button" value="+" @mousedown="octave_change">
  <br>
  <input id="clear_melody" type="button" value="Clear Melody" @mousedown="clear">
  <input id="delete" type="button" value="Delete note" @mousedown="deleteNote">
  <input id="submit_melody" type="button" value="Confirm">
  <br>
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
        } else {
          alert("Out of range!\nYou can only lower the pitches.");
        }
      } else {
        if (this.octave > 0) {
          this.octave--;
        } else {
          alert("Out of range!\nYou can only higher the pitches.");
        }
      }
      this.updateDisp()
    },
    updateDisp: function() {
      const whitekeys = document.getElementsByClassName("white-key");
      const blackkeys = document.getElementsByClassName("black-key");
      for (const key of whitekeys) {
        key.innerHTML = key.dataset.note.concat(parseInt(key.id) + this.octave);
      }
      for (const key of blackkeys) {
        key.innerHTML = key.dataset.note.concat(parseInt(key.id) + this.octave);
      }
    },
    clear: function() {
      this.melody = [];
      this.$emit("melody", this.melody);
    },
    deleteNote: function() {
      this.melody.pop();
      this.$emit("melody", this.melody);
    }
  },
  mounted() {
    this.updateDisp()
    this.synth.toMaster();
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
body {
  overflow-x: scroll;
}
.table {
  display: table;   /* Allow the centering to work */
	margin: auto;
}
ul {
  list-style: none;
  display: inline-block;
  padding: 0;
  width: 100%;
  position: relative;
}
ul li {
  position: relative;
  float: left;
  border-style: solid;
  border-color: #000;
  border-width: 2px 1px 1px 1px;
  border-radius: 0 0 4px 4px;
  color: #ccc;
  text-align: center;
  cursor: pointer;
}
ul .white-key {
  width: 45px;
  height: 175px;
  background:#fff;
  line-height: 300px;
}
ul .black-key {
  background:#000;
  z-index: 10;
  width: 30px;
  height: 120px;
  margin: 0 0 0 -16px;
  line-height: 180px;
}
/* positioning */
.black-key + .white-key {
  margin-left: -16.5px;
}
.white-key + .white-key {
  margin-left: -0.5px;
}

.black-key:hover:active {
  background: #555;
}
.black-key:hover {
  background: #444;
}
.white-key:hover:active {
  background: #ddd;
}
.white-key:hover {
  background: #eee;
}
</style>
