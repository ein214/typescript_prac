type User = {
    name: string;
    age: string;
    gender?: string;
}

/**
 * Partial<T>
 * User의 모든 프로퍼티를 선택적으로 만드는 타입을 구성
 */
/**
type PartialUser = {
    name?: string | undefined;
    age?: string | undefined;
    gender?: string | undefined;
}
*/
type PartialUser = Partial<User>;

const user: PartialUser = {
    name: "John Doe"
};
console.log(user);

/**
 * Required<T>
 * T에 옵션 프로퍼티가 있어도 Required<T> 로 선언시에는 모든 프로퍼티가 필수값으로 들어와야함.
 */
type RequiredUser = Required<User>;
const user2 :RequiredUser = {
    name: "Jane  Doe",
    age: "24",
    gender: "male"
}

console.log(user2);

/**
 * Pick<T, K>
 * Book type에서 name, image 만 "Pick" 해서 새로운 타입을 구성
 * pick 하지 않은 다른 Book type 속성을 Book Preview type에서 사용하면 오류남.
 * BookPreview 타입은 name과 image로만 구성된 타입이기 때문에
 */
type Book = {
    name: string,
    ISPN: number,
    price: number,
    image: string,
    description: string
}

type BookPreview = Pick<Book, "name" | "image">;

const book :Book = {
    name: "English",
    description: "English grade 3",
    ISPN: 2323232,
    price: 5000,
    image: "https://www.naver.com"
}

const bookPreview :BookPreview = {
    name: book.name,
    image: book.image,
}

console.log(book, bookPreview);

/**
 * Omit<T, K>
 * Item type에서 price, currency 프로퍼티를 제거한 후 type을 구성
 * PricelessItem을 type으로 사용하면 price는 없는 프로퍼티라서 사용을 할 수가 없음.
 */
type Item = {
    name: string;
    description: string;
    price: number;
    currency: string;
}

type PricelessItem = Omit<Item, "price" | "currency">;

const item :PricelessItem = {
    name: "Macbook",
    description : "heavy"
};

/**
 * Readonly<T>
 * 모든 속성을 읽기 전용으로 설정한 타입 구성
 */
/**
 * const 로 선언된 값은 바꿀 수 없지만 array나 object로 값이 들어가있으면 그 안의 필드는 쉽게 업데이트 가능
 * as const를 추가해주면 업데이트 할 수 없이 불변값이 됨. 
 */
const user3 = {
    name: "elin",
    age: 34
} as const;


user3.name = "elin K";
console.log(user3);

/**
 * 여기서 readonly 속성은 첫번째 레벨까지만 적용되는 속성이기 때문에 degree의 변경까지는 막을 수 없음.
 * degree 속성 앞에까지 readonly 를 추가해야 업데이트를 막을 수 있음.
 * 배열에도 readonly 추가를 하면 값 변경은 막을 수 없지만 push 까지는 막을 수 없고
 * 이 경우에 Readonly<T>나 ReadonlyArray<T> 로 타입지정을 해주면 push 할 때도 에러가 뜨는 것 확인 가능
 */
type User2 = {
    readonly name: string;
    readonly age: number;
    readonly education: {
        readonly degree: string;
    };
    readonly skills : ReadonlyArray<string[]>
}

const user4: User2 = {
    name : "John Doe",
    age: 26,
    education: {
        degree : "SE"
    },
    skills : ["Javascript", "Typescript"]
};

user4.name = "Jane Doe";
user4.age = 22;
user4.education.degree = "SEE";
user4.skills = ["AWS"];
user4.skills.push("Developer");
console.log(user4);
console.log(user4.skills);

/**
 * Non-Null Assertion operator
 */
type Movie = {
    title : string,
    grade : number,
    time? : string 
}

const movie:Movie = {
    title: "spicer man",
    grade: 4.5,
    time: "400"
};

/**
 * movie type에서 time 속성이 옵션 속성을 가지고 있어서 string 이거나 undefined 상태일수도 있으므로 오류가 발생하는 것
 * 뒤에 느낌표를 붙여주면 null이나 undefined 값 오류를 무시한다. 
 * ! 를 붙여주면 time 속성이 required 속성인것으로 본다
 */
const movieTime: string = movie.time!;

console.log(movie);
console.log(movieTime);

/**
 * typeof XXX
 * 이미 주어진 데이터를 가지고 Type을 구성함
 * 아래 Video type은 number[] 로 type이 구성되있음.
 * 위에 있는 movie 값으로 typeof를 쓰면 Movie type 그대로 타입이 생성되어있음.
 */
const arr = [1, 2, 3];
type Video = typeof arr;

/**
 * Template Literal
 * ` 문자로 사용하는 템플릿 리터럴과 Type 을 조합해서 Type 범위를 제한할 수 있음
 */
function handler(eventType: `on${string}`) {
    console.log(`handling ${eventType}`);
}

function handler2(eventType: `on${'Click' | 'Keydown'}`) {
    console.log(`handling ${eventType}`);
}

handler('onClick');
handler('onKeydown');
handler('escape');      //handler 함수 파라미터 타입에서 on 으로 시작하는 스트링타입을 지정해두었기 때문에 오류

