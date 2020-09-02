function computegrade ()
 {var grade = 0;
  grade = grade + compgrade(document.getElementById('a').value,'falso');
  grade = grade + compgrade(document.getElementById('b').value,'verdade');
  grade = grade + compgrade(document.getElementById('c').value,'verdade');
  grade = grade + compgrade(document.getElementById('d').value,'verdade');
  grade = grade + compgrade(document.getElementById('e').value,'falso');
  return grade / 5.0}

function compgrade (answer,correct)
 {if (answer==correct) {return 1.0};
  return 0.0};

var checkmark = '<img src="images/newgreencheck.jpg"/>'
var exmark = '<img src="images/newredex.jpg"/>'

function showgrades ()
 {showgrade(document.getElementById('a').value,'falso','ag');
  showgrade(document.getElementById('b').value,'verdade','bg');
  showgrade(document.getElementById('c').value,'verdade','cg');
  showgrade(document.getElementById('d').value,'verdade','dg');
  showgrade(document.getElementById('e').value,'falso','eg');
  return true}

function showgrade (answer,correct,label)
 {if (answer=='')
     {document.getElementById(label).innerHTML='&nbsp;';
      return false};
  if (answer==correct)
     {document.getElementById(label).innerHTML=checkmark;
      return true};
  document.getElementById(label).innerHTML=exmark;
  return false};

function showanswers ()
 {document.getElementById('a').value='falso';
  document.getElementById('b').value='verdade';
  document.getElementById('c').value='verdade';
  document.getElementById('d').value='verdade';
  document.getElementById('e').value='falso';
  showgrades();
  return true}


function resetanswers ()
 {document.getElementById('a').value='';
  document.getElementById('b').value='';
  document.getElementById('c').value='';
  document.getElementById('d').value='';
  document.getElementById('e').value='';
  showgrades();
  return true}

