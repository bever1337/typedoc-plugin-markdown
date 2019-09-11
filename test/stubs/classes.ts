/**
 * This is a simple interface.
 */
export interface INameInterface {
  /**
   * This is a interface member of INameInterface.
   *
   * It should be inherited by all subinterfaces.
   */
  name: string;

  /**
   * This is a interface function of INameInterface.
   *
   * It should be inherited by all subinterfaces.
   */
  getName(): string;
}

/**
 * This is a simple interface.
 */
export interface IPrintInterface {
  /**
   * This is a interface function of IPrintInterface
   *
   * It should be inherited by all subinterfaces.
   */
  print(value: string): void;
}

/**
 * This is a interface inheriting from two other interfaces.
 */
export interface IPrintNameInterface extends INameInterface, IPrintInterface {
  /**
   * This is a interface function of IPrintNameInterface
   */
  printName(): void;
}

/**
 * This is a simple base class.
 *
 * [[include:class-example.md]]
 */
export abstract class BaseClass implements INameInterface {
  /**
   * This is a simple public member.
   */
  public name: string;

  /**
   * This is a simple protected member.
   */
  protected kind: number;

  /**
   * This is a static member.
   *
   * Static members should not be inherited.
   */
  static instance: BaseClass;
  static instances: BaseClass[];

  public abstract abstractMethod(): void;

  /**
   * This is a simple member function.
   *
   * It should be inherited by all subclasses. This class has a static
   * member with the same name, both should be documented.
   *
   * @returns Return the name.
   */
  public getName(): string {
    return this.name;
  }

  /**
   * This is a simple static member function.
   *
   * Static functions should not be inherited. This class has a
   * member with the same name, both should be documented.
   *
   * @returns Return the name.
   */
  static getName(): string {
    return 'A name';
  }

  /**
   * This is a simple member function.
   *
   * It should be inherited by all subclasses.
   *
   * @param name The new name.
   */
  public setName(name: string) {
    this.name = name;
    this.checkName();
  }

  /**
   * This is a simple fat arrow function.
   *
   * @param param1 The first parameter needed by this function.
   * @param param2 The second parameter needed by this function.
   * @see https://github.com/sebastian-lenz/typedoc/issues/37
   */
  public arrowFunction = (param2: string, param1: number): void => {};

  /**
   * This is a private function.
   */
  private checkName() {
    return true;
  }

  /**
   * This is a static function.
   *
   * Static functions should not be inherited.
   *
   * @returns An instance of BaseClass.
   */
  static getInstance(): BaseClass {
    return BaseClass.instance;
  }
}

/**
 * This is a class that extends another class.
 *
 * This class has no own constructor, so its constructor should be inherited
 * from BaseClass.
 */
export class SubClassA extends BaseClass implements IPrintNameInterface {
  public name: string;

  /**
   * This is a simple interface function.
   */
  public print(value: string): void {}

  /**
   * @inheritdoc
   */
  public printName(): void {
    this.print(this.getName());
  }

  /**
   * Returns the name. See [[BaseClass.name]].
   *
   * @returns The return value.
   */
  public get nameProperty(): string {
    return this.name;
  }

  /**
   * Sets the name. See [[BaseClass.name]].
   *
   * @param value The new name.
   * @returns The return value.
   */
  public set nameProperty(value: string) {
    this.name = value;
  }

  /**
   * Returns the name. See [[BaseClass.name]].
   *
   * @returns The return value.
   */
  public get readOnlyNameProperty(): string {
    return this.name;
  }

  /**
   * Sets the name. See [[BaseClass.name]].
   *
   * @param value The new name.
   * @returns The return value.
   */
  public set writeOnlyNameProperty(value: string) {
    this.name = value;
  }

  public abstractMethod(): void {}
}

/**
 * This is a class that extends another class.
 *
 * The constructor of the original class should be overwritten.
 */
export class SubClassB extends BaseClass {
  public name: string;

  constructor(name: string) {
    super();
  }

  abstractMethod(): void {}

  doSomething(value: [string, SubClassA, SubClassB]) {}
}

/**
 * This is a generic class.
 *
 * @param T  This a type parameter.
 */
export class GenericClass<T extends BaseClass> {
  public value: T;

  /**
   * Constructor short text.
   *
   * @param p1 Constructor param
   * @param p2 Private string property
   * @param p3 Public number property
   * @param p4 Public implicit any property
   * @param p5 Readonly property
   */
  constructor(p1, protected p2: T, public p3: number, private p4: number, readonly p5: string) {}

  /**
   * @param value [[getValue]] is the counterpart.
   */
  public setValue(value: T) {
    this.value = value;
    console.log(this.p4);
  }

  public getValue(): T {
    return this.value;
  }
}

/**
 * This a non generic class derived from a [[GenericClass|generic class]].
 */
export class NonGenericClass extends GenericClass<SubClassB> {}
