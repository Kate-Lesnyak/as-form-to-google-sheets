import axios from "axios";

const BASE_URL_POST = import.meta.env.VITE_API_GOOGLE_SHEET_URL;
const BASE_URL_GET = import.meta.env.VITE_API_GOOGLE_SHEET_URL_GET;

const googleInstancePost = axios.create({
    baseURL: BASE_URL_POST,
});

const googleInstanceGet = axios.create({
    baseURL: BASE_URL_GET,
});

export const sendFormToGoogleSheet = async (formData) => {
    const { data } = await googleInstancePost.post('', formData);
    return data;
}

export const getFormToGoogleSheet = async () => {
    const { data } = await googleInstanceGet.get('');
    return data;
}

// var value = 0;

// function f() {
//  if (1) {
//  value = true;
//  } else {
//  var value = false;
//  }

//  alert( value );
// }

// f();

// 1.Will obj1.prop1 and obj2.prop1 refer to the same object?

// const obj0 = {};
// const obj1 = {
//  prop1: obj0
// };
// const obj2 = Object.assign({}, obj1);
// The code fragment cannot be interpreted
// Yes, but not in strict mode
// No
// Yes
// 2.Why will the value of the constant arr2 be undefined?

// const arr1 = [1, 3, 5, 7, 9];
// const arr2 = arr1.forEach(number => ++number);
// console.log(arr2); // undefined
// Because of all the above reasons
// Passed function doesn't contain 'return' keyword
// Arrow function cannot be used as an argument in forEach method
// forEach method always returns undefined
// 3.Which of the options will lead to an incorrect result?

// Given an array: [1, 2, 3, 4, 5]. Сalculate the sum of all elements.
// All options are correct
// var i = 0;var result = 0;do { result += a[i];} while (i++ < a.length - 1)
// var i = 0;var result = 0;for(;i < a.length;) { result += a[i++];}
// var i = 0;var result = 0;while(i++ < a.length - 1) { result += a[i];}
// 4.What will be displayed in the modal window as a result of the execution of the function f()?

// var value = 0;

// function f() {
//  if (1) {
//  value = true;
//  } else {
//  var value = false;
//  }

//  alert( value );
// }

// f();
// undefined
// false
// true
// 0
// 5.What will be logged to the console after execution?

// let some = {a: 7};

// function someFunc(obj) {
//  obj.a = 10;
// }

// someFunc(some);

// console.log(some.a);
// undefined
// 7
// 10
// 6.What will be logged to the console after execution?

// function myFunction(a) {
//  var b = 6;
//  return function(b) {
//  console.log(b, a)
//  }
// }
// var testFunction = myFunction(2)
// testFunction(3)
// 2 undefined
// 3 2
// 6 3
// undefined 2
// 6 undefined
// 7.What will be the value of secondVar after execution?

// var firstVar = 'foo'; 
// var secondVar; 
// switch(firstVar) { 
//  case 'foo': 
//  secondVar = 'bar'; 
//  case 'bar': 
//  secondVar = 'foo'; 
//  case 'foobar': 
//  secondVar = 'barfoo'; 
//  break; 
//  default: 
//  secondVar = 'foobar'; 
// } 
// null
// barfoo
// foobar
// bar
// foo
// 8.How can I use an SQL query to select from the People table all records with the value of the FirstName column equal to "Peter"?

// SELECT * FROM People WHERE FirstName<>'Peter'
// SELECT [all] FROM People WHERE FirstName='Peter'
// SELECT * FROM People WHERE FirstName='Peter'
// SELECT [all] FROM People WHERE FirstName LIKE 'Peter'
// 9.Which of the headers has the largest size?

// h0
// h8
// h6
// h1
// 10.Which style will make the element transparent but leave it in the DOM tree?

// visibility: invisilble
// color : rgba(0,0,0,0.5)
// display:none
// opacity:0