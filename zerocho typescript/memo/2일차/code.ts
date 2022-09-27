import { forEachChild } from "typescript";
import { NewLineKind } from "../../node_modules/typescript/lib/typescript";

// # 객체 리터럴
// - 객체 리터럴에서는 잉여 속성 검사가 가능하다.**
// - 잉여 속성 검사를 이용하기 위해선 객체 리터럴을 사용하자!
// - 위의 내용을 확인하기 위해서 '객체 리터럴' vs '변수 사용'의 경우를 비교해보자.
//   - 객체 리터럴
//     -> 아래 처럼 객체 리터럴을 대입하면 잉여 속성 검사를 사용해 에러를 잡아낼 수 있다.
interface testObjLiteral {
    a: string;
}
const objLiteral: testObjLiteral = { a: "hello", b: "world" };
//   - 변수 사용
//     -> 하지만 변수로 뺀다면 잉여 속성 검사를 하지않아 에러를 잡지 않는다.
const obj = { a: "hello", b: "world" };
const objI2: testObjLiteral = obj;

// # void ***

// - void는 3가지 종류로 나뉜다.
//   - 1. 함수의 리턴 타입에 void 타입 직접 선언
//   - 2. 메서드의 리턴 타입에 void 타입 선언
//   - 3. 콜백 함수의 리턴 타입에 void 타입 선언(매개변수로 선언한 void)
//
//
// ## 1. 함수(function)의 리턴 타입에 void 타입 선언

// - function a(): void { }
// - 리턴이 void인 경우 함수에 return 값이 있으면 에러가 난다.
// - 함수의 리턴이 void인 경우 return에 값을 넣지 말라는 뜻!
//   - 단, return 값으로 undefined가 오는 경우는 에러가 나지 않는다.
// - 함수의 리턴 타입으로 사용되는 void는 return 값이 없다는 것을 명시해준다는 뜻으로 사용된다.***
// - 따라서 return 값이 없다고 했는데 실제 구현체에서 리턴 값이 존재하면 에러가 나는 것***
// - method나 callback의 경우에는 void의 뜻이 다르기 때문에 에러가 발생하지 않는다.

function a(): void {
    // 에러나는 상황
    // return 1;
    // return null;
    //
    // 에러 안나는 상황
    // undefined는 return 해줘도 에러가 나지 않는다.
    // return undefined;
}
//  ※ 기본적으로 반환값이 없으면 void 타입을 가진다.(타입추론)
const b = a();
//
//
// ## 2. method or callback의 리턴 타입으로 사용하는 void

// - method와 callback 함수 내에서의 return value
//   - 2,3번의 경우에는 어떤 값으로 return을 해줘도 상관없다.
//   - 2,3번에서 return을 해줘도 상관없는 이유
//     - void는 실제 return 값의 type이 무엇이든 return 값의 type에 대해 상관하지 않겠다는 뜻으로 사용된다.
//     - 따라서 어떤 return 값이 있어도 ts에서는 해당 return의 타입을 void로 인식한다.
//     - 이 때문에, 원칙적으로는 void를 쓰면 return을 안넣어야 한다.
//     - 안그러면 나중에 의도한 return 타입이 아닌 void가 대신 할당될 수 있기 때문!
// - void 대신 undefined 사용하기 ***
//   - void 대신에 리턴 타입으로 undefined를 사용할 경우 undefined의 경우 리턴 값이 있으면 안되기 때문에 return 값이 올 수 없다.
//   - void는 undefined와 다르다.
//
//
// ### method의 리턴 타입으로 사용하는 void
//   - talk: () => void;
//   - method에서는 return을 해도 에러가 발생하지 않는다.
interface Human {
    talk: () => void;
}
const human: Human = {
    talk() {
        return 1; // 이 녀석은 에러가 나지 않지
    },

    // 이러한 경우도 에러가 나지 않는다.
    // talk(){ }
    // talk(){ return; }
};
// ※ void 때문에 type이 꼬이는 경우
//   - void를 리턴 타입으로 잡으면 타입이 꼬일 수 있다.
//   - 타입이 꼬이면?
//     1. void로 타입이 꼬이기 시작하면 기대했던 타입의 해당 메소드들을 쓰지 못하게 된다.
//     2. 이를 해결하기 위해 강제 타입 변환을 사용 해야할 수 있다.
//   - 이러한 이유 때문에 void를 쓰는 경우 return하는 것을 지양해야한다.
//   - 예시
//     - const c 는 number를 반환받지만 type은 void로 인식한다.
//     - 'c'는 Number가 제공하는 메소드를 사용하면 ts 측에서 에러를 발생시킨다.(ts에러는 나지만 js로 코드 변환은 가능!) 즉, 타입이 꼬이게된다.
const c = human.talk();

