/* Currently Selected Element */
let selectedElement = document.getElementsByClassName('project')[0];

/* Loop through all elements with class name project */
for(let i = 0; i < document.getElementsByClassName('project').length; i++) {
  /* And attach event listener click, to method focusProject */
  document.getElementsByClassName('project')[i].addEventListener('click', focusProject);
}

function focusProject(e) {
  /* Removed the 'selected' class and add the 'collapsed' class to the previously selected element */
  selectedElement.classList.remove('selected');
  selectedElement.classList.add('collapsed');

  /* Remove the collapse class, and add the selected class to the newly selected element */
  e.currentTarget.classList.remove('collapsed');
  e.currentTarget.classList.add("selected");

  /* Set the new element to the selected element variable */
  selectedElement = e.currentTarget;
}