function bigSum(first, second){
  if(first.length<=second.length){
    let a= first;
    first = second;
    second = a;  
  }
  let fullSum = '';
  let carry = 0;
  let lenDiff = second.length -first.length;
  // console.log(lenDiff);
  for(i= first.length-1;i>=0;i--){
    // console.log(first.charAt(i));
    // console.log(second.charAt(i+lenDiff));
    let val = (Number(first.charAt(i))%10) +
    (Number(second.charAt(i+lenDiff))%10) + carry;
  if (val>=10){
    fullSum = (val%10) + fullSum;
    carry = Math.floor(val/10);
  }
  else {
    fullSum = val + fullSum;
    carry = 0;
  }
}
  if(carry) {
    fullSum = carry + fullSum;

  }
  return fullSum;
}


let B="789135134281941148903271899219";
// console.log(B.length)
let A="37210947109375090837149904109";
// console.log(A.length)



console.log(bigSum(A,B));