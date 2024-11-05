# Lecture_Objects
Lecture on js objects 2024-11-05

<details>
<summary>Table of Contents</summary>

- [What is an object?](#what-is-an-object)

  - [Create Object](#create-object)
  - [Properties](#properties)
  - [Custom Methods](#custom-methods)
  - ["this" scope](#this-scope)

- [Manipulating Objects](#manipulating-objects)

  - [Accessing properties and methods](#accessing-properties-and-methods)
  - [Updating properties](#updating-properties)
  - [Removing properties and methods](#removing-properties-and-methods)

- [Looping through an Object](#looping-through-an-object)

- [Object Methods](#object-methods)
  - [Object.assign()](#objectassign--target-soruce---target-object)
  - [Object.keys()](#objectkeys--object---array)
  - [Object.values()](#objectvalues--object---array)
  - [Object.entries()](#objectentries--object---array)
  - [Object.freeze()](#objectfreeze--object---object)
  - [Object.isFrozen()](#obejectisfrozen--object---boolean)
  - [Object.seal()](#objectseal--object---object)
  - [Object.isSealed()](#objectissealed--object---boolean)
  - [Spread Syntax](#spread-syntax)

</details>

## What is an object?

An object can be described as its counterpart in real life. Take a car for example, it is an object and it has **properties** like make, model, color, engine, number of wheels and so on. It also has **methods**, (things you can do with the car), like starting the car, breaking, using the blinkers and such things.

All cars have these properties but different car of course has different values on these properties. Methods works the same way, all cars have them, although some cars might have extra methods (addons) that other cars don't have. But in general, you can do the same things with every car, like starting, like stopping and so on.

In JavaScript objects works in the same way. It has properties and methods. We have already been using objects during the last couple days without knowing about it.

**Arrays** are a type of object. It has at least one property that we know of, the `.length`. WHich represetnes the number of elements in the array. It also has methods, of which we know afew of them. `.push()`, `.pop()`, `.includes()`, `.map()` and so on. All these methods and properties are shared among all the arrays that we create in our programs.

**Strings** are also objects in JavaScript, it has properties, `.length` for example. It also has methods. We haven'nt used those yet but here is a link to more information about them: [String methods](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String). You can also try them out by creating a string and then adding a period and see what pops up.

[Back to top](#Lecture_Objects)

### Create Object
How do we create objects? It's ather easy, we need a variable nad we need a variable name. When we assign something we don't assign a value directly but we use a pair of curly brackets instead, and later we can populate it with data.

```js
const someObject = {};
```

This is an empty object. Best practise is to use `const` when declaring an object. Object are, like arrays, passed by reference, which means the variable is just a reference _( pointer )_ to the place on the hard drive where the actual data is stored.

[Back to top](#Lecture_Objects)

### Properties

Let's create a car instead, and fill it with some data:

```js
const car = {
  make: "Volvo",
  model: "V70",
  year: 2016,
  manualTransmission: true,
};
```

This car represents an object, and it has four properties. Each property represents some sort of information regarding the car. As you can see, the properties can have differnt data types and the structure comes in key-value-pairs. Keys to the left, and values to the right. Every property is seperated with a comma.


[Back to top](#Lecture_Objects)

### Custom Methods

An object can also have methods that represents some sort of action that the object can do. Methods are in reality just functions but as soon as a function is conntected to a specific object it becomes a method.

```js
const car = {
  make: "Volvo",
  model: "V70",
  year: 2016,
  manualTransmission: true,
  start: function () {
    console.log("The car has started");
  },
  changeGear: () => {
    console.log("Gear has been changed");
  },
};
```

[Back to top](#Lecture_Objects)

### "this" scope

`this` is keyword that refers to an object in JavaScript but what it is depends on the current context in which the `this` is used.

Different contexts:

- Alone, `this` refers to the global window object

- In "use strict" - mode, `this` would be undefined

- **In an object, `this` refers to the object itself**

- In a function `this` refers to the global object, unless it is created in another context.

- ...some other contexts as well

See this link for more detailed info: [w3schools - this](https://www.w3schools.com/js/js_this.asp)

The third context above is the one we are interested in.

```js
const person = {
  firstName: "Niklas",
  lastName: "Fähnrich",
  fullName: function () {
    const fullName = firstName + lastName;
    console.log(fullName);
  },
};

person.fullName();
```

In this example, `this` is used to refer to the object itself, it's own properties. If we don't use `this` inside the function's scope the function will look for the variables inside it's own scope, and since we don't have any definitions of the variables inside the function we will get a reference error. If the function doesn't find a definition of the varaible in its own scope it will look in the parent scope, which is outside of the object in this case.

[Back to top](#Lecture_Objects)

## Manipulating Objects

Objects are not locked or anything when we create them, they are very open for editing throughout our program.

### Accessing properties and methods

Accessing properties in an object can be done in three ways.

This first one is to use a period, it's commonly dot-notation.

```js
const car = {
  make: "Volvo",
  model: "V70",
  year: 2016,
  manualTransmission: true,
  start: function () {
    console.log("The car has started");
  },
};

// accessing the model property with dot-notation
console.log(car.model); // V70

// We can also store the value in a variable.
const modelOfCar = car.model;
console.log(modelOfCar); // V70
```

To access a method we can also use dot-notation but we also need to invoke the method.

```js
car.start(); // Will log "The car has started"
```

The second way is to use an array-like-syntax, using square brackets.

```js
console.log(car["make"]); // Volvo

// again, we also save to a variable
const carMake = car["make"];
console.log(carMake); // Volvo
```

It's important to use a string value inside the square braekts otherwise it won't work. The string must also be equal to an actual property of the given object.

If we don't use a string value, the it will look for an actual variable that is defined in the same scope, if that's not the case, or if the variable is of another type than string, it will be undefined.

```js
const carEngine = car["engine"];
console.log(carEngine); // undefined, since there is no key with that name inside the car object.

const carEngine = car[engine];
// won't work as well, since we are looking for a defined variable inside the scope, which we don't have.
```

The third way is to use something that is called "object destructuring".

```js
const car = {
  make: "Volvo",
  model: "V70",
  year: 2016,
  manualTransmission: true,
  start: function () {
    console.log("The car has started");
  },
};

const { make, model } = car;

console.log(make); // Volvo
console.log(model); // V70
```

We need to be careful here when destructuring. The typing of the properties that we want to destruct must be an exact match to the ones inside the object.

We could rename to variables if we want to:

```js
const { model: version, year: created } = car;

console.log(version); // V70
console.log(created); // 2016
```

This is useful when there is already an existing variable in the scope of the same name as one of the properties we want to destruct.

Accessing methods works the same way, you can use either of the three ways, just remember to invoke the method if you want to run it.

[Back to top](#Lecture_Objects)

### Updating properties

Updating properties is done in the same, use dot-notation or square brackets, rememeber to also use the assignment operator `=`.

```js
const car = {
  make: "Volvo",
  model: "V70",
  year: 2016,
  manualTransmission: true,
  start: function () {
    console.log("The car has started");
  },
};

car.make = "Saab";
car["year"] = 2020;

console.log(car.make); // Saab
console.log(car.year); // 2020
```

If you try and "update" something that doesn't exists. For instance, you might have spelled a property wrong, you will instead create a new property with that name and value.

```js
car.Make = "BMW";

console.log(make);
("Saab");
console.log(Make);
("BMW");

console.log(car);
```

This shows us that we can simply create ned attributs inside our object by just dot-notating a new attribute and give it some value. Although this works, it's not considered good practise so try and avoid it.

[Back to top](#Lecture_Objects)

### Removing properties and methods.

removing stuff from an object is easy. There is a keyword for it, `delete`, that we kan use whenever we feel like it. This is also considered bad practise so try and avoid it.

```js
const person = {
  firstName: "Niklas",
  lastName: "Fähnrich",
};

delete person.firstName;

console.log(persone); // firstName is removed.
```

[Back to top](#Lecture_Objects)

### Looping through an object

use case: when you want to iterate over the properties of an object, you use a for..in-loop. Almost identical to a for..of-loop but with using a different keyword in the middle.

```js
for (const key in object) {
  // Code to execute in each iteration.
}
```

Example with the car

```js
const car = {
  make: "Volvo",
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
```

This will just log out the different keys of the object. If we want the value of each key we do like this:

```js
for (const key in car) {
  const value = car[key];
  // console.log(`${key}: ${value}`);
  console.log(key + ": " + value);
}
```

Dot-notation doesn't work in this case and that is because `key` here is a dynamic value that changes in every iteration, and the value is the actual string value of the given key that is currently iterated over. When we use dot-notation, it looks for a property in a literal sense, which means the property `key` must exist on the object which it doesn't. Hence we must use the array-like-syntax.

[Back to top](#Lecture_Objects)

## Object Methods

This is basically different functions that are connected to objects in JavaScript, and all objects share these methods. A key differenc from arrays is that the array methods are available on the arrays themself. If you create an array, say `names`, if you use dot-notation on this variable all methods will be available for you. That's not the case with objects. These methods you acces by writing `Object` with a capital `O`. This `Object` is sort of the root class of all objects. Methods created in this way a called static methods. If you want read about those you can google after some information.

### Object.assign ( target, soruce ) => target object

[Back to top](#Lecture_Objects)

### Object.keys ( object ) => array

[Back to top](#Lecture_Objects)

### Object.values ( object ) => array

[Back to top](#Lecture_Objects)

### Object.entries ( object ) => array

[Back to top](#Lecture_Objects)

### Object.freeze ( object ) => object

[Back to top](#Lecture_Objects)

### Object.isFrozen ( object ) => boolean

[Back to top](#Lecture_Objects)

### Object.seal ( object ) => object

[Back to top](#Lecture_Objects)

### Object.isSealed ( object ) => boolean

### Spread syntax

[Back to top](#Lecture_Objects)