// ※ void 타입 강제 변환 시키기
//   - 타입이 꼬인 경우에는 강제 변환을 이용해서 해결할 수도 있다.
//   - 1. as 사용하기
const d = human.talk() as unknown as number;
//   - 2. <> type 사용하기(비권장)
//     -> 얘는 react와 함께 쓸 경우 ts가 jsx와 헷갈려 잘 인식이 안될 수 있기 때문
const e = <number>(<unknown>human.talk());

// ※ unknown을 쓰는 이유
//   - void 타입을 바로 number로 변환하려고하면 ts에서 실수로 받아들이고 이를 에러 처리할 수 있다.
//   - unknown을 사용하면 이러한 에러를 맊을 수 있다.
//   - 타입간 호환성을 확인하려면 README 타입간 대입 가능표 참고(보통 ts에서 다 알려준다.)

// ※ any vs unknown
// - 써야된다면 이왕 쓸 거 unknown을 사용하자!
// - any
//   - 일부러 ts가 타입 체킹을 포기하게 만든 것
//   - 더 이상 타입 검사를 안하겠다는 포기 선언.
//     -> 타입스크립트 쓰는 의미가 없어진다.
//   - 따라서 이미 만들어진 타입(혹은 남이 만든 타입)이 틀렸을 때만 사용하자.
// - unknown
//   - unknown을 쓰면 에러가 발생 -> 직접 b의 타입을 정해주어야한다.
//   - 타입을 정해줘서 정해진 타입만 쓸 수 있도록 만드는 것
//     - 선언할 때 : 타입을 모르겠어;
//     - 쓸 때 : as이용해서 타입 지정해서 쓸게
//   - error객체가 unknown 타입을 가진다. -> 어떤 에러가 나올 지 모르기 때문에 unknown으로 지정해 놓은 것
//
//
// ### 3. 매개 변수로 선언한 void
//   - function a(callback: () => void) { }
//   - return을 해도 에러가 발생하지 않는다.
function a2(callback: () => void): void {}
a2(() => {
    return "3"; // 이 녀석도 에러가 나지 않는다.
});

// ## void 실전 예제
declare function forEach(arr: number[], callback: (el: number) => void): void;
// ※ declare
//   - declare를 이용하면 구현체 없이 함수의 타입을 만들어서 사용이 가능하다.
//   - 타입 정의만 하고 실제 구현체는 다른 곳에 있다고 ts를 속일 수 있는 것!
//   - 주로 외부에서 선언된 함수나 변수에 대해 타입 선언을 할 때 declare를 자주 사용한다.

let target: number[] = [];
forEach([1, 2, 3], (el) => target.push(el)); // 지정한 타입: void, 실제 리턴 타입: number
forEach([1, 2, 3], (el) => {
    target.push(el);
}); // 지정한 타입: void, 실제 리턴 타입: void
//- 이 경우 callback함수의 return 타입을 number로 바꿔주면 void를 리턴 타입으로 갖는 호출에서 에러가 발생한다.
//
//

