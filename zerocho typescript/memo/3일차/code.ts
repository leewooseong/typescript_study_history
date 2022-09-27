// # 타입 직접 만들기***
// - 우리가 사용할 타입을 직접 선언해서 사용해보는 것 Arr
// - 우리가 타입을 만들게 되면 아무 문제 없이 돌아갈 수도 있다.
//   - 쉽게 발견되는 것이 아니기 때문에 쓰다보면서 잘못된게 보이면 그때 그때 고치면 된다.
interface Arr<T> {
    // 1. 타입을 작성할 때 실행되어야하는 모든 케이스를 생각하면서 해당 조건들을 충족할 수 있게 작성하도록 해야한다.
    //    -> 일단은 코드에서 에러가 발생하지 않을 정도로만 코딩!
    // 2. |(or)를 사용했을 때는 ts에서 특정 타입의 메서드를 못쓰게 막는다. -> 이런 경우 제네릭 사용
    // forEach(callback: (item: number | string) => void): void;
    // 3. 제네릭 사용
    // - T의 위치는 함수와 가까운 곳(forEach)에 붙일수 도 있고 타입과 가까운 곳(Arr)에 붙일수 도 있다.
    //   -> 처음 시작할 때는 정의할 함수와 가까운 곳부터 제네릭을 붙여나가자
    // - T의 위치를 임의로 설정하였지만 오류가 발생!
    //   -> 이는 T의 자리가 잘못된 것일 수 있다.
    //   -> 이럴 경우 T의 자리를 옮겨보며 맞는 자리를 찾아보자!
    // forEach<T>(callback: (item: T) => void): void;
    // - T의 위치 Arr으로 옮기기
    forEach(callback: (item: T) => void): void;
    // ## map type 만들기
    //    - 타입을 지정해나갈때 잘 모르겠다면 void로 채워넣고 한개씩 필요한 것을 채워보자
    //    map(callback: item => void): void;
    //
    //    - 한 개의 제네릭으로 커버가 불가능하다면 제네릭을 추가해보자
    //    map(callback: (item: T) => T): T[];
    //
    //    - 이 경우에는 Arr에 타입을 지정해줄 경우 map의 반환 타입으로 어떤 것을 쓸지 미리 생각해서 코딩하는 것이 힘들고 불편하다. 따라서 map에다가 제네릭을 붙여준다.
    map<S>(callback: (item: T) => S): S[];
    //
    // ## filter type 만들기
    //    - 시작은 void로!
    //    filter(callback: () => void): void;
    //
    //    - 기본적인 filter 기능을 이용할 때 사용되는 타입 넣어보기
    //      - 입력으로 들어온 배열 원소를 조건을 이용해서 필터링하여 필터링된 배열을 반환하는 것
    //      - 배열을 원소가 필터링된 결과에 그대로 사용됨으로 두 타입을 같아야한다.(제네릭 사용)
    //      - 배열 원소를 조건을 통해 판별하므로 callback 함수는 boolean 형식을 반환해야한다.
    //    - 배열 원소에 다른 타입이 섞여 있다면 기대했던 대로 동작하지 않는다.
    //    filter(callback: (item: T) => boolean): T[];
    //
    //    - 타입이 섞여있는 배열에 대한 해결책!
    //      - is 연산자를 이용해 해당 반환될 타입이 해당 원소의 타입으로 반환됨을 명시한다.
    //      - number | string 처럼 해당 타입이 number나 string으로 특정되기 위해선 number | string 타입과 number 타입이 다른 타입이기 때문에 또 다른 제네릭 S를 사용한다.
    //      - T와 S 사이에는 연관성이 필요하기 때문에 extends로 관계를 명시해준다.
    filter<S extends T>(callback: (item: T) => item is S): S[];
}
Array;

const forEachArr: Arr<number> = [1, 2, 3];
forEachArr.forEach((item) => {
    console.log(item);
    item.toFixed(1);
});
forEachArr.forEach((item) => {
    console.log(item);
    return "3";
});
const forEachArr2: Arr<string | number> = ["1", 2, "3"];
forEachArr2.forEach((item) => {
    console.log(item);
    item.charAt(3);
});
forEachArr2.forEach((item) => {
    console.log(item);
    return "3";
});
const mapArr: Arr<number> = [1, 2, 3];
const d = mapArr.map((v) => v + 1); // [2, 3, 4]
const e = mapArr.map((v) => v.toString); // ['2', '3', '4']; string[]
const f = mapArr.map((v) => v % 2 === 0); // [false,  true, false] boolean[]
const mapArr2: Arr<string> = ["1", "2", "3"];
const h = mapArr2.map((v) => +v);
const filterArr: Arr<number> = [1, 2, 3];
const i = filterArr.filter((v): v is number => v % 2 === 0); // [2] number[]
const filterArr2: Arr<number | string> = [1, "2", 3, "4", 5];
const j = filterArr2.filter((v): v is string => typeof v === "string"); // ['2', '4'] string[]