handler2('onClick');
handler2('onKeyup');    //handler2 함수에서는 onClick, onKeydown에 대해서만 type을 허용했기 때문에 에러 

/**
 * class constructor에서의 public
 * 생성자 선언 시 파라미터 앞에 public을 붙여주면 별도의 속성선언 없이 바로 access 가능
 * Person {name: 'John Doe', age: 34}
 */
class Person {
    constructor(public name: string, private age: number) {

    }
}

const johnDoe = new Person("John Doe", 34);
console.log(johnDoe);

/**
 * Record<K, T>
 * 타입 T의 프로퍼티 집합 K로 타입을 구성
 * number의 프로퍼티 집합 string 으로 타입을 구성....?
 * => 쉬운말버전 : 프로퍼티의 키값을 K 타입으로, 값을 T 타입으로 하는 타입을 구성할 수 있다.
 * 
 * Union Type 과 조합해서 키값이 제한된 타입을 만드는 것도 가능
 */
/*
type AgesType = {
    [name: string]: number;
};
*/
type NamesType = 'John Doe' | 'Jane Doe' | 'Baby Doe';
type AgesType = Record<NamesType, number>;

const ages: AgesType = {
    'John Doe' : 29,
    'Jane Doe' : 25,
    'Baby Doe' : 5
};

console.log(ages);


/**
 * Generic 타입으로 중복유형 줄이기
 * 예시기준 content 프로퍼티의 type만 다른 Type alias가 필요한 경우
 * type alias 작성 시 Generic 타입을 추가해줘서 비슷한 타입을 하나의 타입을 가지고 재활용하는 것이 가능
 * Generic을 추가하여 선언했기 때문에 stringBox는 string에서 사용가능한 함수들을 오류없이 사용가능하고
 * numberBox는 number에서 사용가능한 연산이 가능하다.
 */
type Box<T> = {
    name: string;
    content: T;
}
/*
type NumberBox = {
    name: string;
    content: number;
}
*/

const stringBox : Box<string> = {
    name: 'String Box',
    content: 'string'
}

const numberBox: Box<number> = {
    name: 'Number Box',
    content: 50
}

console.log(stringBox.content.toUpperCase());
console.log(numberBox.content * 5);

/**
 * 그 외 타입들
 * Exclude<T, U>
 * - 여기서 T와 U는 둘다 유니온타입이고 두가지 유니온타입의 차집합을 새로운 타입으로 생성해 준다
 * - T 타입들 중 U타입들과 겹치는 타입을 제외
 * 
 * Extract<T, U>
 * - Exclude랑은 다르게 겹치는 것만 가져옴
 */
type Phone = "Samsung" | "Apple" | "LG";
type Notebook = "LG";

type Sample = Exclude<Phone, Notebook>;     //겹치는거 빼고 가져옴
type Sample2 = Extract<Phone, Notebook>;    //겹치는 것만 가져옴

/**
 * NonNullable<T>
 * - T 타입에서 null or undefined 제외하고 리턴
 */
//string | number
type Sample3 = NonNullable< string | number | undefined >;

/**
 * Parameters<T>
 * - 함수의 파라미터에 사용된 타입을 튜플 타입으로 생성
 * - 함수타입이 아닌 것을 T 자리에 넣으면 에러 발생하고 never 타입이 반환된다.
 * - any -> unknown[] 나오고 never -> never 나옴
 */
type Sample4 = Parameters<typeof handler2>;
type Sample5 = Parameters<any>;
type Sample5 = Parameters<string>;
type Sample6 = Parameters<(a: string) => number>;

/**
 * ConstructorParameters<T>
 * - Parameters와 비슷하지만 T로 들어갈 수 있는 값이 생성자 파라미터로 한정된다 Class 들어가야된다는 소리
 */
// type S7 = [name: string, age: number]
type S7 = ConstructorParameters<typeof Person>;

/**
 * ReturnType<T>
 * - T라는 함수의 리턴타입을 가져옴
 * - T자리에 함수타입이 아니면 오류남.
 */
//type S8 = void handler 함수가 리턴없이 log만 찍고있기 때문에 void로 타입이 지정됨.
type S8 = ReturnType<typeof handler>;

/**
 * InstanceType<T>
 * - T라는 생성자 함수의 인스턴스 타입을 반환
 */
class Student extends Person {
    grade: number;

}
type S9 = InstanceType<typeof Student>;

/**
 * ThisParameterType<T>
 * - T라는 함수타입에서 this 파라미터의 타입을 반환. 반환될 값이 없는 함수라면 unknown 반환
 */
function toUpper(this: string) {
    return this.length;
}

type S10 = ThisParameterType<typeof toUpper>;

/**
 * OmitThisParameter<T>
 * - T 함수에서 this 파라미터만 제거한 타입을 생성한다. 
 * - 테스트해보면 this 파라미터는 빠져있고 리턴되는 number 타입만 나옴
 */
//type S11 = () => number
type S11 = OmitThisParameter<typeof toUpper>;

//기타 등등 온갖 유틸리티가 다있는듯
//https://github.com/piotrwitek/utility-types