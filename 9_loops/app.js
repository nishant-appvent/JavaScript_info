let n = 9;
// +(prompt("print prime numbers upto"));

outer:for(let i = 2; i<=n;i++){
    for(let j = 2; j<i; j++){
        if(i%j==0){
            continue outer;
        }
    }
    console.log(i);
}

function ask(question, yes, no) {
    if (confirm(question)) yes()
    else no();
  }
  
  ask(
    "Do you agree?",
    function() { alert("You agreed."); },
    function() { alert("You canceled the execution."); }
  );