// # 공변성, 반공변성, 이변성, 불변성
// - 함수간에 서로 대입할수 있냐 없냐를 따지는 것
// - 이 개념을 이해하면 어떤 함수는 여기에 대입이되고 어떤 함수는 여기에 대입이 왜 안되는지를 구별할 수 있다.
// - 함수에 집합 개념을 더해서 어떤 것이 더 넓은 범위인지 생각해보는 것
// ## 공변성 & 반공변성
// - 그냥 외우자 ㅠ
// - 리턴 값은 더 넓은 타입으로 대입이 가능하다.
//   - 넓은 타입에서 좁은 타입으로는 대입이 불가능
function a3(x: string): number {
    return +x;
}
a3("1");
type B3 = (x: string) => number | string;
// b3와 a3는 서로 타입이 다르지만 대입이 가능하다.?
const b3: B3 = a3; //???????
// - 매개변수는 더 좁은 타입으로 대입이 가능하다.
function a33(x: string | number): number {
    // (x:string) => number 또는 (x:number) => number
    return 0;
}
a33("1");
type B33 = (x: string) => number;
// b3와 a3는 서로 타입이 다르지만 대입이 가능하다.?
const b33: B33 = a33; //???????

// # 타입 오버로딩
// - 함수는 declare 키워드를 활용하여 오버로딩을 구현할 수 있다.
declare function add3(x: number, y: number): number;
declare function add3(x: string, y: string): number;
declare function add3(x: number, y: number, z: number): number;

add3(1, 2);
add3(1, 2, 3);
add3("1", "2");
// - interface에서 오버로딩하기
interface Add {
    (x: number, y: number): string;
    (x: string, y: string): string;
}
// interface 구현부
// -> 실제 구현부는 any더라도 오버로딩 부분에서 해당 타입을 찾아준다.
const add33: Add = (x: any, y: any) => x + y;
add33(1, 2);
add33("1", "2");
add33("1", 2);

class AddClass {
    add333(x: number, y: number): number;
    add333(x: string, y: string): string;
    add333(x: any, y: any) {
        return x + y;
    }
}
const c = new AddClass().add333("1", "2");

// ※ 타입스크립트 시 주의사항
interface Axios {
    get(): void;
}
// 기존 Javascript Error에는 name, message, stack 속성 밖에 존재하지 않는다.
// -> axios에 쓰일 response라는 속성을 추가해줄 필요가 있다.
class CustomError extends Error {
    response?: {
        data: any;
    };
}
declare const axios: Axios;

(async () => {
    try {
        await axios.get();
    } catch (err: unknown) {
        // CustomError를 interface로 선언했을 경우 js에서 코드가 남아있지 않게되어 instanceof를 사용하면 에러가 발생하게 된다.
        // as 사용은 1회성이기 때문에 계속 사용할 수 있도록 customError(변수)를 지정해주거나 타입가드로 타입을 좁혀서 사용해야 한다.
        if (err instanceof CustomError) {
            // const customError = err as CustomError;
            // console.error(customError.response?.data);
            console.error((err as CustomError).response?.data);
        }
    }
})();

// # Utility Types
// - ts에 미리 만들어놓은 타입들
// - 유틸리티 타입들은 key에 적용되는 타입들이 있고 객체에 적용되는 타입이 있어서 이를 구분해서 사용해야한다.
interface Profile {
    name: string;
    age: number;
    married: boolean;
}

const wooseong: Profile = {
    name: "zerocho",
    age: 29,
    married: false,
};
// ## Partial<>
// - <>안에 들어오는 타입의 속성들을 모두 optional로 만들어주는 것
// - <>안에 들어가는 타입의 부분집합 중 하나를 타입으로 사용하겠다는 의미!
const newZerocho: Partial<Profile> = {
    name: "zerocho",
    age: 29,
};
// ### Partial 구현해보기
// - 전부 다 optional이 되면 아무것도 안넣은 경우도 처리가 되기 때문에 원치 않는 결과를 초래할 수도 있다.
// - 잘 안쓰지만 Partial 구현시 사용된 방법은 꼭 알아놓자!
// - Partial 대신에 pick과 omit을 주로 사용한다.
type P<T> = {
    [Key in keyof T]?: T[Key];
};

