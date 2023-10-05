&&
: This a shorthand way to check to see that a variable/value exists
`if(randomVariable !== undefined)` is the same as `randomVariable &&` (comes after the variable - this is like an 'if' statement with no 'else')

?
: you put a '?' after a variable - if the variable is (or returns) undefined, then it will throw an error
ex. `if (randomObject?.username) {codeBlock}` - this will pass condition if randomObject is not undefined AND has a username. If randomObject is undefined, then it will throw an error

useEffect()
: This is used inside of a React component and has two parameters, a callback function (what it does) and then a dependency list (array). If the array is empty, what happens in the useEffect function will happen on page load, otherwise whatever variables are in the dependency list, when they change, then the callback function will be run.
**You can have as many *useEffect* functions in your component as you would like**