const jsonSstring = `{
"name" :"jhon",
"age": 30  //주석달기,들어가면 실행 안됨
}`;
console.log(jsonSstring);

const jsonObj = JSON.parse(jsonSstring);
console.log(jsonObj);

const jsonStringfied = JSON.stringify(jsonObj);
console.log(jsonStringfied);

const jsononstringified = JSON.stringify(jsonObj, null, 2); 
console.log(jsononstringified);

//const age = jsonObj.age;
//consst name = jsonObj.name;

const { age, name } = jsonObj;
console.log(age, name);

//const myname = jsonObj.name;
//const myage = jsonObj.age;
const { name:myname, age:myage } = jsonObj;
console.log(myname, myage);

const jsonStringArr = `[
{
"name": "John",
"age": 30
}
{
"name": "Jane",
"age": 25
}
]`;
console.log(jsonStringArr);