const myZerocho: P<Profile> = {
    name: "myzerocho",
    age: 29,
};
// ## Pick <>
// - <> 안에 들어오는 타입의 속성 중 원하는 속성만 pick해서 그 속성을 가지고 있는 타입을 선언할 수 있게 해주는 유틸리티 타입
const newZerocho2: Pick<Profile, "name" | "age"> = {
    name: "zerocho",
    age: 29,
};
// ### Pick 구현하기
// - 타입 구현시 제한 조건이 있다면 먼저 써주고 필요한 구현을 구현하자!
type MyPick<T, S extends keyof T> = {
    [Key in S]: T[Key];
};

// ## Omit <>
// - <> 안에 들어오는 타입의 속성 중 원하는 않는 속성만 omit(제외)해서 그 속성외의 속성들을 가지고 있는 타입을 선언할 수 있게 해주는 유틸리티 타입
// - 특정 속성을 제외시키고 싶을 때 사용
const newZerocho3: Omit<Profile, "married"> = {
    name: "zerocho",
    age: 29,
};
// ### Omit 구현하기
// - 난이도 최상***
// - Pick<>과 Excludes 유틸리티 타입을 섞어서 사용한 유틸리티 타입
// - K extends keyof any : K가 아무값이나 되면 안되니까 key 값들만 이 자리에 올수 있다는 제한을 둔 것!
//   -> 이렇게 설정해두면 string | number | symbol만 들어갈 수 있다.
type MyOmit<T, K extends keyof any> = Pick<T, Exclude<keyof T, K>>;
const newZerocho4: MyOmit<Profile, "married"> = {
    name: "zerocho",
    age: 29,
};

// ※ Exclude & Extract
// - 둘다 key에 적용되는 유틸리티 함수
// Exclude
// - 제네릭 T 에서 제네릭 U 타입을 빼는 것
// - T가 U의 부분 집합이면 버리고 아니면 T를 반환해라!
// - 타입에서 제네릭간에 extends라면 삼항연산자를 쓸 수 있다.
// - type Exclude<T,U> = T extends U ? never : T;
// Extract
// - T가 U의 부분집합이면 T를 반환하고 아니면 버려라!
// - type Extract<T, U> = T extends U ? T : never;
type Animal = "cat" | "Dog" | "Human";
type Mammal = Exclude<Animal, "Human">;
type Mammal2 = Extract<Animal, "Cat" | "Dog">;

// ?? extends만 쓰는데 타입을 한개 한개씩 비교가 가능한가??
// -> type Mammal = Exclude<Animal, 'Human'>; 의 경우 Animal의 타입 한개한개가 Human의 부분집한인지 비교되기 때문에 이런 궁금증이 생김.

// ## Required<>
// - optional한 속성들을 모두 필수 구현으로 바꾸고 싶을 때 사용
interface Profile2 {
    name?: string;
    age?: number;
    married?: boolean;
}
type Name = Profile2["name"];
const zerocho5: Required<Profile2> = {
    name: "zerocho",
    // age: 29,
    married: false,
};

// ### Required 구현하기
type MyRequired<T> = {
    [Key in keyof T]-?: T[Key];
};
// ※ -?
// - modifier라고 부른다.
// - '?'는 optional이란 의미고 거기 앞에 '-'륿 붙이면 optional을 모두 제거하라는 의미이다.

// ## Readonly<>
// - 값을 수정하지 못하고 읽기만 가능하게 할 때
const zerocho6: Readonly<Profile> = {
    name: "zerocho",
    age: 29,
    married: false,
};
zerocho6.name = "nero"; // 여기서 에러가 나게된다.
// ### Readonly 구현하기
type MyReadonly<T> = {
    readonly [Key in keyof T]: T[Key];
};
// ※ readonly 키워드
// - 속성을 수정하지 못하고 읽기만 가능하게 해주는 속성
// - 이 키워드도 '-'를 붙여서 타입을 설정하면 다른 사람이 설정해놓은 readonly 속성을 제거하여 가져올 수 있다.

