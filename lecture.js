"use strict"; // Makes the browser more annoying. It will check in more detail after restrictions and such things.

// const person = {
//   firstName: "Niklas",
//   lastName: "Fähnrich",
//   fullName: function () {
//     const fullName = this.firstName + " " + this.lastName;
//     console.log(fullName);
//   },
// };

// person.fullName();

// ########## Updating wrong attribute/creating a new one

// const car = {
//   make: "Volvo",
//   model: "V70",
//   year: 2016,
//   manualTransmission: true,
//   start: function () {
//     console.log("The car has started");
//   },
// };

// car.make = "Saab";
// car["year"] = 2020;

// console.log(car.make); // Saab
// console.log(car.year); // 2020

// car.Make = "BMW";

// console.log(car.make);
// console.log(car.Make);
// console.log(car);

// ########## For..in-loop ########## //

// const car = {
//   emak: "Volvo",
//   model: "V70",
//   year: 2016,
//   manualTransmission: true,
//   start: function () {
//     console.log("The car has started");
//   },
// };

// for (const key in car) {
//   console.log(key); // Will log the key.
// }

// for (const key in car) {
//   const value = car[key];
//   // console.log(`${key}: ${value}`);
//   console.log(key + ": " + value);
// }

// ########## Object.assign ########## //

// // Target object
// const person = {
//   name: "Niklas",
//   age: 40,
// };

// // Source object
// const personDetailedInfo = {
//   lastName: "Fähnrich",
//   occupation: "Developer",
//   age: 20,
// };

// console.log(person);
// console.log(personDetailedInfo);

// const updatedObject = Object.assign(person, personDetailedInfo);
// console.log(updatedObject);

// ########## Object.keys ########## //

const house = {
  color: "green",
  area: 200,
  address: "Drottninggatan",
  city: "Stockholm",
};

// const keys = Object.keys(house);
// console.log(keys);

// ########## Object.values ########## //

// const values = Object.values(house);
// console.log(values);

// ########## Object.entries ########## //

// const entries = Object.entries(house);
// console.log(entries);

// ########## Object.freeze ########## //

// const frozenHouse = Object.freeze(house);

// frozenHouse.color = "blue"; // Won't work, makes the attribute read-only
// frozenHouse.windows = 5; // Won't work, makes the object non-extensible

// console.log(frozenHouse);

// ########## Object.isFrozen ########## //

// const isFrozen = Object.isFrozen(frozenHouse);
// console.log("frozenHouse isFrozen? ", isFrozen);

// ########## Object.seal ########## //

// const car = {
//   make: "Saab",
//   model: "93",
//   color: "Silver",
// };

// const sealedCar = Object.seal(car);

// // car.transmission = "auto"; // won't work because of the seal.
// car.color = "red"; // Works just fine since color already exists.

// console.log(car);

// ########## Object.isSealed ########## //

// const carIsSealed = Object.isSealed(sealedCar);
// console.log(carIsSealed);

// ########## Spread syntax ########## //

// const car = {
//   make: "Saab",
//   model: "93",
//   color: "Silver",
// };

// const newCar = car;

// console.log("car:", car);
// // console.log(newCar);

// newCar.transmission = "auto";

// console.log("car:", car);
// // console.log(newCar);

// const anotherCar = { ...car };

// console.log("anotherCar:", anotherCar);

// car.transmission = "failed";

// console.log("car:", car);
// console.log("anotherCar:", anotherCar);

// ########## map() ########## //

// const numbers = [1, 2, 3, 4, 5, 6, 7, 8];

// const numbersDoubled = numbers.map((number) => {
//   return number * 2;
// });

// console.log(numbersDoubled);

// const numbersDoubledNot5 = numbers.map((number) => {
//   if (number === 5) {
//     return number; // return value unchanged
//   }

//   return number * 2;
// });

// console.log(numbersDoubledNot5);

// const volvo = {
//   make: "volvo",
//   model: "V90",
//   color: "green",
// };

// const saab = {
//   make: "saab",
//   model: "p3",
//   color: "blue",
// };

// const vw = {
//   make: "volkswagen",
//   model: "sharan",
//   color: "red",
// };

// // Add the objects to the array
// const cars = [volvo, saab, vw];

// const carsAllRed = cars.map((car) => {
//   if (car.color === "red") {
//     return car;
//   }

//   return { ...car, color: "red" };
// });

// console.log(carsAllRed);
// console.log(cars);

const numbers = [0, 1, 1, 1, 0, 1, 0];

// const allOnes = numbers.filter((number) => {
//   if (number === 0) {
//     return false;
//   }

//   return true;
// });

// console.log(allOnes);

const allOnes = numbers.filter((number) => number !== 0);

console.log(allOnes);