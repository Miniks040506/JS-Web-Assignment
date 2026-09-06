"use strict";
// strict mode is enabled for the entire script
// It can also be enabled for individual functions by placing 'use strict'; at the beginning of the function body

///////////////////////////////////////
// Activating Strict Mode
// Strict mode helps to write cleaner code and avoid some common mistakes.

// 1. Prevents the use of undeclared variables
// 2. Throws errors for certain actions that are otherwise ignored
// 3. Disallows duplicate parameter names in functions
// 4. Makes 'this' keyword behave more predictably

// let hasDriversLicense = false;
// const passTest = true;

// if (passTest) hasDriversLicense = true;
// if (hasDriversLicense) console.log("I can drive :D");


///////////////////////////////////////
// Functions
// Functions are reusable blocks of code that perform a specific task.

// // function declaration
// function logger() {
//   console.log("My name is Miniks");
// }

// logger();
// logger();

// // function with parameters
// function fruitProcessor(apples, oranges) {
//   const juice = `Juice with ${apples} apples and ${oranges} oranges.`;
//   return juice;
// }

// const juice = fruitProcessor(5, 2);
// console.log(juice);


///////////////////////////////////////
// Function Declarations vs. Expressions
// There are two main ways to define functions in JavaScript: function declarations and function expressions.


// Key differences:
// 1. Hoisting: Function declarations are hoisted, meaning they can be called before they are defined in the code. Function expressions are not hoisted.
// 2. Syntax: Function declarations use the 'function' keyword followed by the function name, while function expressions assign an anonymous function to a variable.


// Function Declaration
// const age2 = calcAge(2006);  // => Hoisting allows this to work even before the function is defined

// function calcAge(birthYear) {
//     return 2026 - birthYear;
// }

// const age = calcAge(2006);

// console.log(age, age2);


// Function Expression

// const age4 = calcAge2(2006);  // => This will work because the function expression is defined before this line

// const calcAge2 = function (birthYear) {
//     return 2026 - birthYear;
// }

// const age3 = calcAge2(2006);

// console.log(age3);


///////////////////////////////////////
// Arrow functions
// Arrow functions are a more concise syntax for writing function expressions.

//Syntax:
// const functionName = (parameters) => {
//   // function body
// };

// input params => output expression

// const calcAge3 = (birthYear) => 2026 - birthYear;  // => Implicit return for single expression

// console.log(calcAge3(2006));

// const yearsUntilRetirement = (birthYear, firstName) => {
//     const age = 2026 - birthYear;
//     const retirement = 65 - age;
//     return `${firstName} retires in ${retirement} years.`;
// }

// console.log(yearsUntilRetirement(2006, "Miniks"));
// console.log(yearsUntilRetirement(2000, "Yuk1na"));


///////////////////////////////////////
// Functions Calling Other Functions
// Functions can call other functions to perform more complex tasks.

// function cutFruitPieces(fruit) {
//     return fruit * 4;
// }

// function fruitProcessor(apples, oranges) {
//     const applePieces = cutFruitPieces(apples);
//     const orangePieces = cutFruitPieces(oranges);
    
//     const juice = `Juice with ${applePieces} pieces of apple and ${orangePieces} pieces of orange.`;
//     return juice;
// }

// console.log(fruitProcessor(2, 3));


///////////////////////////////////////
// Reviewing Functions
// const yearsUntilRetirement2 = function (birthYeah, firstName) {
//   const age = calcAge3(birthYeah);
//   const retirement = 65 - age;

//   if (retirement > 0) {
//     console.log(`${firstName} retires in ${retirement} years`);
//     return retirement;
//   } else {
//     console.log(`${firstName} has already retired 🎉`);
//     return -1;
//   }
// };

// console.log(yearsUntilRetirement2(2006, "Miniks"));
// console.log(yearsUntilRetirement2(2014, "Sarah"));


///////////////////////////////////////
// Introduction to Arrays
// Arrays are used to store multiple values in a single variable.
// Arrays can hold values of different data types, including numbers, strings, booleans, objects, and even other arrays.
// Arrays are zero-indexed, meaning the first element is at index 0, the second at index 1, and so on.
// Arrays have a fixed order, and elements can be accessed using their index.

// array literal syntax
// preferred way to create an array
// let friends = ["Michael", "Steven", "Peter"];
// console.log(friends);

// // oop
// // array constructor syntax
// const years = new Array(1991, 1984, 2008, 2020);
// console.log(years);

// // accessing array elements
// console.log(friends[0]);
// console.log(friends[2]);

// // getting the length of an array
// console.log(friends.length);
// console.log(friends[friends.length - 1]);  // last element


// Basic Array Operations (Methods)

// Adding elements
// const newLength = friends.push("Jay");  // adds element to the end
// console.log(friends);
// console.log(newLength);

// // unshift adds element to the beginning. unshift method add one or more elements to the beginning of an array and returns the new length of the array.
// const newLength2 = friends.unshift("John", "Emma", "Lisa");  // adds element to the beginning
// console.log(friends);
// console.log(newLength2);

// // pop() method removes the last element from an array and returns that element. This method changes the length of the array.
// const popped = friends.pop();  // removes last element
// console.log(friends);
// console.log(popped);

// // indexOf() method returns the first index at which a given element can be found in the array, or -1 if it is not present. 1|-1
// const index = friends.indexOf("Steven");
// console.log(index);
// const index2 = friends.indexOf("Bob");  // not found
// console.log(index2);

// includes(), shift(), slice(), splice(), concat(), join() are other useful array methods that can be explored for various operations on arrays.


