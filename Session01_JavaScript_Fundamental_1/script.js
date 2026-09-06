// let js = "JavaScript";
// if (js === "JavaScript") {
//     console.log("I love JavaScript!");
// }

// console.log(40 + 8 + 23 - 10);

// console.log("Miniks");

// console.log(20);


////////////////////////////////////
// Variables and Values
// Variable are container for storing data values. In JavaScript, we use the var, let and const keywords to declare variables.
// let firstName = "Miniks";
// let age = 20;
// const PI = 3.1415;
// console.log(firstName);
// console.log(age);
// console.log(PI);

// console.log("Hello " + firstName + ", you are " + age + " years old.");
// console.log(`Hello ${firstName}, you are ${age} years old.`); // Template Literals


////////////////////////////////////
// Variable name conventions
// Variable names cannot start with numbers or special characters except $ and _
// Variable names cannot be reserved keywords in JavaScript
// Variable names are case-sensitive

// let miniks_nguyen = "Miniks Nguyen";
// let $miniks = "Miniks";
// let _miniks = "Miniks";
// console.log(miniks_nguyen);
// console.log($miniks);
// console.log(_miniks);



////////////////////////////////////
// Data Types
// there are 7 primitive data types in JavaScript: string, number, boolean, null, undefined, symbol and bigint
// 1. Number
// 2. String
// 3. Boolean
// 4. Undefined
// 5. Null
// 6. Symbol
// 7. BigInt

// ! java - static type | javascript - dynamic type => static: TypeScript

// let jsIsFun = true;
// console.log(jsIsFun);

// console.log(typeof jsIsFun); // boolean
// console.log(typeof 23.3); // number
// console.log(typeof "Miniks"); // string

// jsIsFun = "YES!";
// console.log(typeof jsIsFun); // string

// console.log(typeof null); // object (this is a bug in JavaScript, null is not an object)

// let year;
// console.log(year); // undefined
// console.log(typeof year); // undefined

// year = 2026;
// console.log(typeof year); // number



////////////////////////////////////
// let, const and var
// let: can be reassigned, block-scoped
// const: cannot be reassigned, block-scoped
// var: can be reassigned, function-scoped (not recommended to use)
// block-scoped: variables declared with let and const are only accessible within the block they are defined in, while var is function-scoped, meaning it is accessible throughout the entire function it is defined in.
// function scoped: variables declared with var are only accessible within the function they are defined in, while let and const are block-scoped, meaning they are only accessible within the block they are defined in.


////////////////////////////////////
// Basic Operators

// Math operators
// +, -, *, / -> addition, subtraction, multiplication, division
// **, % -> exponentiation, modulus

// const now = 2026;
// const ageMiniks = now - 2006;
// const ageSarah = now - 2010;
// console.log(ageMiniks, ageSarah);
// console.log(ageMiniks * 2, ageMiniks / 10, 2 ** 3); // 2 ** 3 means 2 to the power of 3 = 2 * 2 * 2

// const first = "Miniks";
// const last = "Nguyen";
// console.log(first + " " + last); // string concatenation


// Assignment operators (=)
// +=, -=, *=, /= mean add, subtract, multiply, divide and assign the result to the variable
//example: a += 10 is equivalent to a = a + 10
// ++, -- -> increment, decrement

// let x = 10 + 5; // 15
// x += 10; // x = x + 10 = 25
// x *= 4; // x = x * 4 = 100
// x++; // x = x + 1 = 101
// x--; // x = x - 1 = 100
// console.log(x);


// Comparison operators (>, <, >=, <=)
// they return boolean values

// console.log(ageMiniks > ageSarah); // true
// console.log(ageSarah >= 18); // false

// const isFullAge = ageSarah >= 18;
// console.log(isFullAge); // false
// console.log(now - 2006 > now - 2010); // true


////////////////////////////////////
// Operator Precedence
// the order of operations
// 1. Parentheses
// 2. Exponents
// 3. Multiplication and Division
// 4. Addition and Subtraction
// 5. Assignment (=)
// 6. Comparison (>, <, >=, <=)
// MDN Operator Precedence table for reference



////////////////////////////////////
// Strings and Template Literals
// Template literals use backticks (` `) instead of quotes (" " or ' ')
// They allow us to embed expressions inside a string using ${expression}
// This makes it easier to create strings with dynamic content

// const fn = "Miniks";
// const job = "developer";
// const yob = 2006;
// const year = 2026;

// const miniks = "I'm " + fn + ", a " + (year - yob) + " years old " + job + "!";
// console.log(miniks);

// const miniks2 = `I'm ${fn}, a ${year - yob} years old ${job}!`;
// console.log(miniks2);

// console.log(`Just a regular string...`);

// console.log(
//     "String with \n\
// multiple \n\
// lines"
// );

// console.log(
//     `String with
// multiple
// lines`
// );


////////////////////////////////////
// Taking Decisions: if / else Statements

// const age = 15;
// if (age >= 18) {
//     console.log("Sarah can start driving license 🚗");
// } else {
//     const yearsLeft = 18 - age;
//     console.log(`Sarah is not old enough to drive 🚫. She has ${yearsLeft} years left until she can drive.`);
// }

