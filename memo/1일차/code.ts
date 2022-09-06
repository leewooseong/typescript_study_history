function day1() {
    // let a: string = "hello";
    // a = "1234";

    // 타입을 적어줄 때는 무조건 소문자로!, 대문자를 쓰면 지옥이 펼처진다. (대문자는 생성자 함수 사용할 때 이용하기)
    const a: number = 5;
    const b: string = "5";
    const c: boolean = true;
    const d: undefined = undefined;
    const e: null = null;
    // any를 쓰면 모든 타입이 다 되기 때문에 js와 다를 것이 없다.
    const f: any = true;
    const g: true = true; // 이런 식으로 특정 값을 고정시켜서 사용할 수 있다. 최대한 타입을 정확하게 잡기 위해서 이런 방식을 이용***
    const h: 5 = 5;

    // 일반 함수 타입
    function add(x: number, y: number): number {
        return x + y;
    }
    // 1. 함수 타입 빼주기
    function add3(x: number, y: number): number;
    function add3(x, y) {
        return x + y;
    }
    // 화살표 함수 타입
    // const add: (x: number, y: number) => number = (x, y) => x + y;
    // 위의 코드와 다르게 타입을 따로 빼 줄 수 있다.
    // 1. type을 이용하여 타입 빼주기
    type Add = (x: number, y: number) => number;
    const addArrow: Add = (x, y) => x + y;
    // 2. interface를 이용하여 타입 빼주기
    interface Add2 {
        (x: number, y: number): number;
    }
    const addArrow2: Add2 = (x, y) => x + y;

    // 객체
    const obj: { lat: number; lon: number } = { lat: 37.5, lon: 127.5 };

    // 배열
    const arr1: string[] = ["123", "456"];
    const arr2: number[] = [123, 456];
    const arr3: Array<number> = [123, 456]; // 제네릭을 이용한 방법
    const arr4: [number, number, string] = [123, 456, "hello"]; // 튜플을 이용한 방법, 타입 및 원소 개수도 맞춰줘야한다.
    // 빈배열
    // - 빈배열의 타입스크립트 선언 시에는 반드시 미리 타입을 지정해야 나중에 해당 타입의 원소를 배열에 집어넣을 수 있다.
    // - 타입스크립트 선언 시에 never라는 타입이 뜨면 배열엔 아무것도 올 수 없다.
    const emptyArr = []; // 다른 요소를 추가할 수 없다. never type
    const strArr: string[] = []; // string 요소들을 추가할 수 있다.
    strArr.push("hello");

    // 타입스크립트의 타입추론 ***
    // 타입스크립트에서는 타입을 지정해주지 않아도 할당된 값을 이용하여 자동 추론이 된다.
    // ts의 타입 추론이 맞다면 그대로 사용하고 추론이 제대로 동작하지 않았다면 타입을 수정해주자.
    // 타입을 지웠을 때 자동으로 타입추론을 제대로 하고 있다면 그 타입은 제거해주자.
    const a2 = "5";
    const b2 = 4;
    const c2 = true;
    const d2 = undefined;
    const e2 = null;
    // ※ 변수에 마우스를 올렸을 때 타입이 제대로 나오면(ts가 타입 추론을 제대로 하고 있다면) 굳이 타입을 적어줄 필요가 없다.
    // - const a:string = "5"의 경우
    // - "5"라는 타입이 정해지면 const로 값이 변할 수 없지만 string이라는 것을 명시해주면 타입이 "5"에서 string으로 타입의 범위가 확장됨 -> 타입이 더 부정확해졌다.
    // 결론 : 타입스크립트 작성 시 우선 ts가 추론해주는 자동 추론에 맡기고 타입 추론이 잘못됐다면 나서서 타입을 수정한다. 타입은 최대한 좁게 적어라!!

    // ※ type, interface, 제네릭, body없는 function, as는 js 코드 변환시 사라지는 정보이다.

    // | : union(or와 동일)
    // - 이걸 사용할 경우 타입추론이 제대로 동작하지 않을 수 있다.
    const head = document.querySelector("#head");
    console.log(head);
    // - union 사용 시 이처럼 리턴 타입이 모호해지거나 타입의 정확성을 떨어뜨리는 코드 작성은 피해야한다.
    function unionAdd(x: string | number, y: string | number): string | number {
        return x + y;
    }
    // - 객체에서 union 사용하기 : 여러 개 중에 한개라도 있으면 된다.
    type UnionA = { hello: "world" } | { zero: "cho" };
    const unionA = { hello: "world" };
    // 타입스크립트할 때는 처음 타입을 잘 잡아놔야한다.. 안그러면 나중에 줄줄이 꼬인다.

    // & : ampersand(and와 동일)
    // - 객체에서 많이 활용된다.
    // - 객체 사용 시 "모든 속성이 다 존재"(intersection)해야 한다.(intersection)
    type AmpersandA = { hello: "world" } & { zero: "cho" };
    const ampersandA: AmpersandA = { hello: "world", zero: "cho" };
    // - 확장(상속)의 개념으로 사용 가능하다.
    type Animal = { breath: true };
    type mammal = Animal & { breed: true };
    type Human = mammal & { think: true };
    const zerocho: Human = { breath: true, breed: true, think: true };
    interface IAnimal {
        breath: true;
    }
    interface IMammal extends IAnimal {
        breed: true;
    }
    interface IHuman extends Human {
        think: true;
    }
    const zerocho2: IHuman = { breath: true, breed: true, think: true };

    // ! : null 이나 undefined가 아님을 보증 -> 비추, 나중에 코드를 수정하느 과정에서 큰일이 날 수 있다.
    // 따라서 ! 보다는 if 문을 사용해주자.
    const head2 = document.querySelector("#head")!; // (x)
    head2.innerHTML = "hello"; // (x)

    const head3 = document.querySelector("#head"); // (o)
    if (head3) {
        head3.innerHTML = "hello";
    }

    // 타입 정교화시키기
    type World = "world" | "hell";
    const aType: World = "world";
    const bType = `hello ${aType}`;

    type Greeting = `hello ${World}`;
    const cType: Greeting = "hello world"; // 해당 값을 할당할 때 type을 미리 지정해놓으면 지정해놓은 타입값으로 값을 정교화(제한)시킬수 있다.

    // rest 파라미터
    function rest(...args: string[]) {
        console.log(args);
    }
    rest("1", "2", "3"); // ["1", "2", "3"] 출력
    function rest2(a: string, ...args: string[]) {
        console.log(a, args);
    }
    rest("1", "2", "3"); // "1", ["2", "3"] 출력

    // tuple
    const tuple: [string, number] = ["1", 1];
    // tuple[2] = "hello";  // -> 넣을 수 있는 건 2개까진데 3번째 자리에 수를 넣으려고해서 에러!
    tuple.push("hello"); // ts의 허술한 점: push를 이용하면 에러를 못잡아낸다.

    // enum
    // - 프리온보딩 디스코드나 단톡방에 관련 글 읽어보기
    // - 변수들을 하나의 그룹으로 묶고 싶을 때 enum을 사용한다.
    // - 일반 객체와 차이점 : js 코드로 변환 시 반영되지 않는다(사라짐)
    // - 이러한 특징 때문에 코드를 사라지게할 경우가 아니라면 왠만하면 코드를 남겨준다.
    const enum EDirection {
        Up,
        Down,
        Left,
        Right,
    }

    const enum1 = EDirection.Up; // 첫 번째 요소는 1을 반환한다.
    const enum2 = EDirection.Down; // 두 번째 요소는 2을 반환한다.
    const enum3 = EDirection.Left; // 세 번째 요소는 3을 반환한다.
    // ...

    // 아래와 같이 특정 타입을 지정할 수 있다.
    const enum EDirection2 {
        Up = 3,
        Down = 4,
        Left,
        Right,
    }

    // enum과 다르게 js 코드로 변환해도 js 코드에 남아있는다.
    const ODirection = {
        Up: 0,
        Down: 1,
        Left: 2,
        Right: 3,
    } as const;
    // ※ as const?
    // - as const를 사용하지 않는다면 해당 타입을 number로 추론하고 타입을 해당 값으로 추론하지 못한다.
    // - as const를 사용하면 객체에 지정해준 값을 타입으로 사용할 수 있다.
    // - as const를 사용한 것은 다음의 코드와 동일하다.
    const ODirection2: { Up: 0; Down: 1; Left: 2; Right: 3 } = {
        Up: 0,
        Down: 1,
        Left: 2,
        Right: 3,
    };

    // enum으로 타입 지정하기
    // - enum을 통해 생성된 그룹은 하나의 타입으로 사용할 수 있다.
    // - 그룹 요소 중 하나를 사용할 것이라는 의미
    function walk(dir: EDirection) {}
    // enum을 쓰는 경우
    // - enum을 쓰지 않으면 위의 코드가 아래처럼 복잡해진다.
    type Direction = typeof ODirection[keyof typeof ODirection];

    // ※ typeof & keyof
    // - typeof : 값을 형식(타입)으로 사용하고 싶은 경우 typeof를 사용하여 형식(타입)으로 변경
    // - keyof : 객체 형식(타입)이나 enum 형식(타입)에서 key들만 뽑아오고 싶을 때 keyof를 사용
    const obj1 = { a: "123", b: "hello", c: "world" } as const;
    type Key = keyof typeof obj1;
    // - value들만 가져오고 싶을 때는 아래의 코드를 이용한다. typeof obj1[] 사용할 때는 반드시 as const가 필요하다!
    type Value = typeof obj1[keyof typeof obj1];

    // type alias(타입 별칭)_type, interface
    // 예시
    // 1. const b: { breath: true } = { breath: true, breed: true };
    // 2. type Animal = {breath : true}
    //    const b: Animal = ...
    // 3. interFace A {breath : true}
    //    const b: A = ...
    // - 위 예시를 보면 b의 타입은 {breath:true}이다. 이를 type과 interface를 사용하면 타입을 변수처럼 다른 이름으로 사용할 수 있다. 이를 type alias(타입 별칭)이라 한다.
    // - type과 interface는 기존의 type에 이름을 붙여주는 역할을 수행한다고 생각하면 된다.

    // - 객체의 타입을 정의하는 방법?
    // - 1. type 이용하기
    type A = { a: string };
    const objA: A = { a: "hello" };
    const objAA: { a: string } = { a: "hello" };
    // - 2. interface 이용하기
    interface B {
        a: string;
    }
    const objB: B = { a: "hello" };
    // ※ type vs interface
    // 1. type
    //   - 간단하게 이용하고 싶다면 type을 이용해야한다.
    //   - type은 중복 선언이 불가능하다.
    type TA = { a: string };
    type TA = { b: string };
    const objT: TA = { a: "hello", b: "world" };
    // 2. interface
    //    - 객체 지향 프로그래밍을 이용하고 싶을 때는 interface를 이용해야한다.
    //    - interfaces는 여러번 선언이 가능하다.
    //    - 선언할 때마다 합쳐짐, 이 특징을 이용하여 다른 사람의 라이브러리를 수정할 수 있다.***
    //    - 확장성 때문에 interface를 많이 쓴다.
    interface IA {
        a: string;
    }
    interface IA {
        b: string;
    }
    const objI: IA = { a: "hello", b: "world" };
    // - type과 interface는 기능적으로 분리된 것이 아니다. -> interface가 type을 extends할 수도 있고 반대일 수도 있다.
}