// # 타입 가드 ***
// - 타입이 여러개일 수도 있는 상황('|'(or)을 사용한 경우) 타입을 구분해주는 것이 굉장히 중요하다.
// - 타입 가드 === 해당 변수가 특정 타입임을 보장해주는 것
//
// ## case 1. number or string
//    - 내가 받은 매개변수가 number 인지 string인지 구분하는  경우
function numOrStr(a: number | string) {
    // 에러 상황
    // a.toFixed(1); // -> error! string도 될 수 있기 때문에 ts에서 에러를 발생시킨다.
    // (a as number).toFixed(1); 이렇게 처리할 수도 있지만 이렇게 되면 number("123"); 실행 시 a가 문자열이 되기 때문에 에러가 나게된다.

    // 타입 가드
    // - if문과 else를 통해 type을 필터링(가드) 가능하다.
    if (typeof a === "string") {
        a.split(",");
    } else {
        a.toFixed(1); // 소수점 표기 함수
    }
    if (typeof a === "number") {
        a.toFixed(1);
    }
    // 해당 변수와 연관 없는 타입을 테스트할 경우 a의 타입을 never로 지정해버린다.
    if (typeof a === "boolean") {
        // if문 안에서 a는 never 타입이된다.
        // 해당 if 문 안에서는 a는 never 타입이 되기 때문에 더 이상 사용할 수 없다는 뜻.
        a.toString(); // error..
    }
}
//
numOrStr("123");
numOrStr(1);
//
//
// ## case 2. number or number[]
//    - 내가 받은 매개변수가 배열인지 아닌지 구분하는 경우
function numOrNumArray(a: number | number[]) {
    // 배열은 Array.isArray()를 사용해서 배열임을 확인한다.
    if (Array.isArray(a)) {
        //number[]
        a.concat(4);
    } else {
        // number
        a.toFixed(3);
    }
}
numOrNumArray(123);
numOrNumArray([1, 2, 3]);
//
//
// ## case 3. class type 가드
//    - 인스턴스가 해당 클래스의 타입이 맞는지 확인
//
// ### class type
// - 클래스는 그 자체로 타입이 될 수 있다.
// - 클래스 타입은 인스턴스의 타입핑을 클래스 이름으로 명시한다는 의미**
// - 클래스를 타입으로 사용하면 클래스 자체를 뜻하는게 아니라 new로 인해 생성된 객체를 의미하여 타입으로 사용할 때는 객체로 넘겨주어야 한다.
class classTypeA {
    aaa() {}
}
//
class classTypeB {
    bbb() {}
}
//
function aOrB(param: classTypeA | classTypeB) {
    // 클래스 간에는 instanceof로 구분한다.
    if (param instanceof classTypeA) {
        param.aaa();
    }
    if (param instanceof classTypeB) {
        param.bbb();
    }
}
// 객체로 넘겨줌
aOrB(new classTypeA());
aOrB(new classTypeB());
//
//
// ## case 4. object type
// - 객체 타입에서는 "속성의 값"이 다른 경우(= type의 값이 다른 경우)나 "속성의 이름"이 다른 경우(bbb,ccc,ddd처럼 속성의 이름이 다른 경우) 이 2가지를 이용해서 객체를 구분할 수 있다.
//
// ### 방법 1. '속성의 값'과 if문을 이용하여 구분하기
type TypeB = { type: "b"; bbb: string };
type TypeC = { type: "c"; ccc: string };
type TypeD = { type: "d"; ddd: string };
function typeCheck(a: TypeB | TypeC | TypeD) {
    if (a.type === "b") {
        a.bbb;
    } else if (a.type === "c") {
        a.ccc;
    } else {
        a.ddd;
    }
}
type TypeB2 = { type: "b"; bbb: string };
type TypeC2 = { type: "c"; ccc: string };
type TypeD2 = { type: "c"; ddd: string };
function typeCheck2(a: TypeB2 | TypeC2 | TypeD2) {
    if (a.type === "b") {
        a.bbb;
    } else if (a.type === "c") {
        // a의 타입이 c 또는 d가 될 수 있기 때문에 에러가 나는 것
        a.ccc;
    } else {
        // 이 경우 위의 if 문에서 모든 type들이 걸러졌기 때문에 a는 never 타입을 가지게 된다.
        a.ddd;
    }
}
//
// ### 방법 2. "속성의 이름"과 if문을 이용해서 구분하기
// - 'in' 연산자를 이용해서 해당 속성을 가지고 있는 객체 타입을 선택한다.
function typeCheck3(a: TypeB2 | TypeC2 | TypeD2) {
    if ("bbb" in a) {
        // a 객체는 bbb라는 속성을 가지고 있을 때 if문 실행
        a.type;
    } else if ("ccc" in a) {
        a.type;
    } else {
        a.type;
    }
}
//
// ※ 객체를 만들 때 들이면 좋은 습관!
// - 어떤 객체를 만들든 type이라는 속성을 하나씩 넣는 습관을 들이자! for ts
// - 객체에 tag, label을 달아준다고 생각하면 편하다.
// - type을 달아주지 않으면 앞에서 언급한 속성 값이나 속성 이름의 차이를 이용해 객체를 찾아야한다.
//   -> 이것도 나쁜 방법은 아님!
const human2 = { type: "human" };
const dog2 = { type: "dog" };
const cat2 = { type: "cat" };
// - 이렇게 해두면 나중에 어떤 객체가 원하는 객체가 맞는지 빠르게 확인할 수 있다.
if (a.type === "human") {
    // ...
}
//
//
// ## is 연산자
// - is 연산자를 이용하면 타입을 구분해주는 커스텀 함수를 직접 만들 수 있다.
// - 간단하게 if 문으로도 객체를 구별할 수 있지만 is를 이용해서 커스컴 함수를 만들어 둘 수 있다는 걸 알아두자!
// - is에 대해서 ts docs 찾아보기!
interface Cat {
    meow: number;
}
interface Dog {
    bow: number;
}
// 직접 만든 타입 가드(커스텀 타입가드)
// - is를 이용하면 커스텀 타입 가드를 만들 수 있다.
function catOrDog(a: Cat | Dog): a is Dog {
    // 함수 내에선 타입 판별을 직접 만든다.
    // 인수로 받은 객체가 Cat일 경우 false, Dog일 경우 true를 리턴
    if ((a as Cat).meow) {
        return false;
    }
    return true;
}
// 타입을 구분해주는 커스텀 함수
function pet(a: Cat | Dog) {
    if (catOrDog(a)) {
        console.log(a.bow);
    }
    if ("meow" in a) {
        console.log(a.meow);
    }
}
//
// ### is 예시
// - 해당 함수가 타입 가드인지 확인하려면 is가 있는지 확인하면 된다.
// - is가 있으면 타입 가드
// - 해당 코드는 Promise의 결과들 중에서 성공한 결과 또는 실패한 결과만을 타입을 통해 구분하여 거르는 코드이다.
//
// 에러난 것만 걸러내고 싶을 때는 isRejected 타입 가드를 사용한다.
const isRejected = (
    input: PromiseSettledResult<unknown>
): input is PromiseRejectedResult => input.status === "rejected";
// 성공한 것만 걸러 내고 싶을 때는 isFulfilled 타입 가드를 사용한다.
const isFulfilled = <T>(
    input: PromiseSettledResult<T>
): input is PromiseFulfilledResult<T> => input.status === "fulfilled";

