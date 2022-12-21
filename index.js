// Import stylesheets
import './style.css';

function wait(ms = 0) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function destroyPopup(popup){
  popup.classList.remove('open');
  await wait(1000);
  popup.remove();
  popup = null; 
}

// Write Javascript code!
function ask(options){
  return new Promise(async function(resolve) {
    //create a pop-up with prompt fields
    const popup = document.createElement('form');
    popup.classList.add('popup');
    popup.insertAdjacentHTML(
      'afterbegin', 
      `<fieldset>
         <label>${options.title}</label>
         <input type="text" name="input"/>
         <button type="submit">Submit</button>
      </fieldset>
    `);
    //check for cancel if needed
    if(options.cancel){
      const skipButton = document.createElement('button');
      skipButton.type = 'button';
      skipButton.textContent = 'Cancel'
      console.log(popup.firstChild);
      popup.firstElementChild.appendChild(skipButton);
      //listen for a click on cancel button
      skipButton.addEventListener('click', function(){
        resolve(null);
        destroyPopup(popup);
        }, {once: true }
      );
    }
    //listen for submit
    popup.addEventListener(
      'submit', 
      function(e) {
        e.preventDefault();
        console.log('submitter');
        resolve(e.target.input.value);
        destroyPopup(popup); 
    }, 
    {once: true}
    ); 
    //on submit, resolved the data to inputs 

    //insert the popup into the DOM
    document.body.appendChild(popup);
    // use small timeout to avoid display of popup on start
    await wait(50);
    popup.classList.add('open');
  });
}
// select all buttons with questions
async function askQuestion(e){
  const button = e.currentTarget;
  const cancel = 'cancel' in button.dataset;

  const answer = await ask({ 
    title: button.dataset.question, 
    cancel, 
  });
  console.log(answer);
}
const buttons = document.querySelectorAll('[data-question]');
buttons.forEach(button => button.addEventListener('click', askQuestion));

// this bit of code below will be really handy for a future project
// in a pixel style game, you can use this asyncMap function to list questions in a row
//then store that data

const questions = [
  {title: 'your name?', cancel: true },
  {title: 'your age?'},
  {title: 'your quest?'},
];

async function asyncMap(array, callback) {
  const results = []; // array to store / push answers into

  for (const item of array) {
    const result = await callback(item);
    results.push(result); 
  }
  return results;
}

async function go(){
  const answers = await asyncMap(questions, ask);
  console.log(answers);
}

go();