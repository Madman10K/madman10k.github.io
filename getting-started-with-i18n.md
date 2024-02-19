# Getting started with software internationalisation
Given that English is the most spoken language in the world, a lot of English-speaking programmers often overlook internationalisation, one of the most important aspects of
commercial software development.

This document will introduce you to the world of internationalisation(also known as "i18n") and show you how you can internationalise your applications. It will also get into other topics
such as typography, linguistics and more.

## What is internationalisation
Internationalisation, also known as i18n(because there are 18 characters between the "i" and "n") is the process of adapting a product for multiple markets.
Internationalisation can take the form of a number of product development operations, from creating local marketing campaigns, to translating packaging, developing systems for interactions with computers and so on.

The main goal of internationalisation is 

## Main components of a language


## Inputting languages with non-alphabetic writing systems
In this section, we will cover languages that have non-alphabetic writing systems and how users write these languages.

### Introduction to IMEs
An IME(Input Method Editor) is an application that intercepts keystrokes, processes them and gives a result to an application. This allows for a lot of flexibility when dealing with keyboard input:
1. Allows writing of languages with complex writing systems(like Japanese and Chinese)
1. Allows for faster input, when paired with an autocorrect and predictive word suggestions system
1. Allows for applications to be launched that can be used as an alternative form of input(a field to write characters by hand or voice input)

On a PC, languages with an alphabet that maps to the keyboard keys do not need an IME, they just need a system that maps a key stroke to a character. On mobile, most virtual keyboards are an IME,
since most have an autocorrect and predictive word suggestions system. Most also have voice input, and some even have handwriting recognition.

Most people do use an IME, at least on their phones, but usage on PC is basically non-existent, if you don't write in a language that requires an IME. This leads to developers, which ignore integrating
with different IME solutions, leading to user frustration.

### Chinese

### List of IME solutions


### Integrating your applilcation with existing IME solutions
If you use a popular GUI framework(GTK, QT, Platform-native widgets, etc) or one of the popular windowing libraries(GLFW or SDL), you will find that you already have IME support if you active your IME.

Some platforms, like GLFW, will activate an IME, but will not be fully integrated with it, which may lead to the IM window being on the edge, or outside of your application's window boundaries, instead of
over a text box. The IME can also be active while the window is 
