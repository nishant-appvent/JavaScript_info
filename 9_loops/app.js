// const ex = {
//     one:"afdsjkhs",
//     two:{
//         inner:"val"
//     }
// }

// const sec = Object.assign({}, ex);;

// sec.two.inner = "newVal";
// sec.one = "sdkalfjlas"

// console.log("fda",ex);    
// console.log(sec);  
"use strict";
const obj = {
    prop: 42
  };
  
  Object.freeze(obj);
  
  obj.prop = 33;
  // Throws an error in strict mode
  
  console.log(obj.prop);

