# Lecture_Objects
Lecture on objects 2024-11-05

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

[Back to top](#javascript-objects)

### Create Object

[Back to top](#javascript-objects)

### Properties

[Back to top](#javascript-objects)

### Custom Methods

[Back to top](#javascript-objects)

### "this" scope

[Back to top](#javascript-objects)

## Manipulating Objects

### Accessing properties and methods

[Back to top](#javascript-objects)

## Object Methods

This is basically different functions that are connected to objects in JavaScript, and all objects share these methods. A key differenc from arrays is that the array methods are available on the arrays themself. If you create an array, say `names`, if you use dot-notation on this variable all methods will be available for you. That's not the case with objects. These methods you acces by writing `Object` with a capital `O`. This `Object` is sort of the root class of all objects. Methods created in this way a called static methods. If you want read about those you can google after some information.

### Object.assign ( target, soruce ) => target object

[Back to top](#javascript-objects)

### Object.keys ( object ) => array

[Back to top](#javascript-objects)

### Object.values ( object ) => array

[Back to top](#javascript-objects)

### Object.entries ( object ) => array

[Back to top](#javascript-objects)

### Object.freeze ( object ) => object

[Back to top](#javascript-objects)

### Object.isFrozen ( object ) => boolean

[Back to top](#javascript-objects)

### Object.seal ( object ) => object

[Back to top](#javascript-objects)

### Object.isSealed ( object ) => boolean

### Spread syntax

[Back to top](#javascript-objects)