"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 기본타입
 * - string, number, boolean, object, array
 *
 * 미리 정하기 애매할 때 쓰는 타입
 * - union, any, unknown
 */
var 이름 = 'Test';
var 나이 = 34;
var 출생지 = '하남';
var project = {
    member: ['kim', 'park'],
    days: 30,
    started: true,
};
//union Type
var 회원들 = [1, '2', 3];
var 오브젝트 = { a: '1234' };
//any - 타입스크립트 기능을 안 쓰는 타입
//let 이름 :any;
//unknown - any랑 똑같이 다 집어넣을 수 있는데 any보다 조금 더 안전함
//let 나이 :unknown;
//나이 = "1234";
//let test = 나이 - 2;
// Q1
var user = 'kim';
//let age :any = undefined;
//age 변수에는 undefined말고 숫자도 들어갈 수 있음. 
var age = undefined;
var married = false;
var 철수 = [user, age, married];
// Q2
var 학교 = {
    score: [100, 97, 84],
    teacher: 'Phil',
    friend: 'John'
};
학교.score[4] = false;
학교.friend = ['Lee', 학교.teacher];
// 함수
//함수에 타입지정하는 방법
//void : return 쓰기 싫은 함수에서 아무것도 리턴하지 말라고 사용함.
//함수 파라미터에 타입 지정했다면 그 파라미터는 필수값
//필수입력처리 하기 싫으면 파라미터 옆에 ? 표시하면됨. 
//? 는 number|undefined 의미와 동일함.
function 함수(x) {
    return x * 2;
}
// Q1
function Q1(name) {
    if (typeof name === "undefined") {
        console.log("이름이 없습니다");
    }
    console.log("안녕하세요 " + name);
}
Q1("홍길동");
// Q2
function Q2(str) {
    return str.toString().length;
}
console.log(Q2('1234'));
// Q3
function Q3(p1, p2, p3) {
    var total = 0;
    total += p1;
    if (p2 === true)
        total += 500;
    if (p3 === '상')
        total += 100;
    if (total >= 600) {
        return '결혼가능';
    }
}
console.log(Q3(700, false, '중'));
console.log(Q3(100, false, '상'));
/**
 * Narrowing 방법 : type이 확실하지 않을 때 생기는 부작용을 막기위한 장치
 * - typeof 연산자
 * - 속성명 in 오브젝트 자료형
 * - instanceof 부모
 *
 * assertion 문법 (저어어어말 필요할 때만 씀. 굳이 쓸 일 없음.)
 * - 타입체크를 잠시 안 쓰겠다는거나 마찬가지
 * - narowwing 할 때 씀
 * - 어떤 타입이 들어올 지 확실하게 알고 있을 때 씀.
 */
// Q1
function 클리닝함수(arr) {
    //이 부분에서 초기화 까먹어서 자꾸 타입에러났음. 초기화 까먹지말기
    var returnArr = [];
    arr.forEach(function (x) {
        if (typeof x === "string") {
            returnArr.push(parseInt(x));
        }
        else {
            returnArr.push(x);
        }
    });
    return returnArr;
}
console.log(클리닝함수(['1', 2, '3']));
var 철수쌤 = { subject: 'math' };
var 영희쌤 = { subject: ['science', 'english'] };
var 민수쌤 = { subject: ['science', 'art', 'korean'] };
function 만들함수(info) {
    if (Array.isArray(info.subject)) {
        return info.subject[info.subject.length - 1];
    }
    else {
        return info.subject;
    }
}
console.log(만들함수({ subject: 'math' }));
console.log(만들함수({ subject: ['science', 'art', 'korean'] }));
console.log(만들함수({ hello: 'hi' }));
var 테스트 = { name: "test" };
console.log(테스트);
var info = {
    name: 'kim',
    phone: 1234,
    email: '123@naver.com'
};
var 회원정보 = {
    name: 'kim',
    age: 30,
    plusOne: function (x) {
        return x + 1;
    },
    changeName: function () {
        console.log('안녕');
    }
};
console.log(회원정보.plusOne(1));
console.log(회원정보.changeName());
var cutZero = function (s) {
    //indexOf(searchString, position) : 특정 index 부터 문자열 찾기
    if (s.indexOf("0") === 0) {
        return s.substring(1, s.length);
    }
    return s;
};
console.log(cutZero("01234"));
var removeDash = function (s) {
    var arr = s.replace(/-/g, "");
    return parseFloat(arr);
};
console.log(removeDash("010-3456-7788"));
var 만들함수2 = function (s, zero, dash) {
    return dash(zero(s));
};
console.log(만들함수2('010-1111-2222', cutZero, removeDash));
/*
let 제목 = document.querySelector("#title");
//Narrowing 1
if (제목 != null) {
    제목.innerHTML = "반가워요";
}

//Narrowing 2 - 제일많이 쓰고 좋은 방법
if (제목 instanceof Element) {
    제목.innerHTML = "반가워요2";
}

//Narrowing 3
if (제목?.innerHTML != undefined) {
    제목.innerHTML = "반가워요3";
}

let 이미지 = document.querySelector("#image");
if (이미지 instanceof HTMLImageElement) {
    이미지.src = "test2.jpg";
}

let 링크들 = document.querySelectorAll(".naver");
링크들.forEach(a => {
    if (a instanceof HTMLAnchorElement) {
        a.href = "https://kakao.com";
    }
});
console.log(링크들);
*/
/**
 * Class
 */
