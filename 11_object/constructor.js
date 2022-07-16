function User(name){
    this.name = name;
    this.isAdmin = true;
}


let user = new User("Dominic");

console.log(user.name);
console.log(user.isAdmin);


function A() { name:"David"}
function B() { name:"David" }

let x = new A;
let y = new B;

console.log( x == y );

function Calculator() {


this.read = function() {
    this.a = +prompt("a = ");
    this.b = +prompt("b = ");
  };

  this.sum = function() {
    return this.a + this.b;
    };
  this.mul=  function() {
    return this.a * this.b;
  };
  
}


let calculator = new Calculator();
// calculator.read();

// console.log( "Sum=" + calculator.sum() );
// console.log( "Mul=" + calculator.mul() );



function Accumulator(startingValue){

    this.value = startingValue;
    this.read = function(){
        this.value += +prompt("Value = ");
    };    
}

let accumulator = new Accumulator(7);

accumulator.read();
accumulator.read();

console.log(accumulator.value);


