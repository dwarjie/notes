# Namespaces
Namespaces helps developer to organize their codes and types. Even .NET uses namespace:

Here is an example of using a namespace without the ```using``` directive.
```csharp
System.Console.WriteLine("Hello");
```

With the ```using``` directive.
```csharp
using System;

//...
Console.WriteLine("Hello")
```
As you can see, with the ```using``` directive, the specification of the Namespace can be ommitted.

# Declaring your own Namespace
You can also declare your own Namespace to split a chunk of codes into different files specially for big projects.

```csharp
namespace SampleNamespace { // use the namespace keyword
  class SampleClass {
    public void SampleMethod() {
      System.Console.WriteLine("SampleMethod inside SampleNamespace");
    }
  }
}
```
Here is a much cleaner syntax
```csharp
namespace SampleNamespace;

class SampleClass {
  public void SampleMethod() {
    System.Console.WriteLine("SampleMethod inside SampleNamespace");
  }
}
```
