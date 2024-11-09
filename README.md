# Lecture_Objects
Lecture on js objects 2024-11-05

<details open>
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

- [Array methods, with callbacks](#array-methods-with-callbacks)

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

[Back to top](#javascript-objects)

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

## Object Methods

This is basically different functions that are connected to objects in JavaScript, and all objects share these methods. A key differenc from arrays is that the array methods are available on the arrays themself. If you create an array, say `names`, if you use dot-notation on this variable all methods will be available for you. That's not the case with objects. These methods you acces by writing `Object` with a capital `O`. This `Object` is sort of the root class of all objects. Methods created in this way a called static methods. If you want read about those you can google after some information.

### Object.assign ( targetObject, sourceObject, sourceObject... ) => targetObject

If we have two objects that we want to merge with eachother we can use .assign. It takes all the attributes from the source object in this case and put them in the target object.

If any of the attributes in source already exist in target, then those attribute will just be replaced, otherwise added.

```js
// Target object
const person = {
  name: "Niklas",
  age: 40,
};

// Source object
const personDetailedInfo = {
  lastName: "Fähnrich",
  occupation: "Developer",
};

console.log(person);
console.log(personDetailedInfo);
```

Let's merge them together.

```js
const updatedObject = Object.assign(person, personDetailedInfo);

console.log(updatedObject);
```

Remember when we create the new variable `updatedObject` it will still be a reference to the same object that we created before. We just take the reference from the `person` object and store it in the `updatedValue` variable.

Think of it like a remote that controls a tv. The only thing we do here is to create another remote that controls the same tv. This is something called **Passed by reference**.

[Back to top](#Lecture_Objects)

### Object.keys ( object ) => array

This will take all the keys from an object and return it as an array.

```js
const house = {
  color: "green",
  area: 200,
  address: "Drottninggatan",
  city: "Stockholm",
};

const keys = Object.keys(house);
console.log(keys);
```

[Back to top](#Lecture_Objects)

### Object.values ( object ) => array

Does the same as Object.keys but it instead returns an array of the values.

```js
const values = Object.values(house);
console.log(values);
```

[Back to top](#Lecture_Objects)

### Object.entries ( object ) => array

Works simliar to both of the previous ones. It returns an array but each element in that array is another array containg both the key and the value.

```js
const entries = Object.entries(house);
console.log(entries);
```

[Back to top](#Lecture_Objects)

### Object.freeze ( object ) => object

This method will freeze the object which means we can no longer edit the values of the attributes and we can not delete or add attributes to the object.

```js
const frozenHouse = Object.freeze(house);

frozenHouse.color = "blue"; // Won't work
frozenHouse.windows = 5; // Won't work
```

[Back to top](#Lecture_Objects)

### Object.isFrozen ( object ) => boolean

Checks if the object in question is frozen or not.

```js
const isFrozen = Object.isFrozen(frozenHouse);
console.log("frozenHouse isFrozen? ", isFrozen);
```

[Back to top](#Lecture_Objects)

### Object.seal ( object ) => object

This will seal the object, so no new attributes can be created and no attributes can be removed. But we can still edit the existing ones.

```js
const car = {
  make: "Saab",
  model: "93",
  color: "Silver",
};

const sealedCar = Object.seal(car);

car.transmission = "auto";
car.color = "red";
```

[Back to top](#Lecture_Objects)

### Object.isSealed ( object ) => boolean

Checks if an object is sealed or not.

```js
const carIsSealed = Object.isSealed(sealedCar);
console.log(carIsSealed);
```

[Back to top](#Lecture_Objects)

### Spread syntax

Works similar to Object.assign. You can use it to merge objects, copy objects, in other words, you can "spread" the attribtues of an existing object in to something else.

```js
const car = {
  make: "Saab",
  model: "93",
  color: "Silver",
};

const newCar = {};

console.log(car);
console.log(newCar);
```

Here we just created two different object, and they are distinct different, which means they have different references. They point towards different places on the hard drive.

If we want to add properties to newCar, we can do that since it's a seperated object from car. Nothing strange there.

But if we want to copy an object in to a new object, we can use this spread syntax and ge two distinct different objects. An example if we don't use spread syntax and try to copy something.

```js
const newCar = car;
```

By doing like this, we will just take the reference that is stored in car and put it in newCar. newCar will in other words just point at the same place on the hard drive. If we are adding properties to the newCar variable, the car variable will get the same properties.. Since they are the same. Again, objects are passed by reference, not value.

```js
const anotherCar = { ...car };
```

This on the other hand will create a copy of the object and the new object will have its own reference.

[Back to top](#Lecture_Objects)

## Array methods, with callbacks

To begin with, what is a callback? In the end it's just a function, and if a functions is used as a parameter it is normally called a callback function.

All of these methods are executing a loop behind the scenes on the array on which the method as invoked. In each itereation of that loop, the callback function will run. So look at a callback as a set of instructions that is being executed in each iteration of the loop behind the scenes. This callback interacts with the element that is being iterated over.

### map( callback(element, index?) ) => array that has been modified according to the callback

This method is used to modify the objects inside an array and return the modified objects in a new array. You can modify one, several or all of the objects in the array.

Let's do an example with numbers:

```js
const numbers = [1, 2, 3, 4, 5, 6, 7, 8];

const numbersDoubled = numbers.map((number) => {
  return number * 2;
});

console.log(numbersDoubled);
```

The above modifies every number but you don't have to do that. Let's modify every number except number 5.

```js
const numbersDoubledNot5 = numbers.map((number) => {
  if (number === 5) {
    return number; // return value unchanged
  }

  return number * 2;
});
```

As you can see here, we must always return something in every iteration, and the map function will loop through the entire array every time. So depending on what you want to do, you need to defined the callback function accordingly.

Let's do an example with objects.

```js
const volvo = {
  make: "volvo",
  model: "V90",
  color: "green",
};

const saab = {
  make: "saab",
  model: "p3",
  color: "blue",
};

const vw = {
  make: "volkswagen",
  model: "sharan",
  color: "red",
};

// Add the objects to the array
const cars = [volvo, saab, vw];

const carsAllRed = cars.map((car) => {
  if (car.color === "red") {
    return car;
  }

  return { ...car, color: "red" };
});

console.log(carsAllRed);
console.log(cars);
```

[Back to top](#Lecture_Objects)

### filter( callback(element, index?) ) =>the filtered array

This method is used to filter an array. It will filter the array depending on the return value of the callback which must always be a boolean.

Example:

```js
const numbers = [0, 1, 1, 1, 0, 1, 0];

const allOnes = numbers.filter((number) => {
  if (number === 0) {
    return false;
  }

  return true;
});
```

Above we are filtering out all the 0:s, this is done by either returning false or true in each iteration. We can shorten this syntax by doing something called an explict return instead of an implicit return. The above example is an explict return.

The implicit return looks like this.

```js
const numbers = [0, 1, 1, 1, 0, 1, 0];

const allOnes = numbers.filter((number) => numbers !== 0);

console.log(numbers);
```

forEach()
reduce()
every()
some()
find()

[Back to top](#Lecture_Objects)
