/* basic synth for note input */

const synth = new Tone.Synth().toDestination();

/* transport set up : will add bpm later */

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

/* callback loop */

const loop = new Tone.Loop(() => {
  // triggered every eighth note.
  nextStep();
}, "8n").start(0);

/* array with current active steps */

let currentSequence = [];

let currentStep = 0;

/* find inputs and add eventlistener and map to sequence array */

let stepBoxes = Array.from(document.getElementsByClassName("seqStepBox"));

stepBoxes.forEach((stepBox, index) => {

  currentSequence.push({
    stepIndex : index,
    note: "C4",
    active: stepBox.checked,
    inputElement: stepBox,
    reset: index === stepBoxes.length-1 ? false : stepBoxes[index+1].indeterminate
  });

  stepBox.addEventListener("click", () => {
    if(stepBox.readOnly) stepBox.checked = stepBox.readOnly = false;
    else if(!stepBox.checked) stepBox.readOnly = stepBox.indeterminate = true;
  });
});

function updateStepStyle(){
  if (currentStep === 0){
    stepBoxes[0].style.backgroundColor = 'red';
    stepBoxes[stepBoxes.length-1].style.backgroundColor = null;
  } else {
    stepBoxes[currentStep].style.backgroundColor = 'red';
    stepBoxes[currentStep-1].style.backgroundColor = null;
  } 
  if (currentStep === stepBoxes.length-1) {
    currentStep = 0;
  } else {
    currentStep ++;
  }
}