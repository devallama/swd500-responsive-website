let selectedElement = document.getElementsByClassName('project')[0];

for(let i = 0; i < document.getElementsByClassName('project').length; i++) {
  document.getElementsByClassName('project')[i].addEventListener('click', focusProject);
}

function focusProject(e) {
  selectedElement.classList.remove('selected');
  selectedElement.classList.add('collapsed');

  e.currentTarget.classList.remove('collapsed');
  e.currentTarget.classList.add("selected");

  selectedElement = e.currentTarget;
  console.log("called");
}