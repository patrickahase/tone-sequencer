const synth = new Tone.Synth().toDestination();

const seq = new Tone.Sequence((time, note) => {
  synth.triggerAttackRelease(note, 0.1, time);
  // subdivisions are given as subarrays
}, ["C4", ["E4", "D4", "E4"], "G4", ["A4", "G4"]]).start(0);

seq.probability = 0.8;

let transportToggle = document.getElementById("transport-toggle");

let isPlaying = false;

transportToggle.addEventListener("click", () => {
  if(isPlaying){
    transportToggle.innerHTML = "⏵";
    Tone.Transport.pause();
  } else {
    transportToggle.innerHTML = "⏸";
    Tone.Transport.start();
  }
  isPlaying = !isPlaying;
});

const loop = new Tone.Loop((time) => {
  // triggered every eighth note.
  console.log(time);
}, "8n").start(0);