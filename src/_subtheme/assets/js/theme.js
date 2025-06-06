
/*
* Toogle collections
*/
document.addEventListener("DOMContentLoaded", function () {

    const toggleButtons = document.querySelectorAll(".Tree-collection-button");

    toggleButtons.forEach(function (button) {
        button.addEventListener("click", function (e) {
            let toggleContentId = e.currentTarget.getAttribute("aria-controls");
            let toggleContent = document.getElementById(toggleContentId);
            const expanded = button.getAttribute("aria-expanded") === "true";
            if (expanded) {
                toggleContent.style.display = "none";
                button.setAttribute("aria-expanded", "false");
                
            } else {
                toggleContent.style.display = "block";
                button.setAttribute("aria-expanded", "true");
            }
        });
    });

});


/*
* Button for quick change pen width
*/
 function changePenWidth(width) {
    var pen = document.querySelector('.Preview-wrapper.resizable');
    var resizeBarWidth = 9; // set the new width + offset
    var newWidth = parseInt(width) + parseInt(resizeBarWidth); // set the new width + offset
    console.log(newWidth)
    // Set the new width for the div
    pen.style.width = newWidth + 'px';
}


/*
* Dark / Light switch
* Source : https://web.dev/patterns/theming/theme-switch/
*/
const storageKey = 'theme-preference'

const onClick = (e) => {
    let pressed = e.currentTarget.getAttribute('aria-pressed');
    
    if(pressed === 'false') {
        e.currentTarget.setAttribute('aria-pressed', 'true');
    } else {
        e.currentTarget.setAttribute('aria-pressed', 'false');
    }

  // flip current value
  theme.value = theme.value === 'light'
    ? 'dark'
    : 'light'
    
  setPreference()
}

const getColorPreference = () => {
  if (localStorage.getItem(storageKey))
    return localStorage.getItem(storageKey)
  else
    return window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light'
}

const setPreference = () => {
  localStorage.setItem(storageKey, theme.value)
  reflectPreference()
}

const reflectPreference = () => {
  document.firstElementChild
    .setAttribute('data-theme', theme.value)

  document
    .querySelector('#theme-toggle')
    ?.setAttribute('aria-label', theme.value)
}

const theme = {
  value: getColorPreference(),
}

// set early so no page flashes / CSS is made aware
reflectPreference()

window.onload = () => {
  // set on load so screen readers can see latest value on the button
  reflectPreference()

  // now this script can find and listen for clicks on the control
  document
    .querySelector('#theme-toggle')
    .addEventListener('click', onClick)
}

// sync with system changes
window
  .matchMedia('(prefers-color-scheme: dark)')
  .addEventListener('change', ({matches:isDark}) => {
    theme.value = isDark ? 'dark' : 'light'
    setPreference()
  })