///////////////////////////////////////
// Introduction to Objects
// Objects are used to store related data and functionality together.
// Objects consist of key-value pairs, where each key is a string (also called a property) and the value can be of any data type.
// Objects allow you to group related data and functions (methods) together, making it easier to manage and organize your code.
// Objects are unordered collections, meaning the order of properties is not guaranteed.
// If you call an object property that does not exist, it will return 'undefined'.


// Array vs. Objects
// Arrays are ordered collections of values, accessed by their index (numerical position).
// const miniksArray = [
//   "Miniks",
//   "Nguyen",
//   2026 - 2006,
//   "developer",
//   ["Michael", "Peter", "Steven"],
// ];

// Objects are unordered collections of key-value pairs, accessed by their keys (property names).
// Objects literal syntax
// const miniksObject = {
//   firstName: "Miniks",
//   lastName: "Nguyen",
//   age: 20,
//   job: "developer",
//   friends: ["Michael", "Peter", "Steven"],
// };

// // Object Construction Syntax
// const miniksObject2 = new Object();
// miniksObject2.firstName = "Miniks";
// miniksObject2.lastName = "Nguyen";
// miniksObject2.age = 20;
// miniksObject2.job = "developer";
// miniksObject2.friends = ["Michael", "Peter", "Steven"]; 

// console.log(miniksObject, miniksObject2);


//////////////////////////////////////////
// Accessing Object Properties
// Dot vs. Bracket Notation
// There are two ways to access properties of an object: dot notation and bracket notation.
// Dot notation is more concise and easier to read, while bracket notation is more flexible and allows for dynamic property access.
// Use dot notation when you know the property name at coding time.
// Use bracket notation when the property name is dynamic or stored in a variable.
// Bracket notation is also necessary when the property name contains spaces or special characters.

// console.log(miniksObject.lastName);  // Dot notation
// console.log(miniksObject["lastName"]);  // Bracket notation


// const nameKey = "Name";
// console.log(miniksObject["first" + nameKey]);
// console.log(miniksObject["last" + nameKey]);

// // add new properties to the object
// miniksObject.location = "Vietnam";
// miniksObject["twitter"] = "@miniks";
// console.log(miniksObject);

///////////////////////////////////////
// Object Methods
// Methods are functions that are stored as properties of an object.
// Methods allow objects to have behavior and perform actions using their own data.
// Methods can access and manipulate the object's properties using the 'this' keyword.
// The 'this' keyword refers to the current object instance and allows methods to access other properties and methods of the same object.

// This is useful for creating more dynamic and interactive objects.
// Methods are defined using function expressions or arrow functions as property values.
// Defining methods within objects allows for better organization and encapsulation of related functionality.


// const miniksObject3 = {
//     firstName: "Miniks",
//     lastName: "Nguyen",
//     birthYear: 2006,
//     job: "developer",
//     friends: ["Michael", "Peter", "Steven"],
//     hasDriversLicense: true,
    
//     calcAge: function () {
//         return 2026 - this.birthYear;
//     },
    
//     getSummary: function () {
//         return `${this.firstName} is a ${this.calcAge()}-year-old ${this.job}, and he has ${this.hasDriversLicense ? "a" : "no"} driver's license.`;
//     }   
// };

// console.log(miniksObject3.calcAge());
// console.log(miniksObject3.getSummary());

///////////////////////////////////////
// Iteration: The for Loop
// Loops are used to repeat a block of code multiple times.
// The for loop is a control structure that allows you to run a block of code a specific number of times.
// It consists of three main parts: initialization, condition, and increment/decrement.
// The loop will continue to run as long as the condition is true.
// After each iteration, the increment/decrement part is executed to update the loop variable.

// console.log('Lifting weights repetition 1 🏋️‍♀️');
// console.log('Lifting weights repetition 2 🏋️‍♀️');
// console.log('Lifting weights repetition 3 🏋️‍♀️');
// console.log('Lifting weights repetition 4 🏋️‍♀️');
// console.log('Lifting weights repetition 5 🏋️‍♀️');
// console.log('Lifting weights repetition 6 🏋️‍♀️');
// console.log('Lifting weights repetition 7 🏋️‍♀️');
// console.log('Lifting weights repetition 8 🏋️‍♀️');
// console.log('Lifting weights repetition 9 🏋️‍♀️');
// console.log('Lifting weights repetition 10 🏋️‍♀️');

// for loop keeps running while condition is TRUE
// for loop has 3 parts: initialization, condition, and increment/decrement
// initialization: let rep = 1 (starting point)
// condition: rep <= 30 (loop will run as long as this condition is true)
// increment: rep++ (increase rep by 1 after each iteration)
// the code block inside the loop will be executed 30 times
// each time, rep will have a different value from 1 to 30
// this is useful for repetitive tasks

// for (let rep = 1; rep <= 30; rep++) {
//   console.log(`Lifting weights repetition ${rep} 🏋️‍♀️`);
// }

// const miniksArray = [
//     "Miniks",
//     "Nguyen",
//     2026 - 2006,
//     "developer",
//     ["Michael", "Peter", "Steven"],
//     true,
// ];

// const types = [];

// for (let i = 0; i < miniksArray.length; i++) {
//     console.log(miniksArray[i], typeof miniksArray[i]);
//     types.push(typeof miniksArray[i]);
// }
// console.log(types);

// while loop is another type of loop that runs as long as a specified condition is true. It is useful when the number of iterations is not known beforehand. The syntax is: while (condition) { // code block }.

let rep = 1;
while (rep <= 10) {
  console.log(`Lifting weights repetition ${rep} 🏋️‍♀️`);
  rep++;
}
