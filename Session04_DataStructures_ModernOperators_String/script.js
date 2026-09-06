// ============================================================
// TEACHING NOTE: Shared restaurant dataset
// KEY IDEA: Create reusable arrays, objects and methods for later lessons.
// The statements below come from the provided lesson source.
// Run one lesson section at a time to avoid duplicate const names.
// ============================================================
'use strict';

const weekdays = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];
const openingHours = {
    [weekdays[3]]: {
        open: 12,
        close: 22
    },
    [weekdays[4]]: {
        open: 11,
        close: 23
    },
    [weekdays[5]]: {
        open: 0,
        close: 24 // Open 24 hours
    },  
}; // ['thu']: {}  { name: kn_bel }
//syntax object: { key/name: value } -> js naming convention: A-Za-z0-9$_
//[weekends[3]] syntax = computed property name

const restaurant = {
    name: 'Khoi Nguyen Bel',
    location: '55 Le Loi, Ngai Giao, Ho Chi Minh, Viet Nam',
    categories: ['Pizzeria', 'Organic', 'Vegetarian', 'Italian'],
    starterMenu: ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad'],
    mainMenu: ['Pizza', 'Pasta', 'Risotto'],
    
    // openingHours: openingHours, 
    openingHours, //enhanced object literal -> ES6,
    
    // method shorthand trong object
    order(starterIndex, mainIndex) { 
        return [this.starterMenu[starterIndex], this.mainMenu[mainIndex]]; 
    },
    
    orderDelivery({ starterIndex = 1, mainIndex = 0, time = '20:00', address }) {
        console.log(
        `Order received! ${this.starterMenu[starterIndex]} and ${this.mainMenu[mainIndex]} will be delivered to ${address} at ${time}`
        );
    },

    orderPasta(ing1, ing2, ing3) {
        console.log(
        `Here is your declicious pasta with ${ing1}, ${ing2} and ${ing3}`
        );
    },

    orderPizza(mainIngredient, ...otherIngredients) { 
        //...sth : rest parameter : varargs (java) variable arguments String...
        console.log(mainIngredient);
        console.log(otherIngredients);
    },
    
};


// ============================================================
// TEACHING NOTE: Array destructuring
// KEY IDEA: Unpack array items into variables by position.
// The statements below come from the provided lesson source.
// Run one lesson section at a time to avoid duplicate const names.
// ============================================================
///////////////////////////////////////
// Array destructuring
// const arr = [2, 3, 4];
// const a = arr[0];
// const b = arr[1];
// const c = arr[2];

// const [x, y, z] = arr; // [x, y, z] = [2, 3, 4]
// console.log(x, y, z);
// console.log(arr);

// let [main, , secondary] = restaurant.categories;
// console.log(main, secondary);

// [main, secondary] = [secondary, main];
// console.log(main, secondary);

// const [starter, mainCourse] = restaurant.order(0, 2);
// console.log(starter, mainCourse);

// // Nested destructuring
// const nested = [2, 4, [5, 6]]; //3
// const [i, , [j, k]] = nested;
// console.log(i, j, k);

// // Default value
// const [p = 1, q = 2, r = 3] = [8, 9];
// console.log(p, q, r);


// ============================================================
// TEACHING NOTE: Object destructuring
// KEY IDEA: Unpack object properties by property name.
// The statements below come from the provided lesson source.
// Run one lesson section at a time to avoid duplicate const names.
// ============================================================
///////////////////////////////////////
// Destructuring Objects

// restaurant.orderDelivery({
//     time: '22:30',
//     address: 'Via del Sole, 21',
//     mainIndex: 2,
//     starterIndex: 2,
// });

// restaurant.orderDelivery({
//     address: 'D1, Fpt Hcm',
//     starterIndex: 1
// });

// const { name, categories } = restaurant;
// console.log(name, categories);

// const {
//     name: restaurantName,
//     openingHours: hours,
//     categories: tags
// } = restaurant;
// console.log(restaurantName, hours, tags);

// const { menu = [], starterMenu: starters = [] } = restaurant;
// console.log(menu, starters);

// Mutating variables --> gan lai bien da ton tai
// let a = 111;
// let b = 999;
// const obj = { a: 23, b: 7, c: 14};
// ({ a, b } = obj);
// console.log(a, b);

// const {
//     fri: { open: o, close: c},
// } = openingHours;
// console.log(o, c);


// ============================================================
// TEACHING NOTE: Spread operator
// KEY IDEA: Expand arrays, strings or object properties into a new context.
// The statements below come from the provided lesson source.
// Run one lesson section at a time to avoid duplicate const names.
// ============================================================
///////////////////////////////////////
// The Spread Operator (...)

