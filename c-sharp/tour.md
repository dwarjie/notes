# C# Tour
C# is the most popular programming language for the .NET Platform (other languages are F#, VB .NET). that can be used to build applications cross platform.

It incorporates Object Oriented Principles with other paradigms, not least functional programming.

C# is in the C family of languages and has similar syntaxes with C,C++, JavaScript, TypeScript, or Java.

Here is a sample code for logging "Hello World"
```csharp
using System;
namespace TourOfCsharp;

class Program
{
    static void Main()
    {
        // This line prints "Hello, World" 
        Console.WriteLine("Hello, World");
    }
}
```
The ```WriteLine()``` from the ```Console``` class is provided by the ```System``` namespace (as shown above). This class is provided by the standard class which are automatically referenced in every C# Programs. But, sometimes other program requires you to declare the class and method for the program entry point (like importing in JavaScript).

## Code Explanation
The code above starts with the ```using``` directive that references the ```System``` namespace (if you want to learn more about namespaces, please check [[namespaces]]). But, basically namespaces organizes the C# program (specially big projects). The ```System``` namespace is a collection of types, classes, and methods that can by used in your own program. Once example is the ```Console``` class with the ```WriteLine``` method.

Now, we have declared a new class called ```Program``` which has a single member, the ```Main``` static method. By convention, when there are no top-level statements a static method named ```Main``` serves as the entry point of the C# Program. The class containing the ```Main``` method usually named ```Program```.
