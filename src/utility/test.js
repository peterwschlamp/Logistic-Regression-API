
sameObjects=require('./sameObjects');

var data1 = {firstName: 'John', gender:'male', lastName: 'Smith'};
var data2 = {firstName: 'Jane', lastName: 'Smith',gender:'famale'};

console.log(sameObjects.sameObjects(data1,data2));