// const arr = [7, 8 , 9];
// const badNewArr = [1, 2, arr[0], arr[1], arr[2]];
// console.log(badNewArr);

// // const newArr = [1, 2, arr]; // = [1, 2, [7, 8, 9]]
// const newArr = [1, 2, ...arr]; // ...arr -> truyen tuong duong tung phan tu thanh argument rieng
// console.log(newArr);

// const newMenu = [...restaurant.mainMenu, 'Gnocci'];
// console.log(newMenu);

// // copy array
// const mainMenuCopy = [...restaurant.mainMenu];
// // Join 2 arrays
// const menu = [...restaurant.starterMenu, ...restaurant.mainMenu];
// console.log(menu);

// const str = 'Jonas';
// const letters = [...str, ' ', 'S.'];
// console.log(letters);
// console.log(...str);

// ============================================================
// TEACHING NOTE: Rest pattern and parameters
// KEY IDEA: Collect remaining values into an array or object.
// The statements below come from the provided lesson source.
// Run one lesson section at a time to avoid duplicate const names.
// ============================================================
///////////////////////////////////////
// Rest Pattern and Parameters
// 1) Destructuring

// // SPREAD
// const arr = [1, 2, ...[3, 4]];
// console.log(arr);

// // REST
// const [a, b, ...others] = [1, 2, 3, 4, 5];
// console.log(a, b, others);

// const [pizza, pasta, ...ortherFood] = [
//     ...restaurant.mainMenu, // mo ra: pizza, pasta, risotto
//     ...restaurant.starterMenu, // spread -> mo ra
// ];
// console.log(pizza, pasta, ortherFood);

// // Objects 
// const { sat, ...weekday } = restaurant.openingHours;
// console.log(sat, weekday);

// // functions
// const add = function (...numbers) {
//     const sum = numbers.reduce((sum, num) => sum + num, 0);
//     console.log(sum);
// };

// add(2, 3, 4);

// const x = [23, 5, 7];
// add(...x);

///////////////////////////////////////
// Short Circuiting (&& and ||)

// console.log('---- OR ----');
// // Use ANY data type, return ANY data type, short-circuiting
// console.log(3 || 'Miniks'); // truthy va falsy
// console.log('' || 'Miniks');
// console.log(true || 0);
// console.log(undefined || null);

// console.log(undefined || 0 || '' || 'Hello' || 23 || null); //result: Hello

// restaurant.numGuests = 0;
// const guest1 = restaurant.numGuests ? numGuests : 10;
// console.log(guest1);

// const guest2 = restaurant.numGuests || 10;
// console.log(guest2);

// console.log('---- AND ----');
// console.log(0 && 'Miniks');
// console.log(7 && 'Kn Bel');

// console.log('Hello' && 23 && null && 'Miniks');

// console.log('Hello' && 23 && 7 && 'Miniks');

// if (restaurant.orderPizza) {
//     restaurant.orderPizza('mushrooms', 'spinach', 'salad', 'juice');
// }

// restaurant.orderPizza && restaurant.orderPizza('mushrooms', 'spinach', 'salad', 'juice');


// // OR thang dau tien dung (khac null, undefined, 0, '', NaN, false) -> stop and impl or final
// // AND thang dau tien sai -> stop and impl or final


// ///////////////////////////////////////
// // The Nullish Coalescing Operator(??)
// restaurant.numGuests = 0;
// const guests = restaurant.numGuests || 10;
// console.log(guests);

// // Nullish: null or undefined ---- phan biet voi ||
// const guestCorrect = restaurant.numGuests ?? 10;
// console.log(guestCorrect); // === 0 ?? 10 -> 

// console.log(null ?? 10);
// // ?? thang dau tien khac null hoac undefined -> stop va impl hoac final


///////////////////////////////////////
// Logical Assignment Operators (||=, ??=, &&=)
// const rest1 = {
//     name: 'Miniks',
//     numGuests: 0 
// };

// const rest2 = {
//     name: 'Kn Bel',
//     owner: 'Yuk1na'
// };

// rest1.numGuests = rest1.numGuests || 10; //result: 10
// rest2.numGuests = rest2.numGuests || 10; //10
// rest1.numGuests ||= 10; // 10
// rest2.numGuests ||= 10; // 10

//null or undefined
// rest1.numGuests ??= 10; //0
// rest2.numGuests ??= 10; //10

// rest1.owner = rest1.owner && '<ANONYMOUS>'; //rest1.owner
// rest2.owner = rest2.owner && '<ANONYMOUS>'; //<ANONYMOUS>
// rest1.owner &&= 'KN bel';
// rest2.owner &&= 'KN bel';

// console.log(rest1);
// console.log(rest2);


///////////////////////////////////////
// The for-of Loop

