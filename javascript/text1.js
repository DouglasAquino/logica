//------------------------------------------------------------------------------
// Exercicio 1.2
//------------------------------------------------------------------------------

function togglesquare (node)
 {if (node.innerHTML != '&nbsp;') {node.innerHTML = '&nbsp;'}
  else {node.innerHTML="<img src='images/coracao.png'/>"};
  showgrades()}

//------------------------------------------------------------------------------
// computegrade
//------------------------------------------------------------------------------

function computegrade ()
 {database = readworld();
  var table = document.getElementById('theory'); 
  var grade = 0.0;
  for (var i=1; i<table.rows.length; i++)
      {var query = read(table.rows[i].cells[1].textContent);
       if (evaluate(query,database)) {grade = grade + 1}};
  return Math.round(grade * 10 / 6) / 10.0}

//------------------------------------------------------------------------------
// showgrades
//------------------------------------------------------------------------------

var checkmark = '<img src="images/newgreencheck.jpg"/>'
var exmark = '<img src="images/newredex.jpg"/>'

function showgrades ()
 {database = readworld();
  var table = document.getElementById('theory'); 
  for (var i=1; i<table.rows.length; i++)
      {var query = read(table.rows[i].cells[1].textContent);
       var answer = 'empty';
       if (evaluate(query,database)) {answer = 'true'} else {answer = 'false'};
       showgrade(answer,'true',i+'g')};
  return true}

function showgrade (answer,correct,label)
 {if (answer==correct)
     {document.getElementById(label).innerHTML=checkmark; return true};
  if (answer!='empty' && answer!=correct)
     {document.getElementById(label).innerHTML=exmark; return false};
  document.getElementById(label).innerHTML='&nbsp;';
  return false};

function readworld ()
 {var data = seq();
  if (document.getElementById('aa').innerHTML!='&nbsp;') {data[data.length]=makelikes('anna','anna')};
  if (document.getElementById('ab').innerHTML!='&nbsp;') {data[data.length]=makelikes('anna','carol')};
  if (document.getElementById('ac').innerHTML!='&nbsp;') {data[data.length]=makelikes('anna','giu')};
  if (document.getElementById('ad').innerHTML!='&nbsp;') {data[data.length]=makelikes('anna','natanna')};
  if (document.getElementById('ba').innerHTML!='&nbsp;') {data[data.length]=makelikes('carol','anna')};
  if (document.getElementById('bb').innerHTML!='&nbsp;') {data[data.length]=makelikes('carol','carol')};
  if (document.getElementById('bc').innerHTML!='&nbsp;') {data[data.length]=makelikes('carol','giu')};
  if (document.getElementById('bd').innerHTML!='&nbsp;') {data[data.length]=makelikes('carol','natanna')};
  if (document.getElementById('ca').innerHTML!='&nbsp;') {data[data.length]=makelikes('giu','anna')};
  if (document.getElementById('cb').innerHTML!='&nbsp;') {data[data.length]=makelikes('giu','carol')};
  if (document.getElementById('cc').innerHTML!='&nbsp;') {data[data.length]=makelikes('giu','giu')};
  if (document.getElementById('cd').innerHTML!='&nbsp;') {data[data.length]=makelikes('giu','natanna')};
  if (document.getElementById('db').innerHTML!='&nbsp;') {data[data.length]=makelikes('natanna','anna')};
  if (document.getElementById('da').innerHTML!='&nbsp;') {data[data.length]=makelikes('natanna','carol')};
  if (document.getElementById('dc').innerHTML!='&nbsp;') {data[data.length]=makelikes('natanna','giu')};
  if (document.getElementById('dd').innerHTML!='&nbsp;') {data[data.length]=makelikes('natanna','natanna')};
  return data}

function makelikes (x,y)
 {return seq('likes',x,y)}

var symbols = seq('anna','carol','giu','natanna')

function evaluate (query,facts)
 {return evalit(query,nil,facts)}

function evalit (p,al,facts)
 {if (symbolp(p)) {return evalatom(p,al,facts)}
  if (p[0] == 'same') {return evalsame(p,al,facts)}
  if (p[0] == 'distinct') {return evaldistinct(p,al,facts)}
  if (p[0] == 'matches') {return evalmatches(p,al,facts)}
  if (p[0] == 'not') {return evalnot(p,al,facts)}
  if (p[0] == 'and') {return evaland(p,al,facts)}
  if (p[0] == 'or') {return evalor(p,al,facts)}
  if (p[0] == 'implication') {return evalimplication(p,al,facts)}
  if (p[0] == 'forall') {return evaluniversal(p,al,facts)}
  if (p[0] == 'exists') {return evalexistential(p,al,facts)}
  return evalbackground(p,al,facts)}

function evalatom (p,al,facts)
 {if (p == 'true') {return true};
  if (p == 'false') {return false};
  return evalbackground(p,al,facts)}

function evalsame (p,al,facts)
 {al = unify(p[1],p[2],al);
  if (al != false) {return true};
  return false}

function evaldistinct (p,al,facts)
 {if (unify(p[1],p[2],al) == false) {return true};
  return false}

function evalmatches (p,al,facts)
 {if (symbolp(p[1]))
     {var matches = p[1].match(p[2]);
      for (var i=0; i<matches.length; i++)
          {var bl = unify(p[3],matches[i],al);
           if (bl != false && evalexit(pl,bl,facts))
              {return true}}}
  return false}

