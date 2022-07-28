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

function something() {
    var executed = false;
    console.log("outerFunct");
    if (!executed) {
    return function() {
        
            console.log("innerFunct")
            executed = true;
        }; 
    };
};

const a = something();
a();
a();
a();



