// function x(){
//     let a = 7;
//     function y(){
//         console.log(a);
//     }
//     return y;
// }


// let z = x();
// console.log(typeof z);

// let prices = {
//     banana:1,
//     orange:2,
//     meat:4,
// };

// let doublePrices = Object.fromEntries(Object.entries(prices).map(entry=>[entry[0],2*entry[1]]));

// console.log(doublePrices);

// function something() {
//     var executed = false;
//     console.log("outerFunct");
//     if (!executed) {
//     return function() {
        
//             console.log("innerFunct")
//             executed = true;
//         }; 
//     };
// };

// const a = something();
// a();
// a();
// a();

// let {height, width, title} = { title: "Menu", height: 200, width: 100 }

// console.log(height);
// console.log(width);
// console.log(title);
// console.log(title);
function loadScript(src, callback) {
    let script = document.createElement('script');
    script.src = src;
    script.onload = () => callback(script);
    console.log("afiidasfuands")
    document.head.append(script);
  }
  
  loadScript('https://cdnjs.cloudflare.com/ajax/libs/lodash.js/3.2.0/lodash.js', script => {
    console.log(`Cool, the script ${script.src} is loaded`);
    console.log( _ ); 
  });

console.log("bro");

