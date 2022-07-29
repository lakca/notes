# 设计原则

## SRP 单一职责原则

> *Single Responsibility Principle*.

> 单元实现要目的清晰、简洁，以降低程序复杂性、提高程序可读性和维护性。

## ISP 接口隔离原则

> *Interface Segregation Principle*.

> 即最小开放原则。对外提供接口时，只提供其需要的接口，不要随意暴露其不需要的接口。

## LOD 迪米特法则

> *Law of Demeter*.

> 即高内聚、低耦合。不该知道的就不要知道，每个单元只应与其关系最密切的单元进行沟通。

## OCP 开放和关闭原则

> *Open Closed Principle*.

> 即对修改关闭、对扩展开放。避免不可预知的内部变化影响程序稳定性。

## LSP 里氏替换原则

> *Liskov Substitution Principle*.

> 即继承遵循协议原则。继承类对父类实现的覆盖应该至少涵盖父类对实现的约定，包括输入、输出、异常等。

## CRP 合成复用原则

> *Composite Reuse Principle*.

> 即组合优先于继承。降低代码耦合性。

## DIP 依赖倒置原则

> *Dependency Inversion Principle*.

> 即面向接口编程。通过面向接口而非面向实现进行设计，对实现进行隔离，利于程序横向扩展，是实现*开放和关闭原则*的重要手段。

# 创建型模式

## Singleton 单例模式

> 全局共用一个实例。减少了内存开销，避免对资源多重占用，但扩展困难。

## Prototype 原型模式

> 将一个对象作为原型，通过对其进行复制和引用产生新实例。

## FactoryMethod 工厂方法

> 通过方法创建不同类实例。封闭了实例的具体创建过程。

## AbstractFactory 抽象工厂

> 类似*工厂方法*，但会将同族类实现抽象类。如农场里有各种动植物，抽象工厂会至少提取动物和植物抽象类。

## Builder 建造者模式

> 将复杂对象分解成相对简单的部分，根据不同需要分别创建它们，以构成该对象。封装性好、扩展性强，但维护成本会增加。

# 结构型模式

## Proxy 代理模式

> 通过代理简介访问对象，以实现限制、修改或扩展对象特性。

## Adaptor 适配器模式

> 将类接口转换成调用者期望的形式以实现兼容性。

## Bridge 桥接模式

> 将抽象与实现分离，利用组合关系（实现多个接口）代替继承，从而实现拥有多维度维度特性的对象。

## Decorator 装饰器模式

> 动态地给对象增加职责。

## Facade 门面模式

> 为多个复杂的子系统提供统一的对外接口，简化外部访问。

## Flyweight 享元模式

> 通过共享技术实现大量细粒度对象的复用。

## Composite 组合模式

> 也叫*Part-Whole 整体-部分模式*，