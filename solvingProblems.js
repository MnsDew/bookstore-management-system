 //return value


 //how to put the output of one function inside another one
 //we have two types of functions right here 
 //print numbers and, sumnumbers


 function printNumbers(to){

    for(let i = 1; i<= to; i++){
        console.log(i);
    }

 }

 function sumNumbers(first, secend){

let result = first + secend;
return result;
 }


printNumbers(sumNumbers(2,7) - sumNumbers (2,3));
