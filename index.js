// Import stylesheets
import './style.css';
function wait(ms = 0){
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Write Javascript code!
function ask(options){
  return new Promise(async function(resolve) {
    //create a pop-up with prompt fields
    const popup = document.createElement('form');
    popup.classList.add('popup');
    popup.insertAdjacentHTML('afterbegin', `<fieldset>
         <label>${options.title}</label>
         <input type="text name="input"/>
         <button type="submit">Submit</button>
      </fieldset>
    `);
    //check for cancel if needed
    if(options.cancel){
      const skipButton = document.createElement('button');
      skipButton.type = 'button';
      skipButton.textContent = 'Cancel?';
      popup.firstElementChild.append(skipButton);
      //listen for a click on cancel button
    }
    //listen for submit
    popup.addEventListener('submit', function(e){
      e.preventDefault();
      console.log('submitted');
    });
    //on submit, resolved the data to inputs 

    //insert the popup into the DOM
    document.body.appendChild(popup);
    // use small timeout to avoid display of popup on start
    await wait(50);
    popup.classList.add('open');
  });
}

console.log(ask({title: "works?", cancel: true}));