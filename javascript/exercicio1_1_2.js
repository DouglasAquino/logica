
var correto = '<img src="images/newgreencheck.png"/>'
var errado = '<img src="images/newredex.png"/>'

function respostas ()
 {resposta(document.getElementById('a').value,'verdade','ah');
 resposta(document.getElementById('b').value,'falso','bh');
 resposta(document.getElementById('c').value,'falso','ch');
 resposta(document.getElementById('d').value,'verdade','dh');
 resposta(document.getElementById('e').value,'falso','eh');
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
 {document.getElementById('a').value='verdade';
  document.getElementById('b').value='falso';
  document.getElementById('c').value='falso';
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


