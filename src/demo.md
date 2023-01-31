---
date: 2023-01-31T17:39:29+08:00
title: Demo
---

```JavaScript
// ECMAScript 6
// let and const declarations
let x = 10;
const y = 20;

// Arrow functions
const add = (x, y) => {
  return x + y;
};

// Classes
class Animal {
  constructor(name) {
    this.name = name;
  }
  speak() {
    console.log(`${this.name} makes a noise.`);
  }
}

// Template literals
let name = 'John';
console.log(`Hello, ${name}!`);

// Destructuring
let numbers = [1, 2, 3];
let [a, b] = numbers;

// Default parameters
const greet = (name = 'John') => {
  console.log(`Hello, ${name}!`);
};

// Spread operator
let numbers = [1, 2, 3];
let newNumbers = [...numbers, 4, 5];

// Promises
let promise = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('Done!');
  }, 1000);
});

promise.then(result => console.log(result));
```

```Rust
use std::{
    collections::HashMap,
    io::{self, Write},
    ops::{Deref, DerefMut},
};

fn main() -> io::Result<()> {
    let mut map = HashMap::<String, String>::new();
    map.insert("key1".to_string(), "value1".to_string());
    map.insert("key2".to_string(), "value2".to_string());

    let mut vec = vec![1, 2, 3];
    vec.push(4);
    vec.push(5);

    let mut mut_str = String::from("Hello, Rust!");
    mut_str.push_str(" Welcome to the Rust world!");

    let mut mut_ref = &mut mut_str;
    mut_ref.deref_mut().push_str(" Have fun!");

    println!("Map: {:?}", map);
    println!("Vec: {:?}", vec);
    println!("String: {}", mut_ref.deref());

    writeln!(io::stdout(), "Done!")?;

    Ok(())
}

fn main() {
    // Variable declaration
    let x = 5;

    // Constants
    const MAX_VALUE: u32 = 100_000;

    // Control Flow
    if x < 10 {
        println!("x is less than 10");
    } else {
        println!("x is greater than 10");
    }

    // Loops
    for i in 0..10 {
        println!("{}", i);
    }

    // Iterators
    let mut v = vec![1, 2, 3];
    for i in &mut v {
        *i += 10;
    }
    println!("{:?}", v);

    // Functions
    fn add_one(x: i32) -> i32 {
        x + 1
    }
    println!("{}", add_one(x));

    // Structs
    struct Point {
        x: i32,
        y: i32,
    }
    let p = Point { x: 5, y: 10 };
    println!("Point x: {}, y: {}", p.x, p.y);

    // Enums
    enum Color {
        Red,
        Green,
        Blue,
    }
    let c = Color::Green;
    println!("Color is {:?}", c);

    // Traits
    trait Shape {
        fn area(&self) -> f64;
    }
    struct Rectangle {
        width: f64,
        height: f64,
    }
    impl Shape for Rectangle {
        fn area(&self) -> f64 {
            self.width * self.height
        }
    }
    let rect = Rectangle { width: 3.0, height: 4.0 };
    println!("Area of Rectangle is {}", rect.area());

    // Generics
    fn largest<T: PartialOrd + Copy>(list: &[T]) -> T {
        let mut largest = list[0];
        for &item in list.iter() {
            if item > largest {
                largest = item;
            }
        }
        largest
    }
    let numbers = vec![34, 50, 25, 100, 65];
    let result = largest(&numbers);
    println!("The largest number is {}", result);

    // Macros
    macro_rules! create_function {
        ($func_name:ident) => {
            fn $func_name() {
                println!("You called {:?}()", stringify!($func_name));
            }
        }
    }
    create_function!(foo);
    foo();
}
```

```typescript
// Here is a demo code that covers all TypeScript syntax:

// Declaring Variables
let myNumber: number = 5;
let myString: string = "Hello World!";
let myBoolean: boolean = true;
let myArray: number[] = [1,2,3,4,5];
let myTuple: [string, number] = ["Hello", 5];
let myAny: any = 5;
let myVoid: void = undefined;
let myNull: null = null;
let myUndefined: undefined = undefined;

// Functions
function add(num1: number, num2: number): number {
  return num1 + num2;
}

// Classes
class Car {
  name: string;
  year: number;

  constructor(name: string, year: number) {
    this.name = name;
    this.year = year;
  }
}
let myCar = new Car("Ford", 2020);

// Interfaces
interface Vehicle {
  name: string;
  year: number;
}

function getVehicle(vehicle: Vehicle) {
  console.log(`Name: ${vehicle.name}, Year: ${vehicle.year}`);
}

getVehicle(myCar);

// Generics
function genericFunc<T>(arg: T): T {
  return arg;
}

let myGenericNumber = genericFunc<number>(5);
```

```python
# Demonstration of Python Syntax, Features, and Concepts

# Comments
# This is a comment

# Variables
my_variable = 10

# Data Types
my_string = "Hello World!" # String
my_int = 10 # Integer
my_float = 10.5 # Float
my_list = [1, 2, 3] # List
my_tuple = (1, 2, 3) # Tuple
my_dict = {"key1": "value1", "key2": "value2"} # Dictionary

# Control Flow
if my_variable == 10:
  print("my_variable is 10")
elif my_variable > 10:
  print("my_variable is greater than 10")
else:
  print("my_variable is less than 10")

# Loops
for i in range(0, 10):
  print(i)

while my_variable > 0:
  print(my_variable)
  my_variable -= 1

# Functions
def my_function(param1):
  print(param1)

my_function("Hello World!")

# Classes
class MyClass:
  def __init__(self, param1):
    self.param1 = param1

  def my_method(self):
    print(self.param1)

my_class = MyClass("Hello World!")
my_class.my_method()

# Exceptions
try:
  my_variable += "Hello World!"
except TypeError:
  print("Unable to add string to integer")

# Modules
import math

print(math.pi)
```
