/** 
 * 3.4/this_testcode2.js
 */ 

firstname = 'empty';
const obj1 = {
    firstname: 's',
    getFirstName: function (){
        return this.firstname;
    },    
    getFirstnameArrWithThis: () => {
        return this.firstname; //객체의 정적인 상위스코프의 firstname(empty)
    },
    getFirstnameArrWithoutThis: () => {
        return firstname;
    },
    getFirstnameES6(){
        return this.firstname;
    },
    getThis: function(){
        return this;    // obj1
    },
    getThisArr: () => {
        return this;    // {}
    },
    getThisES6(){
        return this;    // obj1
    },
    getSurname: function(){
        console.log(`\n\ngetSurname()...`);
        const surname = 'park';
        console.log(`this.firstname: ${this.firstname}`);
        function fullname() {
            // this: global
            console.log(`>> firstname:${firstname}, surname:${surname}, this.firstname:${this.firstname}, this.surname:${this.surname}, this===global:${this===global}`);
            return `>>>> obj1.firstname + surname: ${obj1.firstname} ${surname}`;
        };
        return fullname();
    },
    // getSurname: function(){
    //     console.log(`\n\ngetSurname()...`);
    //     const surname = 'park';
    //     console.log(`this.firstname: ${this.firstname}`);
    //     const fullname = () => {  // with array function
    //         // this: obj1
    //         console.log(`>> firstname:${firstname}, surname:${surname}, this.firstname:${this.firstname}, this.surname:${this.surname}, this===obj1:${this===obj1}`);
    //         return `this.firstname + surname: ${this.firstname} ${surname}`;
    //     };
    //     return fullname();
    // },
    getSurname_bind: function(){
        console.log(`\ngetSurname_bind()...`);
        const surname = 'park';
        console.log(`this.firstname: ${this.firstname}`);        
        function fullname() {
            // this: global -> obj1
            console.log(`>> firstname:${firstname}, surname:${surname}, this.firstname:${this.firstname}, this.surname:${this.surname}, this===obj1:${this===obj1}`);
            return `>>>> this.firstname + surname: ${this.firstname} ${surname}`;
        };
        let fullname_bind = fullname.bind(this);  // this: obj1
        return fullname_bind();
    },
    getSurnameArr: () => { // with array function
        console.log(`\ngetSurnameArr()...`);
        const surname = 'park';
        console.log(`this.firstname: ${this.firstname}`);
        const fullname = () => { // with array function
            // this: module.exports = {}
            console.log(`>> firstname:${firstname}, surname:${surname}, this.firstname:${this.firstname}, this.surname:${this.surname}, this===module.exports:${this===module.exports}`);
            return `>>>> obj1.firstname + surname: ${obj1.firstname} ${surname}`;
        }
        return fullname();
    },
    // getSurnameArr: () => { // with array function
    //     console.log(`\ngetSurnameArr()...`);
    //     const surname = 'park';
    //     console.log(`this.firstname: ${this.firstname}`);                    
    //     function fullname (){
    //         // this: global
    //         console.log(`>> name:${name}, surname:${surname}, this.firstname:${this.firstname}, this.surname:${this.surname}, this===module.global:${this===global}`);
    //         return `>>>> obj1.firstname + surname: ${obj1.firstname} ${surname}`;
    //     }
    //     return fullname();
    // },
    getSurnameES6 (){
        console.log(`\ngetSurnameES6()...`);
        const surname = 'park';
        console.log(`this.firstname: ${this.firstname}`);
        const fullname = () => { // with array function
            // this: obj1
            console.log(`>> firstname:${firstname}, surname:${surname}, this.firstname:${this.firstname}, this.surname:${this.surname}, this===obj1:${this===obj1}`);
            return `>>>> this.firstname + surname: ${this.firstname} ${surname}`;
        };
        return fullname();
    },
    // getSurnameES6 (){
    //     console.log(`\ngetSurnameES6()...`);
    //     const surname = 'park';
    //     console.log(`this.firstname: ${this.firstname}`);
    //     function fullname (){
    //         // this: global
    //         console.log(`>> name:${name}, surname:${surname}, this.firstname:${this.firstname}, this.surname:${this.surname}, this===global:${this===global}`);
    //         return `>>>> this.firstname + surname: ${this.firstname} ${surname}`;
    //     };
    //     return fullname();
    // },
};

console.log(obj1);
console.log(`> obj1.firstname: ${obj1.firstname}\n`);

obj1.firstname = 'seunghyun';
console.log(obj1);
console.log(`> getFirstname(): ${obj1.getFirstName()}`);
console.log(`> getFirstnameArrWithThis(): ${obj1.getFirstnameArrWithThis()}`);
console.log(`> getFirstnameArrWithoutThis(): ${obj1.getFirstnameArrWithoutThis()}`);
console.log(`> getFirstnameES6(): ${obj1.getFirstnameES6()}\n`);

console.log(`> obj1.getThis() === obj1 : ${obj1.getThis() === obj1}`);
console.log(`> obj1.getThisArr() === module.exports : ${obj1.getThisArr() === module.exports}`);
console.log(`> obj1.getThisES6() === obj1 : ${obj1.getThisES6() === obj1}\n`);

console.log(obj1.getSurname());
console.log(obj1.getSurname_bind());
console.log(obj1.getSurnameArr());
console.log(obj1.getSurnameES6());