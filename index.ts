
/**
 * 기본타입 
 * - string, number, boolean, object, array
 * 
 * 미리 정하기 애매할 때 쓰는 타입
 * - union, any, unknown
 */
let 이름 :string = 'Test';
let 나이 :number = 34;
let 출생지 :string = '하남';

let project:{member:object, days:number, started:boolean} = {
    member : ['kim', 'park'],
    days : 30,
    started : true,
}

//union Type
let 회원들 :(number | string)[] = [1, '2', 3];
let 오브젝트 :{ a : string | number } = { a : '1234'}

//any - 타입스크립트 기능을 안 쓰는 타입
//let 이름 :any;

//unknown - any랑 똑같이 다 집어넣을 수 있는데 any보다 조금 더 안전함
//let 나이 :unknown;
//나이 = "1234";
//let test = 나이 - 2;

// Q1
let user :string = 'kim';
//let age :any = undefined;
//age 변수에는 undefined말고 숫자도 들어갈 수 있음. 
let age :undefined | number = undefined;
let married :boolean = false;
let 철수: (string|number|boolean|undefined)[] = [user, age, married];

// Q2
let 학교: { score: (number|boolean)[], teacher: string, friend: string|string[]} = {
    score: [100, 97, 84],
    teacher: 'Phil',
    friend: 'John'
}
학교.score[4] = false;
학교.friend = ['Lee' , 학교.teacher]

// 함수
//함수에 타입지정하는 방법
//void : return 쓰기 싫은 함수에서 아무것도 리턴하지 말라고 사용함.
//함수 파라미터에 타입 지정했다면 그 파라미터는 필수값
//필수입력처리 하기 싫으면 파라미터 옆에 ? 표시하면됨. 
//? 는 number|undefined 의미와 동일함.

function 함수(x :number) :number {
    return x * 2
}


// Q1
function Q1(name? : string) :void {
    if (typeof name === "undefined") {
        console.log("이름이 없습니다")
    }

    console.log("안녕하세요 "+name)
}

Q1("홍길동");

// Q2
function Q2(str :number | string) :number {
    return str.toString().length;
}
console.log(Q2('1234'));

