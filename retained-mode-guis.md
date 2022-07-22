# Why retained mode GUIs are bad
## What is a retained mode GUI
A retained mode GUI is any UI system that refreshes when a component's state changes. This is an example of how retained mode GUIs functions:
1. Program opens
1. GUI is rendered
1. Program waits for any input from the user
1. User hovers on a button
1. GUI system calls an event provided by the developer of the application
1. The event calls for the UI to get refreshed to render the new button colour when the mouse is hovering over it
1. Program waits for input
1. User presses the button
1. GUI system calls the button pressed event
1. GUI refreshes again to play the push->pop animation of the button
1. Program waits for input

As you can see here the system needs an event for every little action taken by the user, the UI library manages a lot of internal state regarding animations, the UI scaffold, styling, element alignment and much more.

Additionally the library depends on using configuration files for its UI scaffold and sometimes its styling. Here is an example in web development:
1. The browser fetches the HTML, CSS and Javascript
1. The browser parses the HTML, making a list of all references to classes, IDs, scripts, semantic components and more
1. After a parse, a basic scaffold is constructed with default alignment and colours
1. The browser parses the most of the time overly-complicated CSS file, tries its best at aligning the components, then gives them styling and assigns it to their respective tags, IDs and classes
1. The information is rendered to the tab's canvas and depending on where the Javascript code was called, it is called either before the entire render process or in exactly this point in time
1. The Javascript code then tracks events that the browser dispatches, modifies the UI on a couple of occasions, the whole UI gets completely rerendered and this continues until the user closes the tab

## So why are they bad exactly
Well the whole story begins with how complicated they are as I previously mentioned. On the UI library's side, it needs to use a large state management system, to track state changes, dispatch them to their specific events, then update the state of both its internals and the UI gradually

When there is a lot of state management happening, humans make large and breaking mistakes, leading to serious consequences for the applications using the given UI library. Or as [this twitter user said](https://twitter.com/rygorous/status/1507178315886444544) - "Give someone state and they'll have a bug one day, but teach them how to represent state in two separate locations that have to be kept in sync and they'll have bugs for a lifetime."(Yes I'm so clever for referencing the quote on the Dear ImGui github repo)

So if you're not using a language like Rust, you're always going to have bugs, segmentation faults and a lot more ugly stuff to deal with

## So what's the replacement
Here I introduce to you the lord and saviour, IMGUI(Immediate Mode GUI) with immediate mode GUIs we eliminate the following things:
1. State management on the UI library's end is decreased only checking if the given events happend, then informing the user that they happended(usually implementing by returning a boolean)
1. UI is rerendered every frame, eliminating half of the responsibilities that retained mode GUIs have
1. Code, UI and Styling can all be written in the same place, inside the program's source code, removing the dangers and problems with parsing complicated scaffolds and style files
1. Changing the entire application's UI can take only a single if statement

So what are the benefits? Well here is how an IMGUI application works under the hood:
1. Application starts
1. UI is initialised with initial style values, the UI library's internal variables are initialized and ready to start rendering
1. The program loop starts and the UI starts rendering, using the imperative commands given by the programmer in the code
1. The framebuffer is cleared to a blank state
1. The UI is rerendered once again

So what are the pros and cons really? Well these are the main ones I can pick out:
```diff
+ Close to 0 state management on the part of the UI library
+ All parts of the UI process(code, scaffold and style) are handled in the application's code
+ Easy UI changes and less bugs overall
+ Not as much learning is required to be proficient in it
- Bad performance in certain situations
- Doesn't have the level of abstraction that most Retained mode GUIs have
- Libraries are usually less popular and less supported than retained ones
- The most famous retained mode libraries are usually made for their respective desktop environment, which means that the programmer needs to create uniform styling for each desktop it runs on
```
## IMGUI implementations
There are many small IMGUI implementations but the most popular one is [dear imgui](https://github.com/ocornut/imgui), which I mostly use in my projects.

## Addressing some of the cons of IMGUI
As an unfortunate reality IMGUI isn't perfect, so here are some parts of IMGUI that are actively improved on:

---

If we look at the performance aspect, we can fix a large part of the problem by making some assumptions about our system. First the UI should not be rendered on the CPU, but rather on the GPU.
Because GPUs are made for rendering frames upon frames of information, the workload on the CPU is significantly reduced.

To reduce power consumption and GPU load, framerates can be locked to 60 or even 30 FPS, depending on the platform.

As a minus this requires a GPU which a large portions of embedded systems running GUI applications don't have

---

The level of abstraction argument can be argued on, some people prefer using highly abstracted APIs for their UI, while some(like me) prefer the imperative approach

What isn't a subjective problem however, is good abstracted framework implementations. Unfortunately there is currently only 1 large framework that uses IMGUI, and it's currently in its beginning stages of development, that being [The Cherno's Walnut](https://github.com/TheCherno/Walnut). Other than that I can do a shameless plug right here for my own framework, [The UntitledImGuiFramework](https://github.com/MadLadSquad/UntitledImGuiFramework) :D

---

The last point about no Desktop Environment adoption is something that I'm tackling with my framework(Ah yes the shameless plug again)
## The end
And that's it folks, if you want to have a debate or you want to contribute something create an issue and I will take a look at it :D

Also here is a bunch of code that I wrote in dear imgui, if you're wondering what writing code in an IMGUI style looks like:
```cpp
void renderAboutUsUI(bool& bOpen, Texture& brandIcon)
{
    if (!ImGui::IsPopupOpen("About us"))
        ImGui::OpenPopup("About us");
    if (ImGui::BeginPopupModal("About us", &bOpen))
    {
        ImGui::TextWrapped("This application is developed and maintained by MadLad Squad");
        ImGui::TextWrapped("Info and help can be found here: ");
        ImGui::SameLine();
        constexpr char* text = (char*)"https://github.com/MadLadSquad/UntitledImGuiFramework";
        ImGui::InputText("##info", text, strlen(text), ImGuiInputTextFlags_ReadOnly);

        ImGui::Image((void*)(intptr_t)brandIcon.get(), { 50.0f, 50.0f });
        if (ImGui::IsItemHovered())
        {
            ImGui::BeginTooltip();
            ImGui::Text("MadLad Squad logo");
            ImGui::EndTooltip();
        }
        
        if (ImGui::Button("Close##Aboutus"))
            bOpen = false;
    }
}
```
This code is in C++ and this specific function is called every time with this code
```cpp
if (bAboutUsIsOpen)
    renderAboutUsUI(bAboutUsIsOpen, textures.brandIcon);
```
