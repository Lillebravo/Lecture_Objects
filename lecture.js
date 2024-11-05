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

const car = {
    emak: "Volvo",
    model: "V70",
    year: 2016,
    manualTransmission: true,
    start: function () {
      console.log("The car has started");
    },
  };
  
  for (const key in car) {
    console.log(key); // Will log the key.
  }
  
  for (const key in car) {
    const value = car[key];
    // console.log(`${key}: ${value}`);
    console.log(key + ": " + value);
  }