var Person = /** @class */ (function () {
    function Person(a) {
        this.name = a;
    }
    return Person;
}());
var 사람1 = new Person('Kim');
var 사람2 = new Person('Park');
console.log(사람1);
console.log(사람2);
// Q1
var Car = /** @class */ (function () {
    function Car(model, price) {
        this.model = model;
        this.price = price;
    }
    Car.prototype.tax = function () {
        return this.price * 0.1;
    };
    return Car;
}());
var car1 = new Car('소나타', 3000);
console.log(car1);
console.log(car1.tax());
// Q2
var Word = /** @class */ (function () {
    function Word() {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        var _this = this;
        this.num = [];
        this.str = [];
        param.forEach(function (a) {
            if (typeof a === "string") {
                _this.str.push(a);
            }
            else if (typeof a === "number") {
                _this.num.push(a);
            }
            else {
                console.log("없음");
            }
        });
    }
    return Word;
}());
var obj = new Word('kim', 3, 5, 'park');
console.log(obj.num); //[3,5]
console.log(obj.str); //['kim', 'park']
var 상품 = { brand: 'Samsung', serialNumber: 1360, model: ['TV', 'phone'] };
var 장바구니 = [{ product: '청소기', price: 7000 }, { product: '삼다수', price: 800 }];
/**
 * rest 파라미터 destructuring
 * - function  test (...arg) 이렇게 들어가면 rest 파라미터
 * - [1,2,3, ...arg] 이런식으로 array나 object 자료에 있으면 spread operator
 *
 * destructuring
 * let { student, age } = { student : true, age : 20}
 * 이렇게 사용하면 각 변수로 선언되서 들어가있음.
 * - object를 destructuring 할 때는 속성이름을 맞춰주는게 편하고
 * - array를 destructuring 할 때는 맘대로 써도 됨.
 *
 */
//함수에서의 destructuring
var person = { student: true, age: 20 };
function 함수3(_a) {
    var student = _a.student, age = _a.age;
    console.log(student, age);
}
함수3({ student: true, age: 20 });
// Q1
function 최대값() {
    var numbers = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        numbers[_i] = arguments[_i];
    }
    var max = 0;
    numbers.forEach(function (n) {
        if (n > max) {
            max = n;
        }
    });
    return max;
}
console.log(최대값(6, 3, 7, 2));
// Q2
function 함수4(_a) {
    var user = _a.user, comment = _a.comment, admin = _a.admin;
    console.log(user);
    console.log(comment);
    console.log(admin);
}
함수4({ user: 'kim', comment: [3, 5, 4], admin: false });
/**
 * never : 코드를 조ㅓㅈ같이 짜면 가끔 발생함. 실제로는 쓸 일 거의 없음. 발견하는 것 뿐
 */
/**
 * javascript static
 */
var User2 = /** @class */ (function () {
    function User2() {
        this.y = 20;
    }
    User2.x = 10; //자식은 쓸 수 없고고 부모만 쓸 수 있음 .
    return User2;
}());
var 자식 = new User2();
console.log(User2.x);
// Q2
var User4 = /** @class */ (function () {
    function User4() {
    }
    User4.addOne = function (x) {
        User4.x += x;
    };
    User4.printX = function () {
        console.log(User4.x);
    };
    User4.x = 10;
    User4.y = 20;
    return User4;
}());
User4.addOne(3); //이렇게 하면 x가 3 더해져야함
User4.addOne(4); //이렇게 하면 x가 4 더해져야함
User4.printX(); //이렇게 하면 콘솔창에 x값이 출력되어야함
var Q2F = function (test) {
    console.log(test);
};
Q2F("testxfddd");
/**
 * Generic
 * - <> 로 타입파라미터를 입력할 수 있음 .
 * - MyType extends number라고 쓰면 파라미터 타입 제한 가능
 */
function 함수G(x) {
    return x[0];
}
var a = 함수G([4, 2]);
var b = 함수G(['kim', 'park']);
console.log(a, b);
function 함수H(x) {
    return x.length;
}
console.log(함수H('hel'));
console.log(함수H(['kin', 'pack']));
var data = '{"name" : "dog", "age" : 1 }';
function 함수I(x) {
    return JSON.parse(x);
}
console.log(함수I(data));
// Q3
var Person2 = /** @class */ (function () {
    function Person2(a) {
        this.name = a;
    }
    return Person2;
}());
var a = new Person2('어쩌구');
a.name; //any 타입이 되었넹 
// Q1
var test = ['콤부티', 2000, true];
// Q2
var arr = ['동서녹차', 4000, true, false, true, true, false, true];
// Q3
function 함수J() {
    var rest = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        rest[_i] = arguments[_i];
    }
}
// Q4
function 함수K() {
    var rest = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        rest[_i] = arguments[_i];
    }
    var str = [];
    var num = [];
    rest.forEach(function (x) {
        if (typeof x === "string") {
            str.push(x);
        }
        else if (typeof x === "number") {
            num.push(x);
        }
    });
    return [str, num];
}
console.log(함수K('b', 5, 6, 8, 'a'));
/**
 * implements
 * - class 타입을 확인하는 용도로 사용 implements 키워드와 같이 사용해야됨.
 * - interface 에 들어있는 속성을 가지고 있는지 확인만 하는 키워드
 * - php처럼 interface를 할당하고 변형하거나 그러는 키워드는 아님 .
 */
/**
 * index signature
 */
var obj2 = {
    model: 'k5',
    brand: 'kia',
    price: 6000,
    year: 2030,
    date: '6월',
    percent: '5%',
    dealer: '김차장',
};
