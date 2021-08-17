class First{

    constructor(text){
        this.text = text;
    }

    hello(){
        console.log(this.text);
    }
}

class Second extends First{
    hello(){
        super.hello();
        console.log("А я наследуемый метод!");
    }
}

const parent1 = new First('Привет я метод родителя!');
const parent2 = new Second('Привет я метод родителя!');

parent1.hello();
parent2.hello();