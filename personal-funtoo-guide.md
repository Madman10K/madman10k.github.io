I have been a funtoo user for some 1 year now and I wanted to put this guide here in case I forget 90% of what I learned or 
I want to show someone a quickstart guide to funtoo development.

[Funtoo](https://funtoo.org/) is based on [Gentoo](https://gentoo.org/), meaning that it shares the same package manager and a lot of tools with it. 
Funtoo however provides its own tools which will be covered below
## Tools
### Portage
Portage, accessible by the `emerge` command is the package manager for Gentoo and Gentoo-based distributions. It uses a schema called ebuild, 
a modified type of shell script. Portage compiles everything from source, to provide improved performance and stability. 
Packages in portage are ebuild scripts that may contain additional metadata.

Given that Portage has all information it needs to install your application, it will do so in a very elegant way. Next, we need to get in to atoms, 
an atom is the name of the package that exists on the system, an atom has a category, a name, a version and its corresponding ebuild, 
in general think of atoms as the abstract definition of a package and of ebuilds as the low level concept.

Atoms are stored in sets, the most used ones are the `world` and `preserved-libs` sets. The `world` set is simply a list of all atoms that 
the user installed directly using the `emerge` command. So for example if the user ran:
```sh
emerge firefox
```
portage will find the `firefox` package and its category then put it in the `world` set in the following format:
```
...
www-client/firefox
...
```
nothing else is added, because portage scans the world set and automatically resolves the dependencies of the firefox package on update, 
therefore there is no need to list them here.

The `world` set is located at `/var/lib/portage/world`, you can easily cat it to view your packages. The other set is the `preserved-libs` set, 
during an update of packages, if a library is updated, the old version is kept for packages that have not been rebuild yet. 
If the update only affects the library and not the underlying package in the `world` set that depends on it, the application needs to be rebuild. 
The `preserved-libs` set keeps the old version of the library in use, and if this set gets `emerged`, 
the application is recompiled and the old version is cleaned up correctly.

Now to how portage optimises packages, it's simple, portage compiles using configuration in the `/etc/make.conf` file, that allows the user to set,
flags, optimization options and information, that applications can use at compile time. This allows for great possibilities and platform support,
which can be seen on how many CPU arhitecturs Gentoo runs on(it can even run on a PlayStation 3).

But compilation is half of the story, performance and disk space are also preserved due to the concept of `USE` flags. These are flags that every package
has that affect its compilation. They are called `USE` flags because they're mostly used to enable or disable features in applications, this way
you only pay for what you use in an application, instead of installing all components as most binary-based distros do. `USE` flags are stored under
`/etc/portage/package.use`, but you probably won't interact with the file directly as there are many `USE` flag managers available.

Okay so this is great and all, but there is a lot of complation. Yes there is hope you find something to do while your system compiles 😂. But for real,
it's really not as bad as it seems, while yes your first install may take from 2 to 48 hours, normal people generally don't install applications constantly
so the only compilation you will be doing on a day to day basis is the system update, and even this can be done at intervals, like once a week.
I don't have an argument for energy prises though 😬

Well that's akward, anyway here are the most useful and important options:
1. `--oneshot`/`-1` compiles and installs the package but doesn't add it to the world set, useful when updating single dependencies or temporarily
installting a package
1. `--keep-going` continues compilation if the package that failed to install isn't blocking the whole installation, particularly useful in system updates
1. `--newuse`/`-N` recompiles packages with modified use flags
1. `--ask`/`-a` asks if you confirm the installation
1. `--verbose`/`-v` verbose output
1. `--deep`/`-D` makes portage scan the entire dependency tree of the packages
1. `--update`/`-u` updates the package to the latest version
1. `--search`/`-s` search for a package
1. `--depclean`/`-c` cleans the unused atoms
1. `--deselect` removes a package from the world set, but doesn't delete it. To delete it run `--depclean`

and here is the all-mighty system update command in portage:
```sh
emerge -auvDN @world
```
notice, how the world set is marked with an `@` symbol, this is how you specify a set instead of an atom. The simplest form of this command is
```sh
emerge -uDN @world
```
this removes the verbose and ask modes from the command. After an `emerge @world`, always run `emerge --depclean` to clean up any dependencies that are
no longer in use. Make sure to also read the post-install messages and check if the `preserved-libs` set needs to be emerged. And on the topic of the
`preserved-libs` set, here is how you can emerge it
```sh
emerge @preserved-rebuild
```

We'll return to portage soon
### equery
The `equery` command is used to query portage. You can use it to inspect the dependency tree, sizes of packages, packs to an ebuild, its keywords and more.

Here are the most important options
1. `depends <package>` - shows all packages that depend on an atom
1. `depgraph <package>` - shows the depgraph of a package a.k.a. all its dependencies
1. `which <package>` - Shows the full path for the package's ebuild

### ego
The `ego` command is a command specific to Funtoo linux

Here are the options
1. `boot update` updates the bootloader
1. `doc <wiki page>` displays a wiki page in the terminal
1. `kit` displays all kits
1. `profile` calls `epro`, details below
1. `query` gives information about a package
1. `sync` syncs with the upstream tree

To give more info on `query`, query has the following options:
1. `versions`/`v`
1. `origin`/`o`
1. `bugs`

when you pass a package as the next argument you get information, for example:
```sh
$ ego query bugs firefox-bin

FL-7055 2020-03-27 Closed Firefox-bin autogen emerge failed                                  
FL-7042 2020-03-15 Closed integrate firefox-bin with autogen framework                       
FL-7038 2020-03-14 Closed tracker for cron job to auto-update firefox-bin from gentoo-current
FL-7037 2020-03-14 Closed old and vulnerable versions of firefox-bin                         
FL-6447 2019-06-18 Closed Firefox needs a version bump for critical fixes - CVE-2019-11707 
```
returns the following information
### epro
Another funtoo specific tool, epro toggles profiles. In funtoo, profiles are used for automatic configuration and installation of common setups.
Here is a list of the most important options:
1. `show` shows the current profile
1. `list` lists all available profiles
1. `arch`, `build`, `subarch` and `desktop` change their respective settings
1. (+/-)`mix-ins`/`mix-in` changes the given mix-in profiles

for example here is my system's `epro show`:
```sh
$ epro show

=== Enabled Profiles: ===

        arch: x86-64bit
       build: next
     subarch: amd64-zen2
      flavor: desktop
     mix-ins: gfxcard-nvidia
     mix-ins: xfce


=== Python kit: ===

      branch: next

=== All inherited flavor from desktop flavor: ===

                     workstation (from desktop flavor)
                            core (from workstation flavor)
                         minimal (from core flavor)

=== All inherited mix-ins from desktop flavor: ===

                               X (from workstation flavor)
                           audio (from workstation flavor)
                             dvd (from workstation flavor)
                           media (from workstation flavor)
      mediadevice-audio-consumer (from media mix-in)
                mediadevice-base (from mediadevice-audio-consumer mix-in)
      mediadevice-video-consumer (from media mix-in)
                mediadevice-base (from mediadevice-video-consumer mix-in)
        mediaformat-audio-common (from media mix-in)
          mediaformat-gfx-common (from media mix-in)
        mediaformat-video-common (from media mix-in)
                  console-extras (from workstation flavor)
                           print (from desktop flavor)

=== All inherited mix-ins from gfxcard-nvidia mix-ins: ===

      core-gl-kit:gfxcard-nvidia (from gfxcard-nvidia mix-in)
```
using profiles funtoo makes a more-standardized experience which makes the common user experience better than in Gentoo among other benefits.

In Funtoo, mix-in profiles are profiles that can be added or removed, so I can easily switch to `gnome` by changing the mix-in from `xfce` to `gnome`.
Same goes for graphics drivers. Not only can you enable or disable them, but you can also have multiple ones at one time, so if you're running an intel
and nvidia GPU, you can use both graphics drivers.

### etc-conf and dispatch-conf
The `etc-conf` and `dispatch-conf` utilities provide a safe method of changing config files by giving the user the ability to decide, to use the old config,
the new one, to merge them, or something else all together

Using them doesn't require options, just run them in the terminal with root
## More gentoo concepts and my personal recommendations
### Dealing with USE flags
I don't recommend you type in USE flags by yourself, instead use a manager like [flaggie](https://github.com/projg2/flaggie). With it you can easily
enable a flag like in this example:
```sh
# flaggie libsdl2 +ibus
```
or disable it with
```sh
# flaggie libsdl2 -ibus
```
you can also accept licenses
```sh
# flaggie adobe-flash +lic::
```
and more, please check flaggie's [github repo](https://github.com/projg2/flaggie) for more information
### Overlays
Now let's get into overlays, overlays are third party package repositories. If a package isn't available in the main repos, then you can subscribe to an
overlay to get it from someone in the community who made an ebuild for it. Most of the time you don't have to do that, but it's a really handy tool when
you do have to get a missing package.

Here I want to clarify that Funtoo linux is not an overlay, Funtoo uses a modified version of portage, has its own kit system and more. This means that
a gentoo user can't just get all the funtoo packages if he wants to because there is no way to do that. This is maybe one of the main ways funtoo diverges
with gentoo. This however, doesn't mean that funtoo users can't subscribe to overlays, you can perfectly do that.

So to subscribe to an overlay, I recommend using [layman](https://github.com/gentoo/layman), gentoo seems to have deprecated the tool in favour of an
eselect module, however funtoo users don't have that module installed, so most of the time you would want to use layman. 

However here is a big concideration you need to make, you mostly won't need to use it as a funtoo user. In most cases funtoo users don't need to 
use overlays because of the openness of the funtoo community. Funtoo has a unified [Jira board](https://code.funtoo.org) and 
[bitbucket](https://bugs.funtoo.org) git service that everybody can access and contribute packages to. This means that the purpose of an overlay is either
1. You want to test out your own packages before you contribute them
1. Your package is not accepted in the main funtoo repo

However, the chance of getting your package into funtoo is relatively high so do not feel discouraged to contribute or even to make a request for it on the
[Jira board](https://code.funtoo.org)
## Development guide
Now that you know all about the important parts of Funtoo you can start developing packages for it, after all this is why you're reading this guide.
But first some theory
### How Funtoo does package maintaining better than gentoo
Funtoo has a collection of development tools called `metatools`, these tools are made for development of `autogens`, which are python scripts or yaml files
that define variables for an ebuild. The system works by having an ebuild template, this template is like any other ebuild, except the user can include
[jinja](https://jinja.palletsprojects.com/en/3.1.x/) variables in it. Using these variables the python script or yaml file generates a brand new ebiuld
file, that can be used by the user.

What this means that Funtoo developers are not tasked with looking for version changes in a package to do chores such as copy/pasting an ebuild with a
new version, instead they focus on adding new packages, features and fixing bugs in already existing packages. You can already find out that this saves
a lot of development time and resources, which allows funtoo to sustain its open model.
### Getting started with development for funtoo
Before we begin please check out the [ebuild API reference in Gentoo](https://devmanual.gentoo.org/ebuild-writing/index.html), this will help you
understand how to make an ebuild. Generally keep in mind that Funtoo has diverged from portage at EAPI7, with that being the latest version for Funtoo,
while Gentoo has created EAPI8

Now that you know how to write an ebuild, let's get going with the prerequisites. First install `metatools` with:
```sh
$ emerge metatools
```
now time to go to <https://funtoo.org>, click on the `Log in` button
![image](https://user-images.githubusercontent.com/40400590/189500292-61fe68dd-5bc0-49ec-afaa-9d3ccd5fd146.png)
and create an account. Once your account is ready, log into <https://bugs.funtoo.org>. Once you're logged in you can access all parts of the bug tracker,
here funtoo organizes and adresses all bugs. For now we won't be submitting a bug report, instead this example will contain packages already contributed
and available in funtoo as the examples. Click on this button and select the `Bitbucket` option
![image](https://user-images.githubusercontent.com/40400590/189500402-0bc322d2-b34c-44b9-a439-a35842245233.png)
You will be greeted by this screen
![image](https://user-images.githubusercontent.com/40400590/189500438-9c8cdeeb-3d56-4fb6-8022-4c69c55c303d.png)
click on the repository section -> all repositories. The repositories in the section `Auto-Generated Kits` are as the name suggests autogenerated, we don't
touch them manually, instead we commit packages to repositories under `Core Repositories`. Here you can find the source code to tools like `ego`, but we're
here for packages. There is 1 main package repo, kit-fixups, there you can find most kits, other repos exist, mainly ones with the postfix of `-kit-sources`.
Those are specialised kits and most of them are for desktop environments

