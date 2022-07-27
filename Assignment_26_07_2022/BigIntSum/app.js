// 1. String is Palindrome or Not
// function stringReverse(rootStr){
//   const myStr = rootStr.split("")
//   let n = myStr.length

//   let len = Math.floor(n/2)
//   for(let i=0;i<len;i++){
//       let a = myStr[i]
//       myStr[i] = myStr[n-i-1]
//       myStr[n-i-1] = a
//   }
//   let newStr = ""
//   for(let i=0;i<n;i++){
//       newStr += myStr[i]
//   }
//   return newStr
// }

// function palindromeStr(rootStr){
//   if (rootStr.toUpperCase()=== stringReverse(rootStr).toUpperCase()){
//       return true
//   }
//   return false
// }


// console.log(palindromeStr("Rotori"))


// 2. Convert Decimal to Binary

// function decToBin(n){
//   return n.toString(2);
// }

// function decToBin_2(n){
//   let strInt="";
//   let strDec="";
//   let decPart = n%1;
//   let i =0;
//   while(((decPart%1)!=0)&&(i!=10)){

//     decPart = decPart * 2;
//     strDec += Math.floor(decPart);
//     decPart = decPart % 1;
//     console.log(decPart);
//     i++;
//   }

//   // console.log(strDec);

//   n = Math.floor(n);
//   while(n){
//     strInt = n%2 + strInt;
//     n = Math.floor(n/2);
//   }
//   if(strDec){
//     strInt += "." + strDec;
//   }
//   return strInt;
// }

// console.log(decToBin_2(28.125));
// console.log(decToBin(28.125));


// 3. ASCII Value of Character Using charCodeAt()

// console.log("new String".charCodeAt(56));
// console.log("new String".charCodeAt());


// // 4.ASCII Value of Character Using codePointAt()

// console.log("new String".codePointAt(56));
// console.log("new String".codePointAt(1));


// 5. Sort Words in Alphabetical Order

// function sortWord(str){
//   let arr = str.split("");
//   arr.sort();

//   return arr.join("");
// }

// console.log(sortWord("agfowuelgfakd"));


// 6. Replace Characters of a String

// To replace first matching element
// console.log("adsfa".replace("a","x"))

// to replace every occurance
// function strReplace(str,a,b){
//   let newStr = str.split("")
//   for(let i=0;i<newStr.length;i++){
//     if(newStr[i]===a){
//       newStr[i] = b;
//     }
//   }
//   return newStr.join("");
// }
// console.log(strReplace("uisaphfdiewi","i","z"));


// 7. Reverse a String
// function stringReverse(rootStr){
//     const myStr = rootStr.split("")
//     let n = myStr.length
  
//     let len = Math.floor(n/2)
//     for(let i=0;i<len;i++){
//         let a = myStr[i]
//         myStr[i] = myStr[n-i-1]
//         myStr[n-i-1] = a
//     }
//     let newStr = ""
//     for(let i=0;i<n;i++){
//         newStr += myStr[i]
//     }
//     return newStr
//   }


// console.log(stringReverse("testString"));


// // 9. Check the Number of Occurrences of a Character in the String

// function charCount(str,a){
//   let i = 0;
//   for(let val of str){
//     if(val===a){
//       i++;
//     }
//   }
//   return i;
// }

// console.log(charCount("gkalkjdlkfanlnfla","k"));


// 10. Convert the First Letter of a String into UpperCase

// function firstLetterToUp(str){
//   let newStr = str.slice(0,1).toUpperCase() + str.slice(1);
//   return newStr; 
// }

// console.log(firstLetterToUp("afildue"))


// 11. Count the Number of Vowels in a String

// function checkVowel(str){
//   let vowels= new Set(["a","e","i","o","u"]);
//   let theCount = 0;
//   for(let char of str){
//     if(vowels.has(char)) theCount++;
//   }
//   return theCount;
// }

// console.log(checkVowel("education"))


// 12. remove a property from an object
// let user = {
//   name: "random",
//   age:23,
//   isAdmin:false
// }

// delete user.isAdmin;

// console.log(user);


// 13. Check Whether a String Starts and Ends With Certain Characters

// function checkChar(str,a,b){
//   if((str.charAt(0).toUpperCase()===a.toUpperCase())&&(str.charAt(str.length-1).toUpperCase()==b.toUpperCase())){
//     return "Both character Matches"
//   }
//   else if(str.charAt(0).toUpperCase()===a.toUpperCase()){
//     return "Only first character matches"
//   }
//   else if(str.charAt(str.length-1).toUpperCase()===b.toUpperCase()){
//     return "Only last character matches"
//   }

//   return "String doesn't start with the given characters"
// }


// console.log(checkChar("kjafsh","as","a"));


// 14. Check if a Key Exists in an Object
// let user = {
//     name: "random",
//     age:23,
//     isAdmin:false
//   }

// let key = "name"; 