const promises = await Promise.allSettled([
    Promise.resolve("a"),
    Promise.resolve("b"),
]);
// ts는 특별히 구분을 해주지 않으면 성공했는지 실패했는지 알 수 없기 때문에 Promise 완료 상태를 나타내는 PromiseSettledResult 타입을 갖게 된다.
const errors1 = promises.filter((a) => true);
// 코드는 isRejected 타입 가드에서 쓰이는 코드와 동일하지만(기능 상으론 맞는 코드) is를 안써주면 ts에서는 PromiseSettledResult로 판다하게 된다.
const errors2 = promises.filter((promise) => promise.status === "rejected");
// 타입 가드로 적용해주면 알맞게 타입을 판단한다.
const errors3 = promises.filter(isRejected);
const errors4 = promises.filter(isFulfilled);

// ※ ↑ promise와 type ↑
// - Promise 기본 개념
//   - Promise -> Pending -> Settled(Resolved, Rejected) 순으로 상태가 진행된다.
//   - Promise : Promise 실행
//   - Pending : 아직 비동기 작업 중인 경우의 Promise 상태
//   - Settled : 비동기가 완료된 상태, 비동기 결과에 따라 Resolved(성공), Rejected(실패)로 값이 나뉜다.
//
// - promise.then().catch()
//   - then, catch 모두 Settled 상태의 Promise 값을 다룬다.
//   - then() : Resolved 한 Promise를 다루는 함수
//   - catch() : Rejected 한 Promise를 다루는 함수
//
// - PromiseSettledResult, PromiseFulfilledResult, PromiseRejectedResult
//   - PromiseSettledResult : Promise가 Settled된 상태
//   - PromiseFulfilledResult : Settled 중에서 결과가 성공한 상태
//   - PromiseRejectedResult : Settled 중에서 결과가 실패한 상태

// # Read-Only
// - ts에서는 readonly를 이용하여 실수로 데이터를 수정하는 것을 막아준다.
interface A {
    readonly a: string;
    b: string;
}
const aaaa: A = { a: "hello", b: "world" };
aaaa.a = "123";

