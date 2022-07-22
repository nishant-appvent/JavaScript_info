// 1. factorial of a number

function fact(n){
  if((typeof n !="number")||(n<0)){
    return "Please provide a valid number"
  }
  if (n<=1){
  return 1;
}
return n*fact(n-1);
}


console.log(`factorial = ${fact(3)}`);

// 2. fibonacci Series

function fib(n){
  if((typeof n !="number")||(n<=0)){
    console.log("Please provide a valid number");
  }
  if(n==1){
    console.log("0");
    return ;
  } 
  let a = 0;
  let b = 1;
  let c;
  let fibString = String(a) + ", " + String(b) + ', '; 
  for(let i=1; i<n-1;i++){
    c = a + b;
    a = b;
    b = c;

    fibString += String(b) + ", ";
  
  }
  console.log(`fibonacci = ${fibString.slice(0,fibString.length-2)}`);
}

fib(6);


//3. Prime Number

function primeNo(n){
  if(typeof n !="number"){
    return "Please provide a valid number"
  }
  
  if (n==2){
      return true;
  }
  if ((n%2===0)||(n<2)||n===null){
  return false; }
  let m = Math.floor(Math.sqrt(n));
  for(let i = 3; i<=m;i+=2){
      if (n%i===0){
          return false;
      }
  }
  return true;
}


console.log(`Prime number = ${primeNo(3)}`);


// 4. Sum of two numbers

function sum(a, b){
  if((typeof a =="number")&&(typeof b =="number")){
    return a +b;
  }
  return "Not a Number";
}

console.log(`Sum is ${sum(3,7)}`);


// 5. Multiply two numbers

function mul(a, b){
  if((typeof a =="number")&&(typeof b =="number")){
    return a*b;
  }
  return "Not a Number";
}
console.log(`Multiply is ${mul(3,7)}`);



// 6. Maximum in array

function maxInArr(arr){
  
  let max = null;
  for(let i = 0; i<arr.length; i++){
    if(typeof (arr[i])!="number"){
      return "Please provide a valid array."
    }
    if((max===null)||(max<arr[i])){
      
      max = arr[i];
    }
  }
  return max;
}

console.log(`Maximum of array is ${maxInArr([2,4,9,7, -4, 8])}`)


// 7. Minimum in array 

function minInArr(arr){

  let min = null;
  for(let i = 0; i<arr.length; i++){
    if(typeof (arr[i])!="number"){
      return "Please provide a valid array."
    }
    if((min===null)||(min>arr[i])){
      min = arr[i];
    }
  }
  return min;
}


console.log(`Minimum of array is ${minInArr([2,4,9,7, -4, 8])}`)

// 8. Search a number in an array

function findInArr(arr, a){
  for(let i = 0; i<arr.length; i++){
    if(a===arr[i]){
      return true;
    }
  }

  return false;
}

console.log(findInArr([2,4,9,7, 1, -4, 8],0))


// 9. Reverse Array of Strings

function reverseArr(arr){
  let n = arr.length;
  for(let i=0;i<Math.floor(n/2);i++){
    let a = arr[i];
    arr[i] = arr[n-i-1];
    arr[n-1-i] = a;
  }
}

const arr1 = ["aafd","fads","fadafga","ahrhs","dagbn","dkja"];
reverseArr(arr1);
console.log(arr1);


// 10. length of Array
function lenArr(arr){
  let i = 0
  while(arr[i]!=undefined){
    i++;
  }
  return i;
}

console.log(lenArr(arr1));

// 11. length of String
function lenStr(str){
  if(typeof str =="string"){
  let i = 0
  while(str[i]!=undefined){
    i++;
  }
  return i;
}
return "Argument should be string"
}

console.log(lenStr(121));


// 12. Area of triangle

function areaTriangle(a, b, c){
  
  let s = (a+b+c)/2;
  let area = (s*(s-a)*(s-b)*(s-c))**(1/2);
  if (isNaN(area)){
    return "Triangle not possible";
}

  return area;
}

console.log(areaTriangle(71,4,2));

// 13. Prime number till given number

function primeNoTon(n){
  if (typeof n != "number"){
    
    console.log("Please Provide a valid number");
    return;
  }
  let primeStr = ""
  for(let i=2; i<=n; i++){
    if(primeNo(i)){
      primeStr+= String(i) + ', ';
    }
  }

  primeStr = primeStr.slice(0,primeStr.length-2);

  console.log(primeStr);
}

primeNoTon(9);


// 14. SquareRoot of the no

function sqaurert(n){
  if((typeof n !="number")||(n<0)){
    
    return "Please Provide a valid number";
  }
  if(typeof n=="number"){
    return n**(1/2);
  }
  return "Not a number";
}

console.log(sqaurert(0));


// 15. Sort an array

function bubbleSort(arr){
  let n = arr.length
  for(let i=0;i<n;i++){
    if(typeof (arr[i])!="number"){
      console.log("Please provide a valid array or the array will not change.");
      return
    }
  }
  for(let i= 0; i<n-1; i++){
    for(let j=0; j<n-1-i; j++){
      if(arr[j]>arr[j+1]){
        let a = arr[j];
        arr[j] = arr[j+1];
        arr[j+1] = a;
      }
    }
  }
}

const arr2 =[2,4,9,"", 1, -4, 8,0];
bubbleSort(arr2);
console.log(arr2)



