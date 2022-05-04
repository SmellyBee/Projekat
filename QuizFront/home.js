
let BodyDiv=document.createElement('div');
BodyDiv.className="BodyDiv";
document.body.appendChild(BodyDiv);

let CRUDDiv=document.createElement('div');
CRUDDiv.className="CRUDDiv";
BodyDiv.appendChild(CRUDDiv);

let PlayDiv=document.createElement('div');
PlayDiv.className="PlayDiv";
BodyDiv.appendChild(PlayDiv);

let CRUDLabel=document.createElement('label');
CRUDLabel.className="CRUDLabel";
CRUDLabel.innerHTML="Manage Quiz";
CRUDDiv.appendChild(CRUDLabel);

let PlayLabel=document.createElement('label');
PlayLabel.className="CRUDLabel";
PlayLabel.innerHTML="Play Quiz";
PlayDiv.appendChild(PlayLabel);

var inPlayDiv = document.getElementsByClassName('PlayDiv')[0];
document.addEventListener('click', function( event ) {
  if (inPlayDiv == event.target && inPlayDiv.contains(event.target)) {    
    window.open('AllQuizzes.html');
  }
});

var inCrudDiv = document.getElementsByClassName('CRUDDiv')[0];
document.addEventListener('click', function( event ) {
  if (inCrudDiv == event.target && inCrudDiv.contains(event.target)) {    
    window.open('crud.html');
  }
});