// if(key in user){
//   console.log("Key exists in the object");
// }
// else{
//   console.log("Key doesn't exist in the object");
// }


// 15. Clone a JS Object
// Three ways to copy
// let user = {
//     name: "random",
//     age:23,
//     isAdmin:false
//   }

// let copyObj = Object.assign({},user);
// let anotherCopy = JSON.parse(JSON.stringify(user))
// let thirdCopy = {...user};
// user["isPresident"] = false;

// console.log(thirdCopy);
// console.log(anotherCopy);
// console.log(copyObj);
// console.log(user);


// 16. Loop Through Object Using for...in
// let user = {
//       name: "random",
//       age:23,
//       isAdmin:false
//     }

// for(let key in user){
//   console.log(`${key}---->${user[key]}`);
// }


// 17. Merge Property of Two Objects
// let user = {
//       name: "random",
//       age:23,
//       isAdmin:false
//     }

// let address = {
//   city: "Noida",
//   state: "Uttar Pradesh",
//   country: "India"
// }

// Object.assign(user,address);

// console.log(address);
// console.log(user);


// 18. Count the Number of Keys/Properties in an Object

// let user = {
//   name: "random",
//   age:23,
//   isAdmin:false,
//   city: "Noida",
//   state: "Uttar Pradesh",
//   country: "India"
//     }

//   let count = 0;

// for(let key in user){
//   count++;
// }

// console.log(count)


// 19. JavaScript parseInt()

// console.log(parseInt("432"));
// console.log(parseInt("032.332"));
// console.log(parseInt("134 43 3"));
// console.log(parseInt("  50 "));
// console.log(parseInt("10 keys"));
// console.log(parseInt("how 10"));


// 20. Arrow function in an object
// let sumObj = {
//   a: 8,
//   b: 9,
//   sum : ()=>(sumObj['a']+sumObj['b']) 
// }
// console.log(sumObj.sum());






// 22. Check if a String Starts With Another String

// function checkStart(str,substr){
//   let n = substr.length;
//   if(str.slice(0,n)===substr){
//     return true
//   }
//   return false
// }
// let a= "fjashkdf"
// let b= "fjas"
// console.log(checkStart(a,b))
// console.log(a.startsWith(b))



// 23. Program to Trim a String

// function trimString(str){
//   let i = 0;
//   let j = str.length
//   while(str[i]===" "){
//     i++;
//   }
//   while(str[j]===" "){
//     j--;
//   }

//   return str.slice(i,j);

// }
// console.log(Boolean(" "))
// a = " sasdfj    "
// console.log(a);
// console.log(trimString(a));
// console.log(a.trim());



// 24. Convert Object to String

// let user = {
//   name: "random",
//   age:23,
//   isAdmin:false,
//   city: "Noida",
//   state: "Uttar Pradesh",
//   country: "India"
//     }
// let stringObj = JSON.stringify(user);

// console.log(typeof stringObj);
// console.log(stringObj);


// 25. Remove a char from a String

// function removeChar(str, a){
//   let newStr= ""
//   for(let val of str){
//     if(val===a){
//       continue;
//     }
//     newStr += val;
//   }

//   return newStr;
// }

// console.log(removeChar
//   ("fdasawevafsdfae","e"));


// 28. Program to Perform Case Insensitive String Comparison

// function ignoreCaseComparison(str1,str2){
//   if(str1.toUpperCase()>str2.toUpperCase()){
//     return `${str1} is greater than ${str2}`;
//   }
//   else if((str1.toUpperCase()<str2.toUpperCase())){
//     return `${str2} is greater than ${str1}`;
//   }
//   else{
//     return "Both strings are equal";
//   }
// }

// console.log(ignoreCaseComparison("a","Ar"))
// console.log("a"<"Ar")


// 29. Pyramid star pattern in javascript
// function pyramid(n){
//   let fullString = "";
//   for(let i=1;i<=n;i++){
//     let partString = "";
//     let j=0;
//     while(j<Math.floor((n-i))){
//         partString += " ";
//         j++;
//       }
//     j= 0
//     while(j<(2*i-1)){
//       partString += "*";
//       j++;
//     }
    
  
//     j=0
//     while(j<Math.floor((n-i))){
//       partString += " ";
//       j++;
//   }
//   // console.log(partString);
//   fullString +=partString+ "\n";
//   }
//   return fullString
  
// }

// console.log(pyramid(5));



// 30. Reversed pyramid star pattern
function reversePyramid(n){
  let fullString = "";
  for(let i=n;i>=1;i--){
    let partString = "";
    let j=0;
    while(j<Math.floor((n-i))){
        partString += " ";
        j++;
      }
    j= 0
    while(j<(2*i-1)){
      partString += "*";
      j++;
    }
    j=0
    while(j<Math.floor((n-i))){
      partString += " ";
      j++;
  }
  // console.log(partString);
  fullString +=partString+ "\n";
  }
  return fullString  
}

console.log(reversePyramid(5));