// # indexed signature? mapped type?***
// - indexed signature를 이용하면 객체가 특정 구조를 준수하여 구현됨을 바랄 수 있다.
// - 정확한 타입을 사용하는 것이 중요한데 indexed signature를 이용해서 key와 string의 범위를 제한해서 사용할 수 있다.
//   - indexed signature를 활용하여 type B를 type C 처럼 표현할 수 있다.
type B = { a: string; b: string; c: string; d: string };
// - index signature 사용 1.
type C = { [key: string]: string }; // 어떤 key든 간에 전부다 문자열이고, 그 어떤 key들의 값도 문자열이라는 뜻.
// - index signature 사용 2.
type D = "Human" | "Mammal" | "Animal";
type E = { [key in D]: number };
const eeee: E = { Human: 123 };
const eeee2: E = { Human: 123, Mammal: 456, Animal: 789 };
type F = { [key in D]: D };
const ffff: F = { Human: "Human", Mammal: "Mammal", Animal: "Animal" };
// ※ 강의 설명 시 mapped type과 indexed signature에 대한 설명이 부족한 것 같으니 docs 참고

// # class의 implements, private, protected
//
// ## implements : 구현하다.
// - class가 interface A를 implements한다고 하면 interface A를 따라야한다.
// - class의 모양을 interface로 통제하는 것
// - interface 내에서 readonly를 사용할 수 있다.
// - interface 내에서는 private와 protected를 구현할 수 없다.
interface classInterface {
    readonly a: string;
    b: string;
}
class classA implements classInterface {
    a: string = "hello";
    b: string = "world";
    c: string = "wow"; // public

    method() {
        // a는 private이기 때문에 method 안에서만 써야한다.
        console.log(this.a);
        // b는 protected이기 때문에 method 안에서만 사용이 가능하다.
        console.log(this.b);
    }
}
//
// ## private, protected
// - ts에서 private, protected를 사용할 수 있다.
// - 하지만 js로 코드 컴파일 후에는 이 기능을 찾아볼 수 없다.
// - readonly와 복합적으로 섞어서 쓸 수도 있다.
class classB extends classA {
    method() {
        // private, protected
        // - private: class 내에서만 사용 가능
        console.log(this.a);
        // - protected: class 및 class를 상속한 class 내에서만 사용 가능
        console.log(this.b);
        console.log(this.c);
    }
}
new classB().a;
new classB().b;
new classB().c;

// ※ public, private, protected
//          public       protected       private
// 클래스내부    O              O              O
// 상속클래스    O              O              X
// 인스턴스     O              X              X

// ※ ts에서의 interface & class & abstract class
// - 보통 객체 지향 프로그래밍을 위해선 interface를 쓰는게 추상에 의존하고 구현에 의존하지 않게되어 더 적합한 코딩일 수 있다.
// - 하지만 js로 변환 시 interface가 남아있지 않고 class에서도 interface에서 처럼 private이나 protected를 사용할 수 있기 때문에 interface만 쓰지않고 class를 쓸 수 있다.
//
// interface
// - interface는 js에서는 존재하지 않는 개념이기 때문에 다른 곳에서 가져와 쓸 수 없다.
// class
// - class 자체는 하나의 type이기 때문에 바로 다른 곳에서도 쓸 수 있고 js에서 남아있다는게 class에서의 큰 장점이다.
// abstract class
// - class를 추상으로 쓸 수 있는 방법
// - abstract 키워드를 붙여 사용한다.
// - 예시
abstract class AbstractB {
    private readonly a: string = "123";
    protected p: string = "world";
    c: string = "wow";

    abstract method(): void;
    method2() {
        return 3;
    }
}
class classC extends AbstractB {
    // abstract로 된 것을 반드시 구현해야한다.
    method() {
        console.log(this.c);
    }
}
//
// - 따라서 보통 추상에 의존하고 js에서는 사라져도 되면 interface js에서 코드가 남아있어야하면 class를 사용하면된다.
// - 또한 class를 쓰면서 추상 개념을 쓰려면 "abstract class"를 사용한다.
// - abstract class를 사용하면 java처럼(객체 지향 프로그래밍)처럼 프로그래밍할 수 있다.

// # 옵셔널(optional)
// - ? 연산자 사용
// - 있어도 되고 없어도 된다는 뜻, 말 그대로 옵션
// - optional vs spread
//   - optional : 개수가 정해져있는데 몇 개 매개변수에 대해서만 조건을 걸 경우 사용
//   - spread : 모든 매개변수에 대한 조건을 한번에 걸 경우 사용
function abc(a: number, b?: number, c?: number) {}
abc(1);
abc(1, 2);
abc(1, 2, 3);
abc(1, 2, 3, 4);
//
let obj2: { a: string; b?: string } = { a: "hello", b: "world", c: "wow" };
obj2 = { a: "hello" };

