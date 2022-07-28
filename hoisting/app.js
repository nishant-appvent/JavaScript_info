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


// let a = ["THIS", " IS", " AN", " Array"]

// console.log(String(a));


// styles = ["Jazz ","Blues "];
// console.log(String(styles));
// styles.push("Rock-n-Roll ");
// console.log(String(styles));
// styles[1] = "Classics ";
// console.log(String(styles));
// styles.shift();
// console.log(String(styles));
// styles.unshift("Rap ", "Raggae ");
// console.log(String(styles));


// let arr = ["a", "b"];

// arr.push(function() {
//   console.log( this );
// });

// arr[2](); // ?


// function getMaxSubSum(arr){
//   let maxVal = -Infinity;

//   let nowMax = 0;
//   for(i=0;i<arr.length;i++){
//     nowMax+= arr[i];  
//     if(maxVal<nowMax){
//       maxVal = nowMax;
//     }
//     if(nowMax<0){
//       nowMax = 0;
//     }

//   }
//   console.log(maxVal);
//   return maxVal;
// }

// console.log(getMaxSubSum([-1, 2, 3, -9]) == 5);
// console.log(getMaxSubSum([2, -1, 2, 3, -9]) == 6);
// console.log(getMaxSubSum([-1, 2, 3, -9, 11]) == 11);
// console.log(getMaxSubSum([-2, -1, 1, 2]) == 3);
// console.log(getMaxSubSum([100, -9, 2, -3, 5]) == 100);
// console.log(getMaxSubSum([1, 2, 3]) == 6);

// let users = [
//   {id: 1, name: "John"},
//   {id: 2, name: "Pete"},
//   {id: 3, name: "Mary"}
// ];

// // returns array of the first two users
// let someUsers = users.filter(item => item.id < 3);

// console.log(someUsers); // 2

// arr = [1, -2, 15, 2, 0, 8];

// arr.sort(function(a, b) {
//   console.log( a + " <> " + b );
//   return a - b;
// });

// console.log(arr);



// let names = 'Bilbo Gandalf Nazgul';

// let arr = names.split(' ');

// console.log(arr);


let army = {
  minAge: 18,
  maxAge: 27,
  canJoin(user) {
    return user.age >= this.minAge && user.age < this.maxAge;
  }
};

// let users = [
//   {age: 16},
//   {age: 20},
//   {age: 23},
//   {age: 30}
// ];

// // find users, for who army.canJoin returns true
// let soldiers = users.filter(army.canJoin, army);

// console.log(soldiers);

// function camelize(str){
//   let arr = str.split("-");
  
//   for(let i = 0;i<arr.length;i++){
//   if(i==0){
//     continue;
//   }
//    arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
//   }
// return arr.join("");
// }



// console.log(camelize("background-color"))
// console.log(camelize("list-style-image") == 'listStyleImage');
// console.log(camelize("-webkit-transition"))


// function filterRange(arr,a,b) {

//   return arr.filter((item)=>item>=a&&item<=b);

// }


// function filterRangeInPlace(arr, a, b){
//   arr.forEach((item, index, array )=> {
//     // console.log(arr[item])
//     if(arr[index]<=a||arr[index]>=b){
//     arr.splice(index,1)
//   }
//   });
//   console.log(arr);
// }

// let arr = [5, 3, 8, 1];

// filterRangeInPlace(arr, 1, 4);

// // console.log( filtered ); // 3,1 (matching values)

// console.log( arr );


// let arr = [5, 2, 1, -10, 8];

// // ... your code to sort it in decreasing order

// arr.sort((a,b)=>b-a);

// console.log( arr );

// let arr = ["HTML", "JavaScript", "CSS"];

// let sorted = copySorted(arr);
// // to change

// alert( sorted ); // CSS, HTML, JavaScript
// alert( arr ); // HTML, JavaScript, CSS (no changes)

// let arrayLike = {
//   0: "Hello",
//   1: "World",
//   length: 2
// };

// let arr = Array.from(arrayLike); // (*)
// console.log(arr);



let newMap = new Map([[1,"sdfa"],["2","throughString"],['cucumber', 500],
['tomatoes', 350],
['onion',    50]]);

// newMap.set(1,"num1").set('1',"str1");

// for(let key of newMap.keys()){
//   console.log(`${key}----${newMap.get(key)}`);
// }

// console.log("<-------------->");

// for(let value of newMap.values()){
//   console.log(`${value}`);
// }

// console.log("<-------------->");

// for(let keyValues of newMap.entries()){
//   console.log(keyValues);
// }

// // console.log(newMap);

// newMap.forEach( (value, key, map) => {
//   console.log(`${key}: ${value}`); // cucumber: 500 etc
// });


// let prices = Object.fromEntries([
//   ['banana', 1],
//   ['orange', 2],
//   ['meat', 4]
// ]);

// // now prices = { banana: 1, orange: 2, meat: 4 }

// console.log(prices);


// function unique(arr) {
//   let val = new Set(arr);
//   return String(Array.from(val));
// }

// let values = ["Hare", "Krishna", "Hare", "Krishna",
//   "Krishna", "Krishna", "Hare", "Hare", ":-O"
// ];

// console.log( unique(values) ); // Hare, Krishna, :-O


// let map = new Map();

// map.set("name", "John");

// let keys = map.keys();

// console.log(keys)
// keys = Array.from(keys);

// // Error: keys.push is not a function
// keys.push("more");

// console.log(keys);

// import { cloneDeep } from '../node_modules/lodash-es/cloneDeep.js';
const _ = require("lodash"); 

var obj = {
    x: "user_1",
    address: {
      city:"Noida",
      country:"India"
    }
};

var deepCopy = _.cloneDeep(obj);

// deepCopy = Object.assign({},obj);
deepCopy.address.city = "Lucknow";

console.log(obj);
console.log(deepCopy);