// spread , rest
// const menu = [...restaurant.mainMenu, ...restaurant.starterMenu];

// java (:) <-> js (of)
// for (const item of menu) {
//     console.log(item);
// }

// map java: luu key-value -> .entries -> cap key-value
// .entries() -> dung cho array: tao iterator gom cac cap [index, value]

// for (const [index, item] of menu.entries()) {
//     console.log(`${index + 1}. ${item}`);
// }

// console.log(...menu.entries()); //spread

///////////////////////////////////////
// Optional Chaining

// console.log(restaurant.openingHours.mon.open);
// if (restaurant.openingHours && restaurant.openingHours.mon) {
//     console.log(restaurant.openingHours.mon.open);
// }

// console.log(restaurant.openingHours?.mon?.open);
// const days = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];
// for (const day of days) {
//     const open = restaurant.openingHours[day]?.open ?? 'closed';
//     console.log(`On ${day}, we open at ${open}`);
// }

///////////////////////////////////////
// Looping Objects: Object Keys, Values, and Entries

// Properties NAMES
// const properties = Object.keys(openingHours);
// console.log(properties); // -> array chua cac key

// const values = Object.values(openingHours);
// console.log(values);

// // Entire object
// const entries = Object.entries(openingHours);
// console.log(entries); // -> array chua cac array [key, value {open, close}]

// for (const [day, { open, close }] of entries) {
//     console.log(`On ${day} we open at ${open} and close at ${close}.`);
// }



///////////////////////////////////////
// Sets
// const ordersSet = new Set([
//   'Pasta',
//   'Pizza',
//   'Pizza',
//   'Risotto',
//   'Pasta',
//   'Pizza',
// ]);
// console.log(ordersSet); // tap hop , ko trung 
// // Array la 1 iterable

// console.log(new Set('Miniks'))
// console.log(ordersSet.size);
// console.log(ordersSet.has('Pizza'));
// console.log(ordersSet.has('Bread'));
// ordersSet.add('Garlic Bread');
// ordersSet.add('Pasta');
// ordersSet.delete('Risotto');
// console.log(ordersSet);
// console.log(ordersSet.clear());
// console.log(ordersSet);

///////////////////////////////////////
// New Operations to Make Sets Useful!

// const italianFoods = new Set([
//   'pasta',
//   'gnocchi',
//   'tomatoes',
//   'olive oil',
//   'garlic',
//   'basil',
// ]);

// const mexicanFoods = new Set([
//   'tortillas',
//   'beans',
//   'rice',
//   'tomatoes',
//   'avocado',
//   'garlic',
// ]);

// const commonFoods = italianFoods.intersection(mexicanFoods);
// console.log('Intersection: ', commonFoods);

// const fusionFoods = italianFoods.union(mexicanFoods);
// console.log('Union: ', fusionFoods);

// console.log([...new Set([...italianFoods, ...mexicanFoods])]);

// const uniqueMexicanFoods = mexicanFoods.difference(italianFoods);
// console.log(uniqueMexicanFoods);

// const uniqueItalianFoods = italianFoods.difference(mexicanFoods);
// console.log(uniqueItalianFoods);

// const uniqueItalianMexicanFoods = italianFoods.symmetricDifference(mexicanFoods);
// console.log(uniqueItalianMexicanFoods);

// Dua theo toan tu union, inter....



///////////////////////////////////////
// Maps: Fundamentals

const rest = new Map();
rest.set('name', 'Miniks');
// rest.set('age', 20);
// console.log(rest.set('job', 'boss'));

rest
    .set('categories', ['Italian', 'Pizzaria', 'Vegetarian', 'Organic'])
    .set('open', 11)
    .set('close', 23)
    .set(true, 'We are open :D')
    .set(false, 'We are closed :(');
    
console.log(rest);

console.log(rest.get('name'));

const time = 8;
console.log(rest.get(time > rest.get('open') && time < rest.get('close'))); 
// 8 > 11 && 8 < 23 -> false && true -> false
//rest.get(false) -> We are closed :(


///////////////////////////////////////
// Maps: Iteration

const question = new Map([
  ['question', 'What is the best programming language in the world?'],
  [1, 'C'],
  [2, 'Java'],
  [3, 'JavaScript'],
  ['correct', 3],
  [true, 'Correct 🎉'],
  [false, 'Try again!'],
]); // truyen array vao map -> Iterable
console.log(question);

// convert object -> map
console.log(Object.entries(openingHours));
const hoursMap = new Map(Object.entries(openingHours));
console.log(hoursMap);

//String slice

const str = 'dsfnjagnjgnkj';
console.log(str.slice(4, 7)); //[)

const str2 = str.replace('ds', 'knbel');
console.log(str2);












