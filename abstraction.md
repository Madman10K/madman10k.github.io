# Abstraction
I have been making a game engine for the past year and in the last 3 months one of the most important skills I learned was abstraction
Abstraction is where you create an archutecture where you try to hide implementation details. It is usually used in things like libraries and frameworks where there may be users or other teams that do not engineer the API and don't know it.
## Abstract classes
So everyone knows about classes having visbility which can hide functions and variables that outside classes may not need to use or see.
But it doesn't end there because in C++ there is a feature in C++ called abstract classes but first let's talk about virtual functions real quick
### Virtual functions
Virtual functions are functions which can be overriden by class derivatives and it's important that some people will really hate on you for using them because they are stored in a vtable which can slow down performance a little bit
### Pure virtual functions
Now that we know what virtual functions are we can now move to pure virtual functions or interfaces. These functions do not hold any functionality in the base class which makes the base xlass impossible to instantiate. This means that this root class that contains these functions is now an abstract class.
So abstract classes are useful for a couple of reasons but the main 3 are listed below
- You can pass in any derivative by just using a root class pointer as an argument
- Requides you to create class derivatives
- Functionality is guaranteed in overriden functions

Now you can see how this may be very useful. Suppose we have a class called ScriptableObject. Any function that takes a ScriptableObject pointer can then use any derrivative class which can create cool systems such as an event system where we store all scriptable objects are we call their update, create and destroy events
## typedef and using
Now let's go to the type system. In C++ we have 2 keywords that can create new type that is another type, similar to trying to use macros. Keywords are listed below
- typedef
- using

This is very useful for hiding tyoes from other libraries or in situations where types are ugly and unreadable such as C function pointers
### typedef
`typedef` is a C keyword that just creates a new type that is another type. In the exaple below we create the type `int32` from `int`
```cpp
typedef int int32;
```
However `typedef` is not very useful when dealing with templates and this is where `using` comes in
### using
Most people who know C++ and don't know what the `using` keyword is, know that in their hello world they used
```cpp
using namespace std;
```
to not be forced to use `std::` for every standart function. The `using` keyword however is used as a modern `typedef` because it can do everything `typedef` does but it also supports templates. In this example we create our own `TArray` class that is actually an `std::vector`
```cpp
template<typename T>
using TArray = std::vector<T>
```
# TODO
