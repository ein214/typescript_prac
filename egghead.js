var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var user = {
    name: "John Doe"
};
console.log(user);
var user2 = {
    name: "Jane  Doe",
    age: "24",
    gender: "male"
};
console.log(user2);
var book = {
    name: "English",
    description: "English grade 3",
    ISPN: 2323232,
    price: 5000,
    image: "https://www.naver.com"
};
var bookPreview = {
    name: book.name,
    image: book.image,
};
console.log(book, bookPreview);
var item = {
    name: "Macbook",
    description: "heavy"
};
/**
 * Readonly<T>
 * 모든 속성을 읽기 전용으로 설정한 타입 구성
 */
/**
 * const 로 선언된 값은 바꿀 수 없지만 array나 object로 값이 들어가있으면 그 안의 필드는 쉽게 업데이트 가능
 * as const를 추가해주면 업데이트 할 수 없이 불변값이 됨.
 */
var user3 = {
    name: "elin",
    age: 34
};
user3.name = "elin K";
console.log(user3);
var user4 = {
    name: "John Doe",
    age: 26,
    education: {
        degree: "SE"
    },
    skills: ["Javascript", "Typescript"]
};
user4.name = "Jane Doe";
user4.age = 22;
user4.education.degree = "SEE";
user4.skills = ["AWS"];
user4.skills.push("Developer");
console.log(user4);
console.log(user4.skills);
var movie = {
    title: "spicer man",
    grade: 4.5,
    time: "400"
};
/**
 * movie type에서 time 속성이 옵션 속성을 가지고 있어서 string 이거나 undefined 상태일수도 있으므로 오류가 발생하는 것
 * 뒤에 느낌표를 붙여주면 null이나 undefined 값 오류를 무시한다.
 * ! 를 붙여주면 time 속성이 required 속성인것으로 본다
 */
var movieTime = movie.time;
console.log(movie);
console.log(movieTime);
/**
 * typeof XXX
 * 이미 주어진 데이터를 가지고 Type을 구성함
 * 아래 Video type은 number[] 로 type이 구성되있음.
 * 위에 있는 movie 값으로 typeof를 쓰면 Movie type 그대로 타입이 생성되어있음.
 */
var arr = [1, 2, 3];
/**
 * Template Literal
 * ` 문자로 사용하는 템플릿 리터럴과 Type 을 조합해서 Type 범위를 제한할 수 있음
 */
function handler(eventType) {
    console.log("handling ".concat(eventType));
}
function handler2(eventType) {
    console.log("handling ".concat(eventType));
}
handler('onClick');
handler('onKeydown');
handler('escape'); //handler 함수 파라미터 타입에서 on 으로 시작하는 스트링타입을 지정해두었기 때문에 오류
handler2('onClick');
handler2('onKeyup'); //handler2 함수에서는 onClick, onKeydown에 대해서만 type을 허용했기 때문에 에러 
/**
 * class constructor에서의 public
 * 생성자 선언 시 파라미터 앞에 public을 붙여주면 별도의 속성선언 없이 바로 access 가능
 * Person {name: 'John Doe', age: 34}
 */
var Person = /** @class */ (function () {
    function Person(name, age) {
        this.name = name;
        this.age = age;
    }
    return Person;
}());
var johnDoe = new Person("John Doe", 34);
console.log(johnDoe);
var ages = {
    'John Doe': 29,
    'Jane Doe': 25,
    'Baby Doe': 5
};
console.log(ages);
/*
type NumberBox = {
    name: string;
    content: number;
}
*/
var stringBox = {
    name: 'String Box',
    content: 'string'
};
var numberBox = {
    name: 'Number Box',
    content: 50
};
console.log(stringBox.content.toUpperCase());
console.log(numberBox.content * 5);
/**
 * InstanceType<T>
 * - T라는 생성자 함수의 인스턴스 타입을 반환
 */
var Student = /** @class */ (function (_super) {
    __extends(Student, _super);
    function Student() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Student;
}(Person));
/**
 * ThisParameterType<T>
 * - T라는 함수타입에서 this 파라미터의 타입을 반환. 반환될 값이 없는 함수라면 unknown 반환
 */
function toUpper() {
    return this.length;
}
//기타 등등 온갖 유틸리티가 다있는듯
//https://github.com/piotrwitek/utility-types
