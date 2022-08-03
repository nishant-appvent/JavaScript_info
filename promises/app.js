function promiseTut(){
    return new Promise(function(resolve,reject){
        setTimeout(() => {
                resolve();
                console.log("Checking...after resolve");
        },2000);
        
        setTimeout(() => {
                reject("From reject keyword")
                console.log("Checking...after reject")
            },1000);   
    })
}


promiseTut().then(function(){
    console.log("Resolve Executed");
}).catch(function(error){   
    console.log("Reject executed " + error);
})

console.log(1/0);
