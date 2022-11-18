async function getData(){
    console.log("getData Started");
    let response = await fetch("https://api.github.com/users");
    console.log("Printing response");
    console.log(response);
    let userData = await response.json();
    console.log("users resolved");
    return userData; 
}


// console.log("Before getData");
let a = getData();
console.log("After getData assign");
console.log("printing data below");
// console.log(a);
a.then((data)=>console.log(data));
console.log("Function Ended");
