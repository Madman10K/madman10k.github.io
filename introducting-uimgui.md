With this blog post, I want to introduce you to one of the biggest projects I have ever developed single-handedly - the [UntitledImGuiFramework](https://github.com/MadLadSquad/UntitledImGuiFramework).

You're reading this on my own personal web page, because this project means a lot to me and I wanted to share the project, its features, its history and my own personal story developing
this project, through a personal lense. 

## How I got here
### The long story before 2022
So it was 2020. I was still 14 and was just going through my first year of Highschool. As noted on the langing page of my website, which is a mix of resume and my autobiography, I started
programming in 2018 and was only really working on games using Unreal Engine 4.

2020 was a turining point for me, because then I started work on a project known as the [UntitledVulkanGameEngine](https://github.com/MadLadSquad/UntitledVulkanGameEngineOld).

There is actually a funny story behind this. One day after online class, I was talking with a bunch of friends, including an online friend known as Tobstera(the Bulgarian programmers reading
this page may recognise this legendary icon of the Bulgarian programming community 🤣). Anyway, me and him have been chatting online for about 2 years at that point and we were
having a bunch of friendly banter as teenage guys do. At some point the conversation turned to Vulkan and how hard developing a renderer using it is. I don't remember much of the 
conversation, but I do remember that I said that I was going to remake another friend's engine in Vulkan some day. Tobstera's response was "You can't do this in a million years!", to
which I replied "Nah try me.". And that's how I actually getting into doing anything that is not related to game development 😅

This game engine is notable, because by developing it I actually learned most of the C++ language and standard library. At this point I wouldn't say I was against using any third-party
libraries, but I didn't know of any for a lot of things I wanted to do. Therefore I just developed every engine component and utility from scratch. Another thing I did is I tried to
implement and adopt a large portion of the Unreal Engine 4 programming style and project structure.

This lead to many interesting side effects in the design of many systems and APIs. The biggest one was the introduction of the 
[UVKBuildTool](https://github.com/MadLadSquad/UVKBuildTool), a tool for automatically generating needed project files for your game. This tool was based on a concept in UE4 where
the engine would automatiacally generate C++ files for you to start developing different game classes, or for generating C++ code from blueprint files. This made it really convenient
to share projects between other people and even versions of the engine, due to it getting rid of the need to rely on bundling the game engine or its build system with your project.

This, coupled with standard directories for certain types of files made it really easy to create a project and just add your code to an event without thinking about how you're building,
creating the render loop and adding your different engine components manually. Infact, as in UE4, the file generator also made sure to take care of automatically adding certain classes
to the engine's systems automatically. So you didn't even need to worry about adding your pawn or level classes to an array. You just had to ask the build tool to create the class for
you, rebuild, run and the given component should had been added to the engine's systems automatically.

It looks and feels like magic. Though many would say it's dark magic, and that nobody should do stuff like this, its ergonomics cannot be denied. Also, as previously said, there are
many obvious benefits:

1. You don't have to bundle the engine code with your project when collaborating with others
1. Users with different versions of the engine are able to use your project, as long as your code is compatible with them
1. There is no other way to have points 1 and 2, and also having different projects, placed in different directories, with a unified project manager GUI that one can use to choose which project to work on in the GUI editor
1. Simplifies development and makes it more accessible to newcomers, especially those coming from game development where the skill difference between engine and gameplay programmers can be quite big

This same approach to classes is also present in the modern versions of the UVKBuildTool, used by the UntitledImGuiFraemwork, though to a lesser extent.

There is also code from 2020 still in the framework, specifically from the [UntitledLog](https://github.com/MadLadSquad/UntitledLog) library and parts of the UVKBuildTool, the `Global`
class, the API of the UI components and the general file and folder structure of a project.

Finally, a big part of my journey during the development of my own custom game engine is that early on I realised that the tooling in a game engine is miles more important than the
renderer ever will. I also realised that math was not really my thing, so maybe rendering should be left to those who are better at it, and I should just deal with the tooling. 
Thes is why the UntitledVulkanGameEngine didn't have, and still does not have even a basic renderer that can render more than 1 shaders in a frame 😅. So for 2 years I spent
90% of my development time on developing the GUI editor, the build tool and build system, and other systems like the translation engine or the window interface.

Specifically, a lot of the time in the last year of development was spent exclusivelly working on the GUI editor, which gave me a lot of experience with the dear imgui library, which I
picked up only because the famous YouTuber [the Cherno](https://www.youtube.com/@TheCherno) made a video about it.

In the mean time, in 2021 I installed [Funtoo Linux](https://www.funtoo.org), which was a Gentoo-based Linux distribution with many improvements over Gentoo, that a friend
basically memed me into installing. I decided to stay with it all the way until its death in 2024. I'll elaborate further on my contributon to this operating system in later parts
of this page. All I have to say about using it at this point was that using this distribution(which was my first linux install btw) taught me about cross-platform development and
inspired me to look deeper at the components that made up the desktop and the operating system.

### Spring 2022
