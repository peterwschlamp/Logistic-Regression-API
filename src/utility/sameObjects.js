
module.exports.sameObjects = function (A, B)
{
    var aKeys=Object.keys(A).sort();
    var bkeys=Object.keys(B).sort();
    return JSON.stringify(aKeys) ===JSON.stringify(bkeys);


}


