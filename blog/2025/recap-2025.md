# Celebrating 7 years of my developer journey, and the culmination of the last 5
I wanted to write about my story developing one of my biggest projects for the past 2.5 years. It just so happens that in January 2025 it's officially 7 years since I started programming back in January 2018.

In this blog post I will share my entire story, from day 1, until today, as well as introducing you to the culmination of the last 5 years of work and what this means for the future
of my software developer journey.

## How I got here
### 2018 - 2020 - The start of my software development journey as a game developer
So I was born in 2005, which means that in January 2018 I had just turned 12 years old. Crazy right? A month earlier my parents gifted me a new GPU, the NVIDIA GeForce GT 1030 to replace
my old GT 710.

This GPU now allowed me to play some modern AAA games at low settings with decent frame rate, so as any person would do, I started playing a number of them, with one of them being the
Witcher 3. After that I decided to also buy PUBG and then later install Fortnite during the golden age of the battle royale genre. Somehow, for whatever reason, I decided I wanted
to make my own game on a random saturday in January and so it began?

I don't really remember how it happened, all I knew was that mobile games used Unity, since many developers don't want to pay to remove the watermark. So I decided to try making a 2D RPG 
in Unity. However, C# was a bit too much at that point, so I decided to try out Unreal Engine 4 instead, after finding out that PUBG was made in it.

Then I worked on 3D games with Unreal. By using the blueprints system I finally started to understand how to make algorithms for what I wanted. I also passively learned the
OOP paradigm, because Unreal uses a special kind of object-oriented approach to writing game code.

In 2019 I got a new PC with top of the line hardware that I still use to this day. Ryzen 9 3900x, 32gb RAM and an NVIDIA GeForce RTX 2070 SUPER. This better computer made it easier
for me to work on projects in Unreal Engine and so I continued working on games in it until I stopped in late 2020.

### 2020 - 2022 - Giving up on game development, starting my biggest project yet, learning programming and Linux
So in September 2019 I decided to start work on a boomer shooter-inspired physics-based multiplayer FPS game. Imagine something like a mix of counter strike, quake and half
life with a number of intentional movement bugs, such as simplified bunny hopping and floating in the air by standing on top of objects with the gravity gun. Due to technical
limitations and lack of interest, I decided to abandon the project in September 2020. After that, I started a short-term project with a friend that was to be a 2D platformer fast-paced
battle royale shooter. Unfortunately, we didn't finish it, but we might have plans to bring it back soon 👀.

This was one of the turning points in 2020 that heavily influenced the software developer journey, since after that point I completely stopped doing game development.

