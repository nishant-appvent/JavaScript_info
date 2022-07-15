let user = {
  name: "Desmond",
  age: 12,
  "like birds": true
}

console.log(user);
console.log(user.isAdmin);

user.isAdmin = true;


console.log(user);
delete user.age;

console.log(user);
// console.log(a);


let key = prompt("What","name")
console.log(user[key]);