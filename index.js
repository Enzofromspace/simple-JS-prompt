// Import stylesheets
import './style.css';

// Write Javascript code!
function ask(options){
  return new Promise(function() {
    //create a pop-up with prompt fields
    const popup = document.createElement('form');
    popup.classList.add('popup');
    popup.insertAdjacentHTML('afterbegin', `
      <fieldset>
         <label>${options.title}</label>
      </fieldset>
    `);
    
    console.log(popup);
    //check for cancel if needed
    if(options.cancel){
      const skipButton = document.createElement('button');
      skipButton.type = 'button';
      skipButton.textContent = 'Cancel?';
      //listen for a click on cancel button
    }
    //listen for submit

    //on submit, resolved the data to inputs 

    //insert the popup into the DOM
    document.body.appendChild(popup);
    // use small timeout to avoid display of popup on start
    setTimeout(function(){
        popup.classList.add('open');
      }, 10);
  });
}

console.log(ask({title: "works?"}));