// const birthYear = 2006;
// let century;

// if (birthYear <= 2000) {
//     century = 20;
// } else {
//     century = 21;
// }
// console.log(`Century: ${century}`);


////////////////////////////////////
// Type Conversion and Coercion

// type conversion
// manually convert from one data type to another
// example: string to number, number to string
// String(), Number()
// const inputYear = "2006";
// console.log(Number(inputYear), inputYear);
// console.log(Number(inputYear) + 18); // 2024

// console.log(Number("Miniks")); // NaN (Not a Number)
// console.log(typeof NaN); // number

// console.log(String(23), 23); // "23" 23


// type coercion
// JavaScript automatically converts data types when needed
// example: when we use + operator with a string and a number
// it converts the number to a string and concatenates them
// but with other operators like -, *, /, it converts strings to numbers
// and performs the operation

// console.log("I am " + 23 + " years old"); // "I am 23 years old"
// console.log("23" - "10" - 3); // 10
// console.log("23" * "2"); // 46
// console.log("23" / "2"); // 11.5    

// let n = "1" + 1; // "11"
// n = n - 1;  // 11 - 1 = 10
// console.log(n); // 10


////////////////////////////////////
// Truthy and Falsy Values

// 5 falsy values: 0, '', undefined, null, NaN
// everything else is truthy values
// we can use Boolean() to check the truthy or falsy value
// of a value

// console.log(Boolean(0)); // false
// console.log(Boolean(undefined)); // false
// console.log(Boolean("Miniks")); // true
// console.log(Boolean({})); // true
// console.log(Boolean("")); // false
// console.log(Boolean(null)); // false
// console.log(Boolean(Number("Miniks"))); // false

////////////////////////////////////
// Equality Operators: == vs. ===
// == -> loose equality operator (does type coercion)
// === -> strict equality operator (no type coercion)
// it's better to use === to avoid unexpected type coercion
// example:
// '18' == 18 -> true
// '18' === 18 -> false

// ages = "18";
// if (ages === 18) console.log("You just became an adult :D (strict)");

// if (ages == 18) console.log("You just became an adult :D (loose)");

// let favaorite = Number(prompt("What's your favorite number?"));
// console.log(favaorite);
// console.log(typeof favaorite);

// if (favaorite === 23) {
//     console.log("Cool! 23 is an amazing number!");
// } else if (favaorite === 7) {
//     console.log("7 is also a cool number");
// } else if (favaorite === 9) {
//     console.log("9 is also a cool number");
// } else {   
//     console.log("Number is not 23 or 7 or 9");
// }

// // != or !===

// if (favaorite !== 23) console.log("Why not 23?");


////////////////////////////////////
// Logical Operators
// && -> AND
// || -> OR
// ! -> NOT

// const hasDriversLicense = true; // A
// const hasGoodVision = true; // B

// console.log(hasDriversLicense && hasGoodVision); // true
// console.log(hasDriversLicense || hasGoodVision); // true
// console.log(!hasDriversLicense); // false

// if (hasDriversLicense && hasGoodVision) {  
//     console.log("Sarah is able to drive!");
// } else {
//     console.log("Someone else should drive...");
// }

// const isTired = false; // C
// console.log(hasDriversLicense && hasGoodVision && isTired); // false

////////////////////////////////////
// The switch Statement
// switch is used to perform different actions based on different conditions
// it's an alternative to using multiple if-else-if statements

const day = "wednesday";

switch (day) {
    case "monday": 
        console.log("Plan course structure");
        console.log("Go to coding meetup");
        break;
    case "tuesday":
        console.log("Prepare theory videos");
        break;
    case "wednesday":
    case "thursday":
        console.log("Write code examples");
        break;
    case "friday":
        console.log("Record videos");
        break;
    case "saturday":
    case "sunday":
        console.log("Enjoy the weekend :D");
        break;
    default:
        console.log("Not a valid day!");
}

// equivalent if-else statement
// should use switch statement for multiple discrete values
// and if-else for range of values or complex conditions
if (day === "monday") {
  console.log("Plan course structure");
  console.log("Go to coding meetup");
} else if (day === "tuesday") {
  console.log("Prepare theory videos");
} else if (day === "wednesday" || day === "thursday") {
  console.log("Write code examples");
} else if (day === "friday") {
  console.log("Record videos");
} else if (day === "saturday" || day === "sunday") {
  console.log("Enjoy the weekend :D");
} else {
  console.log("Not a valid day!");
}

////////////////////////////////////
// Statements and Expressions
// An expression is a piece of code that produces a value

3 + 4; // expression
1991; // expression
true && false && !false; // expression

// A statement is a larger piece of code that performs an action
// and does not produce a value
// Examples:
// if-else statement
// switch statement
// function declaration
if (23 > 10) {
  const str = "23 is bigger";
}

const me = "Miniks";
console.log(`I'm ${2026 - 2006} years old - ${me}`);


////////////////////////////////////
// The Conditional (Ternary) Operator
// it's the only operator that takes three operands
// syntax: condition ? expressionIfTrue : expressionIfFalse

const age = 23;
age >= 18
  ? console.log("I like to drink wine 🍷")
  : console.log("I like to drink water 💧");
  
  
