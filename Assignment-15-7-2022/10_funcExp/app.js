// 1. factorial of a number

function fact(n){
  if (n<=1){
  return 1;
}
return n*fact(n-1);
}


console.log(fact(5));


// 2. fibonacci Series

function fib(n){
  let a = 0;
  let b = 1;
  let c;
  let fibString = String(a) + ", " + String(b) + ', '; 
  for(let i=1; i<n-1;i++){
    c = a + b;
    a = b;
    b = c;
    if(i==n-2){
      fibString += String(b);
    }
    else{
    fibString += String(b) + ", ";
  } 
  }
  console.log(fibString);
}

fib(7);


//3. Prime Number

function primeNo(n){
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


console.log(primeNo(19));


// 4. Sum of two numbers

function sum(a, b){
  if ((typeof a == "number")&&(typeof b=="number")){
    return a+b;
  }
  return "Not a Number";
}

console.log(sum(4,7));


// 5. Multiply two numbers

function mul(a, b){
  if ((typeof a == "number")&&(typeof b=="number")){
    return a*b;
  }
  return "Not a Number";
}

console.log(mul(4,7));



// 6. Maximum in array

function maxInArr(arr){

  let max = null;
  for(let i = 0; i<arr.length; i++){
    if((max===null)||(max<arr[i])){
      max = arr[i];
    }
  }
  return max;
}

console.log(maxInArr([2,4,9,7, 1, -4, 8]))


// 7. Minimum in array 

function minInArr(arr){

  let min = null;
  for(let i = 0; i<arr.length; i++){
    if((min===null)||(min>arr[i])){
      min = arr[i];
    }
  }
  return min;
}

console.log(minInArr([2,4,9,7, 1, -4, 8]))


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
  let i = 0
  while(str[i]!=undefined){
    i++;
  }
  return i;
}

console.log(lenStr("Creed"));


// 12. Area of triangle

function areaTriangle(a, b, c){
  let s = (a+b+c)/2;
  return (s*(s-a)*(s-b)*(s-c))**(1/2);
}

console.log(areaTriangle(43,34,23));

// 13. Prime number till given number

function primeNoTon(n){
  let primeStr = ""
  for(let i=2; i<=n; i++){
    if(primeNo(i)){
      primeStr+= String(i) + ', ';
    }
  }
  console.log(primeStr);
}

primeNoTon(100);


// 14. SquareRoot of the no

function sqaurert(n){
  if(typeof n=="number"){
    return n**(1/2);
  }
  return "Not a number";
}

console.log(sqaurert(7));


// 15. Sort an array

function bubbleSort(arr){
  let n = arr.length
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

const arr2 =[2,4,9,7, 1, -4, 8,0];
bubbleSort(arr2);
console.log(arr2)