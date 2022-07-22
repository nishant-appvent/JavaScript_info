// // let user = {
// //   name: "Desmond",
// //   age: 12,
// //   "like birds": true
// // }

// // console.log(user);
// // console.log(user.isAdmin);

// // user.isAdmin = true;


// // console.log(user);
// // delete user.age;

// // console.log(user);
// // // console.log(a);


// // let key = prompt("What","name")
// // console.log(user[key]);


// let user = {};

// user.name ="John";
// user.surname = "Smith";

// console.log(user);

// user.name = "Pete";

// console.log(user);

// delete user.name;

// console.log(user);


// let salaries = {
//   John: 100,
//   Ann: 160,
//   Pete: 130
// }

// let sum = 0;
// for(let key in salaries){

//   sum += (salaries[key]);
// }

// console.log(sum);

// function multiplyNumeric(obj){
//   for(let key in obj){
//     if (typeof obj[key] == 'number') 
//    obj[key] = 2 * obj[key]; 
//   }
  
// }


// let menu = {
//   width: 200,
//   height: 300,
//   title: "My menu"
// };

// multiplyNumeric(menu);


// console.log(menu);


// let a = {age:7};
// let b = {age:7}; 

// console.log( a == b );
// console.log( a === b );


// let assignEx = { name: "John" };

// let permissions1 = { canView: true };
// let permissions2 = { canEdit: true };


// Object.assign(assignEx, permissions1, permissions2);

// console.log(assignEx);



// let leaveForIn = {
//   name: "John",
//   age: 30
// };

// let clone = Object.assign({}, leaveForIn);

// console.log(clone);



// let objectMethod = {
//   sayHi: function(){
//     console.log("through function keyWord");
//   }
// }

// objectMethod.sayHi();




// let objectMethod_2 = {
//   sayHi(){
//     console.log("without function keyword");
//   }
// }

// objectMethod_2.sayHi();



// let thisEx = {
//   name : "Eric",
//   age: 23,

//   showDetail(){
//     console.log(`${this.name} is ${this.age} years old.`);
//   }
// }

// thisEx.showDetail();



// let thisEx_2 = {
//   name: "Bro",
//   age: 30,

//   sayHi() {
//     console.log(`${this.name}`);
//   }

// };


// let admin_2= thisEx_2;
// thisEx_2 = null; 

// console.log(admin_2.name);
// // console.log(thisEx_2.name);
// admin_2.sayHi();


// let firstThis = {name:"Desmond"};
// let secondThis = {name:"Ezio"};

// function callName(){
//   console.log(this.name);
// }
// firstThis.f = callName;
// secondThis.f = callName;


// firstThis.f();
// secondThis.f();

// console.log("----------");



// // Error - ref as a fucntion will work


// // function makeUser() {
// //   return {
// //     name: "John",
// //     ref: this
// //   };
// // }

// // let val = makeUser();

// // console.log( val.ref.name );



// // Create Calculator

// let calc = {
 
//   read : function() {
//     this.a = +prompt("a = ");
//     this.b = +prompt("b = ");
//   },

//   sum : function() {
//     return this.a + this.b;
//     },
//   mul: function() {
//     return this.a * this.b;
//   }
  
// }


// calc.read();
// console.log(calc.sum());
// console.log(calc.mul());



// // let ladder = {
// //   step: 0,
// //   up() {
// //     this.step++;
// //     return this;
// //   },
// //   down() {
// //     this.step--;
// //     return this;
// //   },
// //   showStep: function() { // shows the current step
// //     console.log( this.step );
// //     return this;
// //   }
// // };


// // ladder.up();
// // ladder.up();
// // ladder.down();
// // ladder.showStep(); 
// // ladder.down();
// // ladder.showStep();
// // ladder.up().up().showStep().down().showStep().down().showStep(); 



let user = { // belongs to another code
  name: "John"
};

let id = Symbol("id");

user[id] = 1;

console.log(user[id]);


{
let id = Symbol("id");

user[id] = "Their id value";
}

console.log(user);