function evalnot (p,al,facts)
 {return !evalit(p[1],al,facts)}

function evaland (p,al,facts)
 {for (var i=1; i<p.length; i++)
      {if (!evalit(p[i],al,facts)) {return false}};
  return true}

function evalor (p,al,facts)
 {for (var i=1; i<p.length; i++)
      {if (evalit(p[i],al,facts)) {return true}};
  return false}

function evalimplication (p,al,facts)
 {if (!evalit(p[1],al,facts)) {return true};
  return evalit(p[2],al,facts)}

function evaluniversal (p,al,facts)
 {for (var i=0; i<symbols.length; i++)
      {bl = acons(p[1],symbols[i],al);
       if (!evalit(p[2],bl,facts)) {return false}}
  return true}

function evalexistential (p,al,facts)
 {for (var i=0; i<symbols.length; i++)
      {bl = acons(p[1],symbols[i],al);
       if (evalit(p[2],bl,facts)) {return true}}
  return false}

function evalbackground (p,al,facts)
 {var data = facts;
  for (var i=0; i<data.length; i++)
      {if (unify(p,data[i],al)) {return true}};
  return false}

//------------------------------------------------------------------------------

function unify (x,y,bl)
 {if (x == y) {return bl};
  if (varp(x)) {return unifyvar(x,y,bl)};
  if (symbolp(x)) {return unifyatom(x,y,bl)};
  return unifyexp(x,y,bl)}

function unifyvar (x,y,bl)
 {var dum = assoc(x,bl);
  if (dum != false) {return unify(cdr(dum),y,bl)};
  if (x == unifyval(y,bl)) {return bl};
  if (occurcheckp(x,y,bl)) {return false};
  return acons(x,y,bl)}

function unifyval (y,bl)
 {if (varp(y))
     {var dum = assoc(y,bl);
      if (dum != false) {return unifyval(cdr(dum),bl)};
      return y};
  return y}

function occurcheckp (x,y,bl)
 {if (x==y) {return true};
  if (varp(y))
     {var dum = assoc(y,bl);
      if (dum) {return occurcheckp(x,cdr(dum),bl)};
      return false};
  if (symbolp(y)) {return false};
  for (var i=0; i<y.length; i++)
      {if (occurcheckp(x,y[i],bl)) {return true}};
  return false}

function unifyatom (x,y,bl)
 {if (varp(y)) {return unifyvar(y,x,bl)}
  else return false}

function unifyexp(x,y,bl)
 {if (varp(y)) {return unifyvar(y,x,bl)}
  if (symbolp(y)) {return false};
  var m = x.length;
  var n = y.length;  
  if (m != n) {return false};
  for (var i=0; i<m; i++)
      {bl = unify(x[i],y[i],bl);
       if (bl == false) {return false}};
  return bl}

//------------------------------------------------------------------------------
// showanswers
//------------------------------------------------------------------------------

function showanswers ()
 {document.getElementById('aa').innerHTML = '&nbsp;';
  document.getElementById('ab').innerHTML = '&nbsp;';
  document.getElementById('ac').innerHTML = '<img src="images/coracao.png"/>';
  document.getElementById('ad').innerHTML = '&nbsp;';
  document.getElementById('ba').innerHTML = '&nbsp;';
  document.getElementById('bb').innerHTML = '&nbsp;';
  document.getElementById('bc').innerHTML = '<img src="images/coracao.png"/>';
  document.getElementById('bd').innerHTML = '&nbsp;';
  document.getElementById('ca').innerHTML = '<img src="images/coracao.png"/>';
  document.getElementById('cb').innerHTML = '<img src="images/coracao.png"/>';
  document.getElementById('cc').innerHTML = '&nbsp;';
  document.getElementById('cd').innerHTML = '<img src="images/coracao.png"/>';
  document.getElementById('da').innerHTML = '&nbsp;';
  document.getElementById('db').innerHTML = '&nbsp;';
  document.getElementById('dc').innerHTML = '<img src="images/coracao.png"/>';
  document.getElementById('dd').innerHTML = '&nbsp;';
  showgrades();
  return true}

//------------------------------------------------------------------------------
// resetanswers
//------------------------------------------------------------------------------

function resetanswers ()
 {document.getElementById('aa').innerHTML = '&nbsp;';
  document.getElementById('ab').innerHTML = '&nbsp;';
  document.getElementById('ac').innerHTML = '&nbsp;';
  document.getElementById('ad').innerHTML = '&nbsp;';
  document.getElementById('ba').innerHTML = '&nbsp;';
  document.getElementById('bb').innerHTML = '&nbsp;';
  document.getElementById('bc').innerHTML = '&nbsp;';
  document.getElementById('bd').innerHTML = '&nbsp;';
  document.getElementById('ca').innerHTML = '&nbsp;';
  document.getElementById('cb').innerHTML = '&nbsp;';
  document.getElementById('cc').innerHTML = '&nbsp;';
  document.getElementById('cd').innerHTML = '&nbsp;';
  document.getElementById('da').innerHTML = '&nbsp;';
  document.getElementById('db').innerHTML = '&nbsp;';
  document.getElementById('dc').innerHTML = '&nbsp;';
  document.getElementById('dd').innerHTML = '&nbsp;';
  showgrades()
  return true}