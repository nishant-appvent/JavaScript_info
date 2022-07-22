// getname();

// var x = 7;

// function getname(){
//   console.log(`${x} kdlfja;`)
// }
// let counter = 0;

// let uniqueInteger = (function() { // Define and invoke
//   // let counter = 0;
//   // Private state of function
//   // below
//   return counter++; 
//   });
//   console.log(uniqueInteger()) // => 0
//   console.log(uniqueInteger()) // => 0
 

// console.log(NaN===NaN)
// console.log(NaN==NaN)
// console.log(null===null)
// console.log(null==null)
// console.log(undefined==undefined)
// console.log(undefined===undefined)
  // let a = 0

  // {
  //   // console.log(a);
  //   var b = 23;
  //   let a = 24;
  //   console.log(a);
  // }

  // console.log(a);

  // console.log(b);

  // let obj = {}
  // let obj2 = {}

  // console.log(obj==obj2)
  // console.log(obj===obj2)


  
  // let fruit = prompt("Which fruit to buy?", "apple");

  // let bag = {
  //   [fruit]: 5,
  // };
  
  // str = 'new' + 'sdfa';
  // console.log( 'new' + 'sdfa '  + String(3)); 
  

//   function makeUser(name, age) {
//     return {
//       name, 
//       age,
//     };
//   }

// let user = makeUser("wer","wqq");
// console.log(user);


// let obj = function() {
//   this.str= "v",
//   this.func = function(){
//     console.log(this.str + " random")
//   }
// };




// let val = new obj();
// obj.str = "f";
// obj.func();
// console.log(obj.str);


// findMax(1, 123, 500, 115, 44, 88);

// function findMax() {
//   let max = -Infinity;
//   console.log(arguments);
//   for (let i = 0; i < arguments.length; i++) {
//     if (arguments[i] > max) {
//       max = arguments[i];
//     }
//   }
//   return max;
// }



// let user = {
//   name: "John",
//   age: 30
// };

// user.sayHi = function() {
//   console.log("Hello!");
// };

// console.log(user)
// user.sayHi();


// let user = {
//   name: "John",
//   age: 30,

//   sayHi() {
//     console.log( this.name ); 
//   }

// };


// let admin = user;
// user = null;

// admin.sayHi();

// let user = { name: "John" };
// let admin = { name: "Admin" };

// function sayHi() {
//   console.log( this.name );
// }

// user.func = sayHi;

// user.func(); 

// console.log(user);

// function a(){
//   console.log(b);
// }

// var b = 90;{
// let b = 9;
// }

// a();

// function User(name){

//   this.name = name;
//   this.isAdmin = false;
//   this.sayHi = function(){
//     console.log(`Hi, ${this.name}`);
//   }
// }


// let desmond = new User("Desmond");

// desmond.sayHi();


// let fruits = ["Apple", "Orange", "Plum"];

// console.log( fruits );
// console.log(typeof fruits);


// let a = Number.MAX_VALUE;
// console.log(a);
// console.log(typeof a);

// let b = 11111111111111111111111111n;
// let c = 22222222222222222222222222222n;
// console.log(b+c);

//  let A=789135134281941148903271899219n;
//  let B=37210947109375090837149904109n
//   let z=A+B;
// console.log(String(z)==String(826346081391316239740421803328n));


// function bigSum(first, second){
//   if(first.length<=second.length){
//     let a = first;
//     first = second;
//     second = a;
//   }
//   let fullSum = "";
//   let carry = 0;
//   let lenDiff = second.length - first.length;
//   for(i=first.length-1;i>=0;i--){
//     let val = Number(first.charAt(i)) + Number(second.charAt(i + lenDiff))  + carry;
//     if(val>=10){
//       fullSum = val%10 + fullSum;
//       carry = Math.floor(val/10);
//     }
//     else{
//       fullSum = val + fullSum;
//       carry = 0;
//     }
//   }
//   if(carry){
//     fullSum = carry + fullSum;
//   }
//   return fullSum;
// }


// let B="789135134281941148903271899219";
// // console.log(B.length)
// let A="37210947109375090837149904109";
// // console.log(A.length)



// console.log(bigSum(A,B));


let a = ["THIS", " IS", " AN", " Array"]

console.log(String(a));
