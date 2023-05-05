Developing multilingual software is... painful. (Highly opinionated)

This journey of mine into internationalisation (from now shortened to i18n), has been really insightful. 
Such a vital part of software development is often ignored by most developers, even though, with the globalisation of the 
economy in the past 2-3 decades, it has become more important than even.

## Backstory
But first, some backstory: I am Bulgarian, and the Bulgarian language is written using the Cyrillic alphabet. 
I also speak English, I'm learning German and as of June 2022, Mandarin Chinese. 
We will comment on each of the writing systems mentioned here later.

How it all started: In the end of June 2022 I decided to start learning Mandarin Chinese, 
mainly to challenge myself since programming doesn't get that much more challenging when you're like me, and you've already made 
extremely complex pieces of software such as a [Game Engine](https://github.com/MadLadSquad/UntitledVulkanGameEngine) 
or a [Desktop GUI Application framework](https://github.com/MadLadSquad/UntitledImGuiFramework). 

## Introduction to the keyboard
The computer keyboard is a device where you press keys, to produce an output. It can be a physical keyboard as seen on computers
and laptops, or a virtual keyboard, as seen on phones, tablets and other touchscreen devices

### Physical keyboards
Physical keyboards are the simplest. There are 2 types of keyboard:
1. Mechanical - When you press a key, 2 pieces of metal touch, which produces electrical flow, which tells the computer to input
the given key
2. Membrane - When you press a key, you hit a membrane which activates and tells the computer to input the given key

Most keyboards are designed around either the ANSI or ISO standards, which feature 104 and 105 keys respectivelly. When inputting
on a keyboard a piece of software known as a keyboard manager, although I like to refer to it as the basic input method, receives
the key codes sent by the keyboard, interprets them and sends a signal to an application or a group of applications with the
given event. Keyboard managers mainly deal with dispatching key events to applications and in most cases, it is applications
that decide what to input. 

Most languages are written in alphabets or [syllabaries](https://en.wikipedia.org/wiki/Syllabary), such as Latin, Cyrillic,
Arabic, Kana, etc. This means that keyboard managers have straightforward instructions on what character to input, given the
current keyboard layout.

This is somewhat complicated by [dead keys](https://en.wikipedia.org/wiki/Dead_key) and 
[modifiers](https://en.wikipedia.org/wiki/Modifier_key), but they're not that hard to implement.

### Virtual keyboards
Virtual keyboards are graphical representation of a physical keyboard in devices, where it is unfeasable to use a physical
keyboard. Smartphones, tablets and VR are examples of such devices.

Virtual keyboards are a little bit more complex than the normal physical keyboard, since the keyboard manager now has to work
a little bit like an IME(explained in later in the article) so that it opens when clicking on a text field. However, virtual
keyboards can be really flexible, as they can allow the user to write in many more languages with a single application, rather
than installing and managing keyboard layouts. It also allows for picking emoji and other uncommon symbols that would otherwise
need to be copied from somewhere or fully memorised by the user.

## The issues with the physical keyboard
While physical keyboards are great and mostly work as expected, there are some issues with the UX. 

First of all, languages have different layouts you can use. Though most English-speaking people use 
[QWERTY](https://en.wikipedia.org/wiki/QWERTY), alternative English layouts exist, and the same applies to languages like
Bulgarian with the BDS(Bulgarian Standard), Phonetic and Phonetic Traditional layouts.

These layouts, while good by themselves might not have the same deadkeys and modifiers, which will make you change keyboard layouts
frequently for certain characters. Additionally, multilingual users of layouts like QWERTY, might prefer so called "phonetic"
or "programmer layouts" in their mother tongue, but such might not exist.

Additionally, some keyboards(looking at you, stock Lenovo keyboards) might have a different configuration for the function keys,
where they are bound to other actions, like changing the system audio volume or display brightness, which requires you to hit
a combination of modifiers to get the actual function key press(really screws up hotkeys and makes playing most games hard)

Finally, your language might just not have a keyboard layout on your OS, which while rare is possible. Other issues like bad
drivers are possible, though mostly eliminated by standartization of keyboard protocol compatibility over USB.

## Introduction to IMEs
We have a problem. Your average keyboard has around 104 to 105 keys, 
but how do you write the 50K Chinese Characters? If you know anything about the Chinese languages, 
you would know that most don't use the full set of characters, so if you remove those that aren't used, you can 
significantly reduce the number. But that still leaves us with around 5K characters for Chinese, 
2K for Korean and 3-4K for Japanese.

To fix this issue, your computer uses an application known as an 
[Input Method Editor, IME](https://en.wikipedia.org/wiki/Input_method). When an IME is activated(in most cases by clicking 
on a text box in a GUI), the application records key presses and processes them to produce an output that can be way more
complex than what you'd expect from a "dumb" input method, which just translates keycodes specified by a keyboard layout 
to characters directly. Using IMEs allows users of languages with complex writing systems, like ones using the 
Chinese Characters, to input the full character set easily.

For languages like Chinese, there are 2 types of input methods(from now shortened to IM):
1. Builder type - Builds characters from components
1. Phonetic - Uses phonetic representations of the language to approximate a result

Phonetic systems like [Kana](https://en.wikipedia.org/wiki/Kana) input for Japanese, 
[Pinyin](https://en.wikipedia.org/wiki/Pinyin) and [Zhuyin](https://en.wikipedia.org/wiki/Bopomofo) for Mandarin and 
[Jyutping](https://en.wikipedia.org/wiki/Jyutping) for [Cantonese](https://en.wikipedia.org/wiki/Cantonese), 
are the most popular solution as of now. They work by using a phonetic representation of the language
i.e. pinyin and then converting it to characters, building a list of guesses and letting the user pick the correct phrase
from a popup window. This looks something like this:

<img src="https://rime.im/images/home-feature-4.svg" width="256" height="256"/>

Credit to [Rime](https://rime.im) for the image.

### Other uses for IMEs
But using IMEs just for inputting [CJK characters](https://en.wikipedia.org/wiki/CJK_characters) doesn't represent the full
power of an IME. IMEs can also be used for speeding up typing and providing autocorrect(used mostly as a feature on virtual
keyboards), to allow you to input emoji and other uncommon symbols, to allow you to easily bind code and applications to the
global input bus and more.

## Getting an IME
Now that you know what an IME is, you might want to use one. Well, let's consider your operating system first. If you're on
Windows, your only option is the Windows IMEs and applications that work with them. They are the following sorted by language:
1. Chinese
   - Microsoft Pinyin IME
   - Microsoft Zhuyin IME
   - Rime IME
1. Japanese
   - Microsoft Japanese IME
   - Google Japanese IME/Mozc

On Linux, you have a much wider selection. First, there are 2 major IMEs, 
[IBus](https://en.wikipedia.org/wiki/Intelligent_Input_Bus) and [FCITX5](https://en.wikipedia.org/wiki/Fcitx). Which both work
in a very similar way. They act as frameworks for IMs and actual IMs can be installed through plugins. Here are some sorted by
language:
- IBus
  1. Chinese
     - ibus-pinyin
     - ibus-libpinyin
     - ibus-libzhuyin
     - ibus-table, ibus-table-chinese, ibus-table-extraphrase, ibus-table-others
     - ibus-rime
     - ibus-handwrite
     - ibus-chewing
  1. Japanese
     - ibus-anthy
     - ibus-skk
     - ibus-kkc
     - ibus-mozc
  1. Vietnamese
     - ibus-unikey
     - ibus-bamboo
- FCITX
  1. Chinese(ibus has the same alternatives in FCITX so they won't be listed)
     - fcitx-pinyin
     - fcitx-table
     - fcitx-handwriting
  1. Japanese - Same as IBus
  1. Vietnamese
     - fcitx-unikey

Alright, now to download the IME and plugins for your prefered language.