// Q3
function Q3(p1 :number, p2 :boolean, p3 :string) : (string | void) {
    let total:number = 0;
    
    total += p1;
    if (p2 === true) total += 500;
    if (p3 === '상') total += 100;

    if (total >= 600) {
        return '결혼가능'
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
function 클리닝함수 (arr: (string|number)[]) :number[]  {
    //이 부분에서 초기화 까먹어서 자꾸 타입에러났음. 초기화 까먹지말기
    let returnArr :number[] = [];
    arr.forEach(x => {
        if (typeof x === "string") {
            returnArr.push(parseInt(x));
        } else {
            returnArr.push(x);
        }
    });

    return returnArr;
}
console.log(클리닝함수(['1', 2, '3']));

// Q2
interface Teacher {
    subject: string | string[]
}

let 철수쌤 = { subject : 'math' }
let 영희쌤 = { subject : ['science', 'english'] }
let 민수쌤 = { subject : ['science', 'art', 'korean'] }

function 만들함수 (info :Teacher): string {
    if (Array.isArray(info.subject)) {
        return info.subject[info.subject.length - 1];
    } else {
       return info.subject;
    }
}

console.log(만들함수({ subject : 'math' }));
console.log(만들함수({ subject : ['science', 'art', 'korean'] }));
console.log(만들함수({ hello : 'hi' }));


/**
 * type 키워드 사용, readonly
 * - type 변수 작성 시 첫글자 대문자 국룰
 * - type 변수끼리도 union Type으로ㅛ 묶기 가능
 * - & 연산자로 object 타입 합치기
 * - type 재정의 불가능
 */
// Q1
type o1 = { name : string };
type o2 = { name : string, age : number};
type newType = o1 & o2;
let 테스트 :newType = { name : "test"};
console.log(테스트);

// Q2
type o3 = {
    color? : string,
    size : number,
    readonly position : number[]
};

// Q3
type o4 = {
    name : string,
    phone : number,
    email : string
}

let info: o4 = {
    name : 'kim',
    phone: 1234,
    email : '123@naver.com'
}

// Q4
type o5  = {
    mija : boolean
}

type newType2 = o4 & o5;


/**
 * Literal Types
 * - 특정 글자나 숫자만 가질 수 있게 제한
 * - 리터럴 타입도 유니온 타입 사용 가능
 * - 변수에 뭐가 들어올 지 더 엄격하게 사용 간ㅇ
 * - const 변수의 업그레이드 버전
 * 
 * * as const
 * - 타입을 object value로 바꿔줌
 * - object 안에 모든 속성을 readonly로 바꿔 줌.
 * - object를 선언하고 잠그고 싶을 때 as const 사용
 * 
 */

/**
 * 함수와 methods에 type alias 지정하는 법
 * - function 키워드는 불가능하고 화살표 함수 형태로 지정해야함.
 * - object 안에 함수넣을 시 일반함수, arrow function 둘다 가능
 */
 type NumOut = (x : number, y : number ) => number;


// Q1
type User = {
    name : string,
    age : number,
    plusOne: (x : number) => number,
    changeName: () => void
}

let 회원정보 : User = {
    name : 'kim',
    age : 30,
    plusOne (x){
        return x + 1
    },
    changeName : () => {
        console.log('안녕')
    }
}
console.log(회원정보.plusOne(1));
console.log(회원정보.changeName());

// Q2
type zero = (s : string) => string;
type dash = (s : string) => number;

let cutZero :zero = function (s) {
    //indexOf(searchString, position) : 특정 index 부터 문자열 찾기
    if (s.indexOf("0") === 0) {
        return s.substring(1, s.length);
    }

    return s;
}

console.log(cutZero("01234"));

let removeDash :dash = function (s)  {
    let arr = s.replace(/-/g, "");
    return parseFloat(arr);
}

console.log(removeDash("010-3456-7788"));

// Q3
type f3 = (s : string, cutZero : zero, removeDash : dash) => number;

let 만들함수2 :f3 = function (s, zero, dash) {
    return dash(zero(s));
}

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
class Person {
    public name :string;
    constructor(a :string) {
        this.name = a;
    }
}

let 사람1 = new Person('Kim');
let 사람2 = new Person('Park');

console.log(사람1);
console.log(사람2);



// Q1
class Car {
    model :string;
    price :number;
    constructor (model, price) {
        this.model = model;
        this.price = price;
    }

    tax() :number {
        return this.price * 0.1;
    }
}
let car1 = new Car('소나타', 3000)
console.log(car1);
console.log(car1.tax());

// Q2
class Word {
    num: number[] = [];
    str: string[] = [];

    constructor (...param) {
        param.forEach (a => {
            if (typeof a === "string") {
                this.str.push(a);
            } else if (typeof a === "number") {
                this.num.push(a);
            } else {
                console.log("없음")
            }
        });
    }

}
let obj = new Word('kim', 3, 5, 'park');
console.log(obj.num) //[3,5]
console.log(obj.str) //['kim', 'park']

/**
 * interface
 * - extends 로 복사 가능
 * - 중복선언이 가능, field 추가 가능
 * - 추천은 type 보단 interface
 */

// Q1
interface Product {
    brand : string,
    serialNumber: number, 
    model : string[]
}
let 상품 :Product = { brand : 'Samsung', serialNumber : 1360, model : ['TV', 'phone'] };

// Q2
interface Cart {
    product: string,
    price : number
}

let 장바구니 : Cart[] = [ { product : '청소기', price : 7000 }, { product : '삼다수', price : 800 } ] 

interface Cart2 extends Cart {
    card : boolean
}

// Q3
interface o {
    plus: (x :number, y :number) => number,
    minux: (x :number, y :number) => number,
}

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
let person : { student: boolean, age: number } = { student : true, age : 20 }
function 함수3 ({student, age}) {
    console.log(student, age);
}

함수3({ student : true, age : 20})

// Q1
function 최대값(...numbers: number[]) :number {
    let max:number = 0;
    numbers.forEach(n => {
        if (n > max) {
            max = n;
        }
    });

    return max;
}

console.log(최대값(6, 3, 7, 2));

// Q2
function 함수4 ({ user, comment, admin} :{ user: string, comment: number[], admin: boolean }) {
    console.log(user);
    console.log(comment);
    console.log(admin);
}

함수4( { user : 'kim', comment : [3,5,4], admin : false } );

/**
 * never : 코드를 조ㅓㅈ같이 짜면 가끔 발생함. 실제로는 쓸 일 거의 없음. 발견하는 것 뿐 
 */

/**
 * javascript static
 */
class User2 {
    static x = 10;  //자식은 쓸 수 없고고 부모만 쓸 수 있음 .
    y = 20;
}

let 자식 = new User2();
console.log(User2.x);

// Q2
class User4 {
    private static x = 10;
    public static y = 20;

    public static addOne(x :number) {
        User4.x += x;
    }

    public static printX() {
        console.log(User4.x);
    }
}

User4.addOne(3) //이렇게 하면 x가 3 더해져야함
User4.addOne(4) //이렇게 하면 x가 4 더해져야함
User4.printX()  //이렇게 하면 콘솔창에 x값이 출력되어야함

/**
 * import, export
 */
import {Car, Bike} from "./car";

import {Q2} from "./Q2";
let Q2F :Q2 = function(test) {
    console.log(test);
}

Q2F("testxfddd");

/**
 * Generic
 * - <> 로 타입파라미터를 입력할 수 있음 .
 * - MyType extends number라고 쓰면 파라미터 타입 제한 가능
 */
 function 함수G<MyType>(x: MyType[]) :MyType {
    return x[0];
  }
  
  let a = 함수G<number>([4,2])
  let b = 함수G<string>(['kim', 'park'])

  console.log(a, b);

  // Q1
  interface lengthCheck {
    length: number
  }

  function 함수H<T extends lengthCheck> (x :T) :number {
    return x.length;
  }

  console.log(함수H<string>('hel'))
  console.log(함수H<string[]>(['kin', 'pack']))

  // Q2
  interface Animal {
    name : string;
    age: number;
  }

  let data = '{"name" : "dog", "age" : 1 }';
  function 함수I<T extends Animal>(x :T) :T {
    return JSON.parse(x);
  }

  console.log(함수I<Animal>(data));

  // Q3
  class Person2 {
    name: T;
    constructor(a){
      this.name = a;
    }
  }
  let a = new Person2<string>('어쩌구');
  a.name //any 타입이 되었넹 



// Q1
let test :[string, number, boolean] = ['콤부티', 2000, true];

// Q2
let arr :[string, number, ...boolean[]]= ['동서녹차', 4000, true, false, true, true, false, true]

// Q3
function 함수J(...rest :[string, boolean, ...(number|string)[]]) {

}

// Q4
function 함수K(...rest : (number|string)[]) : [string[], number[]] {
    let str: string[] = [];
    let num: number[] = [];
    rest.forEach(x => {
        if (typeof x === "string") {
            str.push(x);
        } else if (typeof x === "number") {
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
let obj2 :{
    [key: string]: string | number
} = {
    model : 'k5',
    brand : 'kia',
    price : 6000,
    year : 2030,
    date : '6월',
    percent : '5%',
    dealer : '김차장',
}
