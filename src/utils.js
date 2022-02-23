let globalId = 0;
let utils = {

    add: (x, y)=>  x+y,
    substract: function(x,y){
        return x-y;
    },
    generateId: ()=>{
        return globalId++;
    }

}



module.exports.utils = utils;

module.exports.k = "kkk";//not relevant
// module.exports = utils;