A few months before that in May, I started work on a project known as the [UntitledVulkanGameEngine](https://github.com/MadLadSquad/UntitledVulkanGameEngineOld). This was a game engine
that was going to be used by the 2 projects I talked about previously. However, at some point the crazy amount of features that were needed to develop these games made it so I never really 
started work on any of them, since there was always a couple of features that would be needed before we could start work on these games. And so I never returned to game dev ever again.

There is actually a funny story behind me starting work on the game engine. One day after online class in April 2020, I was talking with a bunch of friends, including an 
online friend known as Tobstera(the Bulgarian programmers reading this page may recognise this legendary icon of the Bulgarian programming community 🤣). Anyway, me and him have 
been chatting online for about 2 years at that point and we were having a bunch of friendly banter as teenage guys do. At some point the conversation turned to Vulkan and how 
hard developing a renderer using it is. I don't remember much of the conversation, but I do remember that I said that I was going to remake another friend's engine in Vulkan some 
day. Tobstera's response was "You can't do this in a million years!", to which I replied "Nah try me.". And that's how I actually got into game engine development 😅.

This game engine is notable, because by developing it I actually learned most of the C++ language and standard library. At this point I wouldn't say I was against using any third-party
libraries, but I didn't know of any for a lot of things I wanted to do. Therefore I just developed every engine component and utility from scratch. Another thing I did was trying to
implement and adopt a large portion of the Unreal Engine 4 programming style and project structure into my code's architecture.

This lead to many interesting side effects in the design of many systems and APIs. The biggest one was the introduction of the 
[UVKBuildTool](https://github.com/MadLadSquad/UVKBuildTool), a tool for automatically generating needed project files for your game. This tool was based on a concept in UE4 where
the engine would automatiacally generate C++ files for you to start developing different game classes, or for generating C++ code from blueprint files. This made it really convenient
to share projects between other people and even versions of the engine, due to it getting rid of the need to rely on bundling the game engine or its build system with your project.

This, coupled with standard directories for certain types of files, made it really easy to create a project and just add your code to an event without thinking about how you're 
building, creating the render loop and adding your different engine components manually. Infact, as in UE4, the file generator also made sure to take care of automatically 
adding certain classes to the engine's systems automatically. So you didn't even need to worry about adding your pawn or level classes to an array. You just had to ask the 
build tool to create the class for you, rebuild, run and the given component was automatically getting added the engine's systems.

It looks and feels like magic. Though many would say it's dark magic, and that nobody should do stuff like this, its ergonomics cannot be denied. Also, as previously said, there are
many obvious benefits:

1. You don't have to bundle the engine code with your project when collaborating with others
1. Users with different versions of the engine are able to use your project, as long as your code is compatible with them
1. There is no other way to have points 1 and 2, and also having different projects, placed in different directories, with a unified project manager GUI that one can use to choose which project to work on in the GUI editor
1. Simplifies development and makes it more accessible to newcomers, especially those coming from game development where the skill difference between engine and gameplay programmers can be quite big

This same approach to classes is also present in the modern versions of the [UVKBuildTool](https://github.com/MadLadSquad/UVKBuildTool), used by the 
[UntitledImGuiFramework](https://github.com/MadLadSquad/UntitledImGuiFramework), though to a lesser extent.

There is also code from 2020 still in the framework, specifically from the [UntitledLog](https://github.com/MadLadSquad/UntitledLog) library, parts of the UVKBuildTool, the `Global`
class, the API of the UI components and the general file and folder structure of a project.

Finally, a big part of my journey during the development of my own custom game engine is that early on I realised that the tooling in a game engine is way more important than the
renderer ever will. I also realised that math was not really my thing, so maybe rendering should be left to those who are better at it, and I should just deal with the tooling. 
This is why the UntitledVulkanGameEngine didn't have, and still does not have even a basic renderer that can render more than 1 shader per frame 😅. Yes, for about 2 years I exclusively spent
90% of my development time on developing the GUI editor, the build tool and build system, and other systems like the translation engine or the window interface.

During the last year of development, most of my time was spent exclusivelly working on the GUI editor, which gave me a lot of experience with the dear imgui library. Funnily enough, I only
picked it up only because the famous YouTuber [the Cherno](https://www.youtube.com/@TheCherno) made a video about it.

In 2021 I also decided to install [Funtoo Linux](https://www.funtoo.org), which was a Gentoo-based Linux distribution with many improvements over Gentoo, that a friend
basically memed me into installing. I decided to stay with it all the way until its death in 2024. I'll elaborate further on my contributon to this operating system in later parts
of this page. All I have to say about using it at this point was that using this distribution(which was my first linux install btw) taught me about cross-platform development and
inspired me to look deeper at the components that made up the desktop and the operating system.

### Spring 2022 - Changing goals
2020 was quite the eventful year. In 2022 I had my national highschool exams for the first half of my highschool education and you know what I did instead of studying for them? That's
right I was working on the game engine. I had actually just gotten the Vulkan renderer to work with an arbitrary number of shader parameters at that point. Unfortunately, I actually
stopped developing the engine due to said exams.

At some point in Spring I also talked to another friend of mine, who was also into Linux. We were talking about starting a desktop environment as a joke.... And you know what jokes mean?
That's right! I actually decided to start working on it. I still wanted to finish the game engine at that point, but I was less and less motivated.

### June 2022 - January 2023 - My journey into developing for the Linux desktop, Chinese and software internationalisation
A number of things happened in June, mainly I passed the exams. I also decided to pick up Chinese for some reason which I am still studying until this day. At around the same time I
started learning Chinese, I also decided to finally start work on the [UntitledImGuiFramework](https://github.com/MadLadSquad/UntitledImGuiFramework) and I actually got version 0.1
to work within 2 days by copying all UntitledVulkanGameEngine code and removing all the logic related to game development, replacing the templates for game classes, refactoring some systems and more.

I then decided to start work on the [UntitledDesktopEnvironment](https://madladsquad.com/desktop) project that was supposed to build an entire desktop environment for Linux using this new framework.

A few days after version 0.1 of the Framework, I wanted to install applications for writing in Chinese on my Funtoo Linux machine, however at just this point in time, Funtoo was moving from a release-based
model where they made a snapshot of every year's Gentoo packages and added new versions on top of that, to a rolling release model. As part of this, most Gentoo packages we had were
removed and only those that were actually used by people were kept and autogenned.

This also meant that all the CJK IMEs were removed and therefore there was no way for me to actually write in Chinese on my Funtoo Linux machine. After some time, I decided to
create an issue for adding them back in. And this is how I started the CJK project in Funtoo Linux(under the leadership of adbosco). 
[Link to the project](https://www.funtoo.org/Funtoo:Multilingual), or image below if the link does not work:

<img width="1279" alt="image" src="https://github.com/user-attachments/assets/dee22961-ef4d-4330-b697-dec8f9873939" />

I learned a lot from this experience, mainly:

1. How desktop applications are packaged
1. Maintaining packages in a live Linux distribution
1. The Gentoo ebuild packaging format and the general ports-based packaging formats
1. How IMEs work under the hood in order to implement support for them in the framework
1. A lot about different libraries, algorithms and techniques that are used in the internationalisation process
1. Using Jira and working with more than a few people on a project

I also learned a lot of Chinese in 2022, which is a bonus as well 😄.

In the last months of 2022 I was working on mainly documenting the [UntitledDesktopEnvironment](https://madladsquad.com/desktop) and writing some features for the framework.

### January 2023 - March 2023 - Starting my own i18n projects
This time period was a large turning point, as I stopped working on parts of the [UntitledDesktopEnvironment](https://madladsquad.com/desktop), and focused on other applications. 
One of these applications was, [Youyin](https://youyin.madladsquad.com) - a website for learning how to write in different writing systems(at this time, only Chinese and Japanese). 
Youyin used a third-party library for writing the Chinese characters, so I wanted to learn how to add characters to it and I figured out a way to do it. I will return to this point later.

Using the same technology, but in reverse, I also made the [UntitledIBusHandwriting](https://github.com/MadLadSquad/UntitledIBusHandwriting) application which is a handwriting input
method for any language with characters in the Youyin database.

### Summer - Fall 2023 - making progress on the desktop environment
In this period in time I developed most of the current libraries that are part of the UntitledImGuiFramework, mainly:

1. [UntitledImGuiTheme](https://github.com/MadLadSquad/UntitledImGuiTheme) - a library to load and save imgui themes to a file in YAML format
1. [UntitledI18N](https://github.com/MadLadSquad/UntitledI18N) - a powerful library and yaml-based format for translating applications into multiple languages
1. A barely working version of [UntitledOpen](https://github.com/MadLadSquad/UntitledOpen) - a library that opens a URL using the default application or opens native file pickers
1. [UntitledCLIPaser](https://github.com/MadLadSquad/UntitledCLIPaser) - a parser for CLI arguments
1. [UntitledXDGBasedir](https://github.com/MadLadSquad/UntitledXDGBasedir) - an implementation of the XDG Base directory and XDG home directory specifications
1. [UntitledImGuiTextUtils](https://github.com/MadLadSquad/UntitledImGuiTextUtils) - a rich text rendering library for dear imgui
1. [UntitledTemplatingEngine](https://github.com/MadLadSquad/UntitledTemplatingEngine) - a custom templating engine that uses a lisp-like programming language
1. A barely working version of [UntitledDBusUtils](https://github.com/MadLadSquad/UntitledDBusUtils) - a C++ wrapper on top of the low level C D-Bus API that introduces type- and memory safety

As you can see, 2 of these libraries are considered to be barely working, though they were fixed later in 2024.

### Winter - Spring 2024 - slowdown around school
At this point I was in the second half of the 12th grade and I needed to start studying for my final exams, which I somehow aced. In September 2023 I also started a small instagram
page for bulgarian hip-hop, with which I learned a lot about marketing and business. I was mainly focused on this page for the entirety of Winter - Spring 2023. Some of the python
scripts I used when running this page are open source.

I also bought a domain for a link shortener I will be developing in the near future called [tiny.lol](https://tiny.lol).

I somehow also got into TU Sofia with 30/30 points due to straight As on the national advanced IT exam, regular math and advanced math.

I didn't do a lot during that time, though right after the exams I started working hard on finishing a lot of the currently unfinished or barely working projects.

### Summer 2024
In the Summer of 2024 I did a lot of work, but also enjoyed a break from school. I went on a couple of vacations, worked on the framework, as well as briefly working on an
application for the Flipper Zero. I also really got into skateboarding and spent half of August skateboarding outside instead of working
on [UntitledDBusUtils](https://github.com/MadLadSquad/UntitledDBusUtils), which is understandable 😅.

At this point I also decided to give up on the hip-hop Instagram page as it required too much of my free time for me to maintain.

In September, I also got a part-time job, working for a small independent Bulgarian software company that is currently developing a really cool project(I will edit the page
when I can talk about it more). My first semester in University also started in September

### Fall 2024 - February 2025 - a chapter ends and a new one begins
A large part of my work during this period was directly focused on getting the [UntitledImGuiFramework](https://github.com/MadLadSquad/UntitledImGuiFramework) ready for release 1.0.

This project is the first large-scale project that I have managed to get to 1.0 status, with its roots starting almost 5 years ago. I will try to advertise this project and probably
add a number of big changes after I really get some users to really use it in their production applications.

## What the future entails
Now to the fun part, trying to foresee the future. Here are my predictions/plans/goals for the next 2/3 years:

1. Start work on 1.X releases of the [UntitledImGuiFramework](https://github.com/MadLadSquad/UntitledImGuiFramework), adding support for Android, iOS and iPadOS
1. Probably release my first paid application
1. Releasing the 1.0 version of [tiny.lol](https://tiny.lol), which is going to be a link shortener service
1. Releasing the 1.0 version of [Youyin](https://youyin.madladsquad.com)
1. Releasing the 1.0 and possibly 2.0 version of [pkggen](https://pkggen.madladsquad.com)
1. Probably writing an ebook/creating an online course on software distribution, cross-platform desktop application development or software internationalisation
1. Maybe I will even start working on a game after all those years?

### UntitledImGuiFramework 2.0
The thing is, even though it took 2.5 years to get the 1.0 release off the ground, there is still a lot of places, where the framework lacks functionality due to its current design.

One of the main issues with the current version of the [UntitledImGuiFramework](https://github.com/MadLadSquad/UntitledImGuiFramework) is the lack of IME support. On desktop this is kind of
annoying, since people can still type in text boxes with their IME, but the IME window is located below the window instead of next to the text box in question. On mobile and web, however,
this is really infuriating, because as you might know, phones and tablets use IME for all their character input.

To fix this issue, a change of windowing library backend will be required, which is not something that we can do right now.

OS integration is another issue, where our Wayland support lacks core windowing functions, while integration with the OS global menu on macOS is non-existent. Support for Wayland will be easily
fixed with time, however the macOS global menu issue has to be resolved using an adapter that will require a breaking change for our components-based system, possibly requiring a great rework or
the removal of the titlebar component type.

### pkggen 1.0
The [pkggen](https://pkggen.madladsquad.com) utility is my newest project. It is a utility for automatically generating, testing and publishing desktop application packages from templates for multiple distributions.
It is greatly inspired by the [Funtoo Metatools project](https://www.funtoo.org/Funtoo:Metatools), however it is not distribution-specific and can be used by both application developers and distribution maintainers, due to its flexible architecture.

### Youyin 1.0
Releasing the 1.0 version of Youyin has been really tricky, due to the need to add more than 5K missing characters to the character database. The main bottleneck has been a lack for a tool to easily edit fonts. The good news is
that at [Heapforge](https://heapforge.com), we're currently working on creating a cross-platform font editing application specifically for those who need to edit large font files. This application will also have Youyin/hanzi-writer/make-me-a-hanzi
integration to allow users to generate their own characters too.

### Returning to game development
Funnily enough, long ago I bought a Steam publishing license, so I also develop a small game and publish it on Steam in the next couple of years. Maybe a revive of one of my past projects? Nobody really knows what, or if I will ever get back into game development again.