// # 제네릭(Generic)
// - 제네릭이 필요한 이유
//   - 지금 현재 타입(만들 때 타입, 선언할 때 타입)은 뭔지 모르겠으나 나중에 정하겠다!
//   - 코드 작성할 때는 타입이 뭐가 될 줄은 모르는데 코드를 실행할 때는 확실히 아는 경우 이 자리를 제네릭으로 역어둔다.
// - 제네릭이란?
//   - 타입을 변수처럼 만드는 것
//   - 제네릭도 js에서 사라진다.
// ## 잘못된 코드 예
function add(x: string | number, y: string | number): string | number {
    return x + y;
}
// - 기대한 결과
add(1, 2); // 3
add("1", "2"); // '12'
// - 에러 발생 : 이 경우에는 동작이 안되도록 만들었어야 한다.
add(1, "2"); // '12'
add("1", 2); // '12'
//
// ## 제네릭 사용 후 해결
// - 보통 T로 타입 변수를 많이 쓴다.
// - 보통 같은 타입을 '하나의 문자(T)'로 표현함
function add2<T>(x: T, y: T): T {
    // ts에서는 T가 뭔지 인식을 못하기 때문에 에러를 일으킨다.
    // ts: T가 뭐길래 T + T를 하는거야?
    return x + y;
}
// - 같은 타입일 경우에는 성공
add2(1, 2);
add2("1", "2");
add2(true, false);
// - 서로 다른 타입의 경우에는 실패
add2(1, "2");
add2("1", 2);
// - 타입 직접 ts에게 알려주기(= type parameter)
//   - ts가 타입 추론을 잘 못하고 있을 경우 직접적으로 사용되는 제네릭 타입(T)의 타입을 지정해줄 수 있다.
add2<number>(1, 2);
add2<string>("1", "2");
// ※ <number>add2 => 이거는 강제 타입 변환이기 때문에 <>를 사용하는 위치에 유의하자.
//
// ## 제네릭 타입 제한하기
// - extends 키워드를 통해서 제네릭에서 사용할 수 있는 타입을 제한할 수 있다.
// - extends 키워드 뒤에 오는 타입들의 부분 집합만이 해당 제네릭 타입으로 사용될 수 있다.
// 타입 제한 사용하기
// - add3에서 T로 올 수 있는 타입은 string, number, string | number이다.
function add3<T extends string | number>(x: T, y: T): T {
    return x + y;
}
// - 서로 다른 타입이거나 범위 밖의 타입의 경우에는 실패
add3(false, true);
add3(1, "2");
add3("1", 2);
//
// ## 제한된 제네릭 타입 여러개 사용하기
function add4<T extends number, K extends string>(x: T, y: K): T {
    return x + y;
}
add4(1, "2");
add4("1", 2);
//
// ## map과 forEach, filter를 통한 제네릭 예시
// - 해당 예시들을 통해서 제네릭이 어떻게 변수의 타입을 이해하는지 살펴볼 수 있다.
// - 제네릭이 타입을 인식하는 과정
//   - add2(1,2);
//   1. add2에서 x 자리의 인수 1의 타입(number)을 인식한다.
//   2. x와 같은 타입 즉 T의 자리에 number를 모두 집어넣는다.
// - 제네릭으로된 코드를 보고 이해가 가지 않는다면 해당 함수의 실행문 예시를 돌려보면서 차분하게 해당 제네릭 타입을 하나 하나 채워보자 :)
interface Array<T> {
    forEach(
        callbackfn: (value: T, index: number, array: T[]) => void,
        thisArg?: any
    ): void;
    map<U>(
        callbackfn: (value: T, index: number, array: T[]) => U,
        thisArg?: any
    ): U[];
    // 같은 함수가 여러가지 방법으로 사용되는 경우에는 타입이 여러번 선언되어 있는 경우가 있다.
    filter<S extends T>(
        predicate: (value: T, index: number, array: T[]) => value is S,
        thisArg?: any
    ): S[];
    filter(
        predicate: (value: T, index: number, array: T[]) => unknown,
        thisArg?: any
    ): T[];
}
// ### forEach 예시
// 1. 배열 내에서 아이템 한개를 가져와 타입을 판단한다(item type = string)
// 2. value: T가 value: string이 되고 다른 T 자리에도 모두 string이 들어간다.
["1", "2", "3"].forEach((value) => {
    console.log(value);
}); // 출력: 콘솔에 1, 2, 3
[true, false, true].forEach((value) => {
    console.log(value);
});
// 타입이 다른 경우에는 T 값이 '|'(or)로 연결되어 나타난다.
["123", 123, true].forEach((value) => console.log(value));
// Array의 제네릭 타입을 number로 지정해주고 시작
const array: Array<number> = [1, 2, 3];
array.forEach((value) => {
    console.log(value);
});
// ### map 예시
// 1. 배열 내에서 아이템을 한개 가져와 타입을 판단한다. (item type = number)
// 2. value: T가 value: number이 되고 다른 T 자리에도 모두 number이 들어간다.
// 3. return에서 string 타입이 반환되는 것을 인식해서(item.toString()) U 자리에 string이 들어가게 된다.
const strings = [1, 2, 3].map((item) => item.toString());
// ### filter 예시
// - filter의 경우 제네릭 타입에 대한 정의가 2가지가 있기 때문에 어떤 상황에 어떤게 쓰이는지 확인해야한다.
// - 각각의 경우 확인해보기
//   1. T와 S를 사용한 filter
//      - filter<S extends T>(predicate: (value: T, index: number, array: T[]) => value is S, thisArg?: any): S[];
//      - 해당 경우는 배열의 아이템에 의해 T가 정해지고 S가 정해진 T에 의해 S의 범위가 제한되는 모습을 나타내고 있다.
//   2. T와 never를 사용한 filter
//      - filter(predicate: (value: T, index: number, array: T[]) => unknown, thisArg ?: any): T[];
//      - 해당 경우는 배열의 아이템에 의해 T가 확정되면서 해당 함수에 필요한 타입을 다 알 수 있게된다.
// filter 예시 1 : 기본형
const filtered = [1, 2, 3, 4, 5].filter((value) => value % 2);
// filter 예시 2 : type이 섞인 배열
const filtered2 = ["1", 2, "3", 4, "5"].filter(
    (value) => typeof value === "string"
);
// filter 예시 3 : predicate(callback 함수) 분리하기
const predicate = (value: string | number): value is string =>
    typeof value === "string";
