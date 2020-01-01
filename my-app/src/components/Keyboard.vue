<template>
  <div class="input">
  <ul id="keyboard">
    <li data-note="C" class="key" id="0">
      <div data-note="C#" class="black-key" id="0">R</div>
      D
    </li>
    <li data-note="D" class="key" id="0">
      <div data-note="D#" class="black-key" id="0">T</div>
      F
    </li>
    <li data-note="E" class="key" id="0">
      G
    </li>
    <li data-note="F" class="key" id="0">
      <div data-note="F#" class="black-key" id="0">U</div>
      H
    </li>
    <li data-note="G" class="key" id="0">
      <div data-note="G#" class="black-key" id="0">I</div>
      J
    </li>
    <li data-note="A" class="key" id="0">
      <div data-note="A#" class="black-key" id="0">O</div>
      K
    </li>
    <li data-note="B" class="key" id="0">
      L
    </li>
    <li data-note="C" class="key" id="1">
      <div data-note="C#" class="black-key" id="1">R</div>
      D
    </li>
    <li data-note="D" class="key" id="1">
      <div data-note="D#" class="black-key" id="1">T</div>
      F
    </li>
    <li data-note="E" class="key" id="1">
      G
    </li>
    <li data-note="F" class="key" id="1">
      <div data-note="F#" class="black-key" id="1">U</div>
      H
    </li>
    <li data-note="G" class="key" id="1">
      <div data-note="G#" class="black-key" id="1">I</div>
      J
    </li>
    <li data-note="A" class="key" id="1">
      <div data-note="A#" class="black-key" id="1">O</div>
      K
    </li>
    <li data-note="B" class="key" id="1">
      L
    </li>
  </ul>
  Octave: <span id="octave">4-5</span> 
  <input id="octave_down" type="button" value="-">
  <input id="octave_up" type="button" value="+">
  <br>
  <input id="clear_melody" type="button" value="Clear Melody">
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
  mounted() {
    const envelope= {
      attack : 0.01,
      decay : 0.2,
      sustain : 0.4,
      release : 1.5,
      attackCurve : "linear",
      decayCurve : "linear",
      releaseCurve : "linear"
    };
    const synth = new this.$Tone.Synth(envelope);
    synth.oscillator.type = "sine";
    synth.toMaster();

    var octave = 4;
    var melody = [];

    const higher_octave = document.getElementById("octave_up");
    const lower_octave = document.getElementById("octave_down");
    const clear_melody = document.getElementById("clear_melody");
    const confirm_melody = document.getElementById("submit_melody");

    higher_octave.addEventListener("mousedown", () => {
      if (octave < 7) {
        octave = octave + 1;
      } else {
        alert("Out of range!\nYou can only lower the pitches.");
      }
      document.getElementById("octave").innerHTML = octave + "-" + (octave + 1);
    });

    lower_octave.addEventListener("mousedown", () => {
      if (octave > 0) {
        octave = octave - 1;
      } else {
        alert("Out of range!\nYou can only higher the pitches.");
      }
      document.getElementById("octave").innerHTML = octave + "-" + (octave + 1);
    });

    clear_melody.addEventListener("mousedown", () => {
      melody = [];
      window.console.log(melody);
      document.getElementById("melody_disp").innerHTML = melody;
    });

    confirm_melody.addEventListener("mousedown", () => {
      document.getElementById("melody_disp").innerHTML = melody;
      window.console.log(melody);
    });

    const piano = document.getElementById("keyboard");

    piano.addEventListener("mousedown", e => {
      synth.triggerAttack(e.target.dataset.note.concat(octave+parseInt(e.target.id)));
      melody.push(e.target.dataset.note.concat(octave+parseInt(e.target.id)));
      window.console.log(melody);
    });

    piano.addEventListener("mouseup", () => {
      synth.triggerRelease();
    });

    document.addEventListener("keydown", e => {
      switch (e.key) {
        case "d":
          return synth.triggerAttack("C".concat(octave));
        case "r":
          return synth.triggerAttack("C#".concat(octave));
        case "f":
          return synth.triggerAttack("D".concat(octave));
        case "t":
          return synth.triggerAttack("D#".concat(octave));
        case "g":
          return synth.triggerAttack("E".concat(octave));
        case "h":
          return synth.triggerAttack("F".concat(octave));
        case "u":
          return synth.triggerAttack("F#".concat(octave));
        case "j":
          return synth.triggerAttack("G".concat(octave));
        case "i":
          return synth.triggerAttack("G#".concat(octave));
        case "k":
          return synth.triggerAttack("A".concat(octave));
        case "o":
          return synth.triggerAttack("A#".concat(octave));
        case "l":
          return synth.triggerAttack("B".concat(octave));
        default:
          return;
      }
    });

    document.addEventListener("keyup", e => {
      switch (e.key) {
        case "d":
        case "r":
        case "f":
        case "t":
        case "g":
        case "h":
        case "u":
        case "j":
        case "i":
        case "k":
        case "o":
        case "l":
          synth.triggerRelease(); 
      }
    });
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
  display: flex;
}
ul .key {
  position: relative;
  width: 60px;
  height: 180px;
  border: 1px solid black;
  border-right: none;
  background: #fffff8;
  border-radius: 5px;
  box-shadow: 0px 3px 5px #666;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  padding-bottom: 10px;
  font-weight: bold;
}
ul .key:last-child {
  border-right: 1px solid black;
}
ul .black-key {
  position: absolute;
  top: -1px;
  left: 37.5px;
  width: 45px;
  height: 120px;
  background: black;
  border-radius: 5px;
  box-shadow: 0px 3px 5px #666;
  z-index: 999;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  padding-bottom: 10px;
  color: white;
}
ul .active {
  box-shadow: 0px 1px 3px #666;
}
</style>
