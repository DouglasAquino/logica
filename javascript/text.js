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

var correto = '<img src="images/newgreencheck.jpg"/>'
var errado = '<img src="images/newredex.jpg"/>'

function respostas ()
 {resposta(document.getElementById('a').value,'falso','ag');
 resposta(document.getElementById('b').value,'verdade','bg');
 resposta(document.getElementById('c').value,'verdade','cg');
 resposta(document.getElementById('d').value,'verdade','dg');
 resposta(document.getElementById('e').value,'falso','eg');
  return true}

function resposta (answer,correct,label)
 {if (answer=='')
     {document.getElementById(label).innerHTML='&nbsp;';
      return false};
  if (answer==correct)
     {document.getElementById(label).innerHTML=correto;
      return true};
  document.getElementById(label).innerHTML=errado;
  return false};

function gabarito ()
 {document.getElementById('a').value='falso';
  document.getElementById('b').value='verdade';
  document.getElementById('c').value='verdade';
  document.getElementById('d').value='verdade';
  document.getElementById('e').value='falso';
  respostas();
  return true}


function limpar ()
 {document.getElementById('a').value='';
  document.getElementById('b').value='';
  document.getElementById('c').value='';
  document.getElementById('d').value='';
  document.getElementById('e').value='';
  respostas();
  return true}