const filtered3 = ["1", 2, "3", 4, "5"].filter(predicate);
// filter 예시 4 : 제네릭 직접 지정해주기
// - 제네릭을 아래 처럼 직접 지정해줄 수 있다. 하지만 filter 함수는 callback 함수가 커스텀 타입가드(형식 지정자)가 아니기 때문에 에러가 나는 것을 확인할 수 있다.
const result = [1, "2"].filter<string extends string | number>((value) => typeof value === "string");

// # extends 키워드
// - 제네릭에 제한을 둘 수 있게 해주는 키워드
// - extends를 사용할 때 특정 타입을 지정하여 원하는 모양의 타입을 입력받을 수 있다.
// - extends 타입 종류 예시
//   - <T extends {...}> // 특정 객체
//     function extendsTest<T extends {a: string}>(x: T): T {} 
//     extendsTest({a: 'hello'});
//   - <T extends any[]> // 모든 배열
//     function extendsTest<T extends string[]>(x: T): T {}
//     extendsTest(['1','2','3']); 
//   - <T extends (...args: any) => any> // 모든 함수
//     - 이 경우에 any는 모든 함수(제한 없음)라는 의미로 any가 함수의 범위를 나타내주는 케이스이므로 any를 사용해도 된다.***
//     function extendsTest<T extends (a: string) => number>(x: T): T {} 
//     extendsTest(a => +a);
//   - <T extends abstract new (...args: any) => any> // 생성자 타입
//     function extendsTest<T extends abstract new (...args: any) => any>(x: T):T {return x};
//     class A {}
//     extendsTest(A)
//   - <T extends keyof any> // string | number | symbol

function addExtends<T extends string>(x: T, y: T): T {
    return x + y;
}
add(1, 2);
add("1", "2");
function extendsTest<T extends abstract new(...args: any) => any>(x: T): T { 
    return x
};
class A { }
extendsTest(A)
// 아래 코드는 생성자가 아니라서 에러가 발생
extendsTest(new A())
