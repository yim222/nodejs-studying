
//I want that the account deposit(פיקדון) won't be more then 1000
//That's where encapsulation could help us 
//Further reading: https://www.techopedia.com/definition/3787/encapsulation-c#:~:text=Encapsulation%2C%20in%20the%20context%20of,a%20single%20unit%20or%20object.
// 


class ClassWithoutPrivateAccessor {
    //see how much problem it will cause: 
    maxDeposite = 1000;
    deposit = 0;
    //Notice that in classes we don't use with regular function call, unless you assign it to variable
    // 
    // function addMoney(){}//Compile error, it's not supposed to be inside class area: 
    //"Unexpected token. A constructor, method, accessor, or property was expected"
    // addMoney = function(){};//will be work

    addMoney(amount){

        //You can check it here if you exceed the max, but what you will do if other programmer, won't be aware and will do deposie = 2000?
        if (this.deposit +amount > this.maxDeposite){
            console.err("You exceed the max amount, please add less money");
            return;
        }

        this.deposit += amount;
    }

    checkIfAllOk(){
        if (this.deposit <= this.maxDeposite){
            console.log("all Okay");
        }
        else{
            console.error("You exceed the max amount, you got a problem");
        }
    }
}

let kaspo1 = new ClassWithoutPrivateAccessor();

for (let i = 1; i <=4; i++){

    kaspo1.addMoney(300);

}
console.log("Oh, it's not working, so I'll pass it"); 

kaspo1.deposit +=300;

kaspo1.checkIfAllOk();





class ClassWithPrivateAccessor {

    //I want that the account deposit won't be more then 1000



}