// ## Record<>
// - Record 유틸리티 타입을 이용하면 특정 타입에 대한 형식을 지정할 수 있다.
// - Record<string:number> === [key: string]: number
interface Obj {
    [key: string]: number;
}
const a: Record<string, number> = { a: 3, b: 5, c: 7 };
// ### Record 만들기
type MyRecord<T extends keyof any, S> = {
    [key in T]: S;
};

// ## NonNullable<A>
// - 속성 내에 null, undefined 값이 있는 것이 거슬릴 때 NonNullable 유틸리티 속성을 이용하면 이들을 제거할 수 있다.
// - key에 적용되는 유틸리티 함수
// interface case
// - 이 경우에는 NonNullable해도 제거할 수 없다.
interface Example1 {
    a: null;
    b: undefined;
    c: string;
    d: number;
}
const case1: NonNullable<Example1> = {
    a: null,
    b: undefined,
    c: "123",
    d: 456,
};
// type case
// - 이렇게 사용하면 '|'로 엮인 타입중 null, undefined가 제거된다.
type Example2 = null | undefined | string | number | boolean;
type case2 = NonNullable<Example2>;

// ### NonNullable 구현하기
type myNonNullable<T> = T extends null | undefined ? T : never;

// ## Parameters<>
// - 함수 타입의 매개변수를 받아올 수 있는 유틸리티 함수
function zip(
    x: number,
    y: string,
    z: boolean
): {
    x: number;
    y: string;
    z: boolean;
} {
    return { x, y, z };
}
// 파라미터의 타입들을 튜플 형식으로 받을 수 있다.
type Params = Parameters<typeof zip>;
type First = Params[0];
// ### Parameters 만들기
// - MyParameters<T extends (...args: any) => any>
//   -> T는 무조건 함수여야한다는 조건
// - T extends (...args: infer A) => any ? A : never;
//   -> 매개변수 값을 추론해서 추론 값이 있으면 그대로 쓰고 없으면 쓰지마라는 뜻!
type MyParameters<T extends (...args: any) => any> = T extends (
    ...args: infer A
) => any
    ? A
    : never;

// ※ infer
// - inferences : 추론하다.
// - ts가 알아서 타입을 추론하도록하게 하는 것
// - infer를 사용할 때는 infer 넣는 구문이랑 제한사항 구문이랑 꼴이 똑같아야한다.
// - 모양이 똑같은 상태에서 특정부분만 추론해낼 수 있는 것
//   -> 제한사항 구문 : T extends (...args: any) => any
//   -> infer 넣는 구문 : T extends (...args: infer A) => any

// ## ReturnType<>
// - Parameters와 유사하게 return 타입의 타입을 튜플 형식으로 반환한다.
// ### ReturnType 구현하기
// - Parameters에서 infer의 위치를 변경해주면 된다.
type MyReturnType<T extends (...args: any) => any> = T extends (
    ...args: any
) => infer A
    ? A
    : never;

// ## ConstructorParameters<> & InstanceType<>
// ConstructorParameters<>
//   - 생성자를 대상으로 생성자 함수를 통해 받아오는 매개변수 타입들을 튜플로 반환하는 것
// - InstanceType<>
//   - 생성된 객체의 타입을 받아오는 타입
class A {
    a: string;
    b: number;
    c: boolean;

    constructor(a: string, b: number, c: boolean) {
        this.a = a;
        this.b = b;
        this.c = c;
    }
}

const instanceA = new A("123", 456, true);
type C = ConstructorParameters<typeof A>; //typeof 클래스가 === 생성자의 type
type I = InstanceType<typeof A>;
const instanceA2: A = new A("123", 456, true); // 클래스 이름 === 인스턴스(new)의 타입

// ### ConstructorParameters & InstanceType 구현하기
type MyConstructorParameters<T extends abstract new (...args: any) => any> =
    T extends abstract new (...args: infer P) => any ? P : never;

type MyInstanceType<T extends abstract new (...args: any) => any> =
    T extends abstract new (...args: any) => infer R ? R : never;

// ※ intrinsic & { }
// - 위에서 본 것 말도고 Uppercase, Lowercase등의 유틸리티 타입들도 존재한다.
// - 이 유틸리티 타입들은 직접 구현된 코드를 확인하기 어렵다.
// - 이처럼 내부적으로 구현된 코드에 있어서 intrinsic 키워드가 붙거나 { }가 붙는다.
// - 이런 경우 타입으로는 구현이 어려워 코드로 구현된 경우이다.

// 추가로 공부해야할 것
// is 키워드???
// extends 키워드???
// mapped type & index signature 공부하기
