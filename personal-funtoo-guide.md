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
### How Funtoo does package maintaining better than Gentoo
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

Anyway, for this tutorial, we're going to use the normal method of forking `kit-fixups`. To do that click on the `kit-fixups` repo, and click `Create Fork`, and follow the instructions, after that just clone the forked repo on your sistem and let's begin with development
### Creating your first autogen
Let's begin with you first autogen. The most simple example is the package `ibus-m17n`, a package that provides a wide array of input methods to [ibus](https://github.com/ibus/ibus)

The package is located under `kit-fixups/desktop-kit/curated/app-i18n`. But if you already know how ebuilds are structured you may ask "Well where is the package? There is no folder for it?", here is the magic of autogen this package is generated by the `autogen.yaml` file, this file is global to the category and uses the `templates` folder to use for the different packages' ebuild templates. Let's take a look:
```yaml
ibus-tables:                                    # Context
  generator: github-1                           # Generator
  packages:                                     # Package list
    - ibus-m17n:                                # Package entry
        github:                                 # Information for the generator
          user: ibus                            # Github username
          repo: ibus-m17n                       # Github repository
          query: releases                       # Query github: releases or tags are the only options here
          tarball: "ibus-m17n-{version}.tar.gz" # The tarball name, version is automatically fetched from the tag name
...
```
This is the code in the `autogen.yaml` file that autogens ibus-m17n. Read the comments for annotation. As you can see funtoo has already implemented
github as a common generator, making generating a package easy.

Now that we have an autogen, we need an ebuild template, you can find the template for ibus-m17n under the templates folder, with the name of
`ibus-m17n.tmpl`, these are the contents of the file
```ebuild
# Distributed under the terms of the GNU General Public License v2

EAPI="7"

inherit gnome3-utils xdg

DESCRIPTION="M17N engine for IBus"
HOMEPAGE="https://github.com/ibus/ibus/wiki"
SRC_URI="{{ artifacts[0].src_uri }}"

LICENSE="GPL-2+"
SLOT="0"
KEYWORDS="*"
IUSE="gtk nls"

DEPEND="app-i18n/ibus
	dev-libs/m17n-lib
	gtk? ( x11-libs/gtk+:3 )
	nls? ( virtual/libintl )"
RDEPEND="${DEPEND}
	>=dev-db/m17n-db-1.7"
BDEPEND="sys-devel/gettext
	virtual/pkgconfig"

src_configure() {
	econf \
DESCRIPTION="M17N engine for IBus"
HOMEPAGE="https://github.com/ibus/ibus/wiki"
SRC_URI="{{ artifacts[0].src_uri }}"

LICENSE="GPL-2+"
SLOT="0"
KEYWORDS="*"
IUSE="gtk nls"

DEPEND="app-i18n/ibus
	dev-libs/m17n
		$(use_enable nls) \
		$(use_with gtk gtk 3.0)
}

pkg_preinst() {
	xdg_pkg_preinst
	gnome3_schemas_savelist
}

pkg_postinst() {
	xdg_pkg_postinst
	gnome3_schemas_update
}

pkg_postrm() {
	xdg_pkg_postrm
	gnome3_schemas_update
}
```
Notice how on line `9`, we use the syntax `{{ artifacts[0].src_uri }}` for the `SRC_URI` variable, this is a jinja declaration, more info on the different
variables passed to jinja later in the document. Just know that this syntax is the only thing you need to know for simple `yaml` autogens

### Python autogens
YAML autogens aren't the only way of doing things in Funtoo. If your package is very specific, you will need more powerful tools for autogenning packages.
Fortunately, metatools also allows you to write autogens in Python, not only that but Python autogens can be generators for yaml autogens(this part will
be explained later)

Here is an autogen for the `rtl8192eu` driver under `kit-fixups/core-hw-kit/curated/net-wireless`. The driver needs to fetch the latest commit from a
github repository, which is not currently possible but will soon be resolved by [this issue](https://bugs.funtoo.org/browse/FL-10360). This example is
still accurate though. Here is the code
```py
#!/usr/bin/env python3
from datetime import datetime, timedelta


async def query_github_api(user, repo, query):
	return await hub.pkgtools.fetch.get_page(
		f"https://api.github.com/repos/{user}/{repo}/{query}",
		is_json=True,
		refresh_interval=timedelta(days=15),
	)


async def is_valid(user, repo, commit):
	commit_sha = commit["sha"]
	commit_status = await query_github_api(user, repo, f"commits/{commit_sha}/status")

	return "failure" not in commit_status["state"]


async def generate(hub, **pkginfo):
	github_user = "Mange"
	github_repo = "rtl8192eu-linux-driver"

	commits = await query_github_api(github_user, github_repo, "commits?sha=realtek-4.4.x")

	valid_commits = (commit for commit in commits if await is_valid(github_user, github_repo, commit))

	target_commit = await valid_commits.__anext__()

	commit_date = datetime.strptime(target_commit["commit"]["committer"]["date"], "%Y-%m-%dT%H:%M:%SZ")
	commit_hash = target_commit["sha"]
	version = commit_date.strftime("%Y%m%d")
	url = f"https://github.com/{github_user}/{github_repo}/archive/{commit_hash}.tar.gz"
	final_name = f"{pkginfo['name']}-{version}.tar.gz"

	ebuild = hub.pkgtools.ebuild.BreezyBuild(
		**pkginfo,
		github_user=github_user,
		github_repo=github_repo,
		version=version,
		artifacts=[hub.pkgtools.ebuild.Artifact(url=url, final_name=final_name)],
	)
	ebuild.push()
```
The `generate(hub, **pkginfo)` function is the main function of your autogen. This python file has some special features, for example notice how in this
block:
```py 
async def query_github_api(user, repo, query):
	return await hub.pkgtools.fetch.get_page(
		f"https://api.github.com/repos/{user}/{repo}/{query}",
		is_json=True,
		refresh_interval=timedelta(days=15),
	)
```
we use `hub.pkgtools.fetch.get_page` to query the github API. The first argument is the link, the second is whether the page is json, this is important
to specify because if set to false, it will return a string and not a json object.

Next notice how we create an autogen, after all info from github is collected, we call the following code
```py
	commit_date = datetime.strptime(target_commit["commit"]["committer"]["date"], "%Y-%m-%dT%H:%M:%SZ")
	commit_hash = target_commit["sha"]
	version = commit_date.strftime("%Y%m%d")
	url = f"https://github.com/{github_user}/{github_repo}/archive/{commit_hash}.tar.gz"
	final_name = f"{pkginfo['name']}-{version}.tar.gz"

	ebuild = hub.pkgtools.ebuild.BreezyBuild(
		**pkginfo,
		github_user=github_user,
		github_repo=github_repo,
		version=version,
		artifacts=[hub.pkgtools.ebuild.Artifact(url=url, final_name=final_name)],
	)
	ebuild.push()
```
this code calculates the version from the date a commit was made, gets the tarball url of the commit and designates a `final_name` variable, and pushes
and ebuild. 

An ebuild is an object of type `hub.pkgtools.ebuild.BreezyBuild`, the object requires some data, namely `**pkginfo`, a version and an array of `artifacts`

The `pkginfo` variable is a map that contains the following 3 fields
1. `name` - the name of the package i.e. `rtl8192eu`
1. `cat` - the category of the package i.e. `net-wireless`
1. `template_path` - The path to the autogen template file

The `artifacts` array is an array of type `hub.pkgtools.ebuild.Artifact`(that's what we acces in the jinja substition in the previous part). Every
artifact contains 2 variables:
1. `url` - the tarball url
1. `final_name` - the name to which the tarball will be renamed i.e. "satirsdarsdarsd.tar.gz" -> "pacakge.tar.gz"

when we have the artifacts array populated, we can push an ebuild with the `.push()` member function of the `hub.pkgtools.ebuild.BreezyBuild` object.

But talking about jinja previously you might wonder if we can push other variables and the answer is yes, the `github_user` and `github_repo` variables
that we passed to `hub.pkgtools.ebuild.BreezyBuild` are actually custom variables and they can be accessed in the template.

Now for the template of the driver:
```ebuild
# Distributed under the terms of the GNU General Public License v2

EAPI=7
inherit linux-mod

DESCRIPTION="Realtek 8192EU driver module for Linux kernel"
HOMEPAGE="https://github.com/Mange/rtl8192eu-linux-driver"
SRC_URI="{{ artifacts[0].src_uri }}"

LICENSE="GPL-2"
KEYWORDS="~amd64 ~x86"

DEPEND="virtual/linux-sources"

MODULE_NAMES="8192eu(net/wireless)"
BUILD_TARGETS="all"

src_unpack() {
	unpack ${A}
	mv "${WORKDIR}"/{{ github_repo }}-* "${S}"
}
```
notice how we access the `github_repo` variable in the last line of the `src_unpack` function and how the `SRC_URI` variable has the same value
### Generating an autogen
Alright we went trough the common uses of an autogen, now to generating an ebuild. First we need to make something clear about github. Github has a
very restrictive rate limit, so if you want to rapidly ping github for autogens you need to access github using your own account. This can be done
by creating the `~/.autogen` file and populating it with your github name and personal access token like this:
```yaml
autentication:
  api.github.com:
    username: "<insert github name here>"
    password: "<insert github personal access token here>"
```
next, head to your autogen directory. First let's go to `kit-fixups/desktop-kit/curated/app-i18n/` and generate `ibus-m17n`.

You can generate the whole category by running `doit`, but we don't want that, we just want `ibus-m17n`, fortunately you can provide the `--pkg <name>`
argument to control which package gets generated. In our example run:
```
sudo doit --pkg ibus-m17n
```
a new folder will be created called `ibus-m17n`, entering it you will see the following 2 files
1. `Manifest`
1. `ibus-m17n-<version>.ebuild`

If you `cat` the ebuild you will get similar output
```ebuild
# Distributed under the terms of the GNU General Public License v2

EAPI="7"

inherit gnome3-utils xdg

DESCRIPTION="M17N engine for IBus"
HOMEPAGE="https://github.com/ibus/ibus/wiki"
SRC_URI="https://github.com/ibus/ibus-m17n/releases/download/1.4.13/ibus-m17n-1.4.13.tar.gz -> ibus-m17n-1.4.13.tar.gz"

LICENSE="GPL-2+"
SLOT="0"
KEYWORDS="*"
IUSE="gtk nls"

DEPEND="app-i18n/ibus
	dev-libs/m17n-lib
	gtk? ( x11-libs/gtk+:3 )
	nls? ( virtual/libintl )"
RDEPEND="${DEPEND}
	>=dev-db/m17n-db-1.7"
BDEPEND="sys-devel/gettext
	virtual/pkgconfig"

src_configure() {
	econf \
		$(use_enable nls) \
		$(use_with gtk gtk 3.0)
}

pkg_preinst() {
	xdg_pkg_preinst
	gnome3_schemas_savelist
}

pkg_postinst() {
	xdg_pkg_postinst
	gnome3_schemas_update
}

pkg_postrm() {
	xdg_pkg_postrm
	gnome3_schemas_update
}
```
notice how in the `SRC_URI` we have substituted `{{ artifacts[0].src_uri }}` to a valid URL.

Next to use the ebuild, run the `ebuild` command like this
```sh
sudo ebuild <ebuild file> clean install
```
this will test if the ebuild can run until `src_install`. If it is successful, you can merge the ebuild into your system, this can be done using
```sh
sudo ebuild <ebuild file> clean merge
```
additionally, you might have multiple sources in the `SRC_URI` variable and your build can fail with the following message:
```
!!! Fetched file: <custom source here>.tar.xz VERIFY FAILED!
!!! Reason: Insufficient data for checksum verification
!!! Got:      
!!! Expected: BLAKE2B BLAKE2S MD5 RMD160 SHA1 SHA256 SHA3_256 SHA3_512 SHA512 WHIRLPOOL
```
to fix this run
```sh
sudo ebuild <ebuild file> clean digest
```
then run with `clean install` again and you won't get the error.

When you're ready with your using your ebuild you can now remove it because Funtoo doesn't need it, files like the `Manifest` and `ebuild` files from
autogeneration are not used by funtoo and therefore they need to be deleted. Additionally keep in mind that when a package only has an ebuild and is not
autogenerated, you need to delete it's entry in the kit's `packages.yaml` file if you made an autogen for it. 

---

Next let's head to `kit-fixups/core-hw-kit/curated/net-wireless/rtl8192eu`, here we have a single python autogen. You can simply run `doit` and it will
generate the autogen for you. If you `cat` the ebuild file, you're going to get something similar to this:
```ebuild
# Distributed under the terms of the GNU General Public License v2

EAPI=7
inherit linux-mod

DESCRIPTION="Realtek 8192EU driver module for Linux kernel"
HOMEPAGE="https://github.com/Mange/rtl8192eu-linux-driver"
SRC_URI="https://github.com/Mange/rtl8192eu-linux-driver/archive/e39c4e7a66b05fab6eceb2bb251d399c003fb544.tar.gz -> rtl8192eu-20220825.tar.gz"

LICENSE="GPL-2"
KEYWORDS="~amd64 ~x86"

DEPEND="virtual/linux-sources"

MODULE_NAMES="8192eu(net/wireless)"
BUILD_TARGETS="all"

src_unpack() {
	unpack ${A}
	mv "${WORKDIR}"/rtl8192eu-linux-driver-* "${S}"
}
```
here, other than deleting the ebuild and `Manifest` file we also have to delete the `__pycache__` folder
### Custom generators
A custom generator is a python autogen that can be used in yaml autogens to generate ebuilds. It's better when given an example, so head to
`kit-fixups/dev-kit/curated/app-i18n`. If you cat the autogen.yaml file you will get something like this
```yaml
libpinyin_libchewing_and_others:
  generator: github-1
  defaults:
    cat: app-i18n
  packages:
    - libpinyin:
        github:
          user: libpinyin
          repo: libpinyin
          query: releases
          tarball: "libpinyin-{version}.tar.gz"
    - libchewing:
        github:
          user: chewing
          repo: libchewing
          query: releases
          tarball: "libchewing-{version}.tar.bz2"
    - pyzy:
        github:
          user: openSUSE
          repo: pyzy
          query: releases
    - librime:
        github:
          user: rime
          repo: librime
          query: releases
zinnia_rule:
  defaults:
    cat: app-i18n
  generator: zinniag
  packages:
    - zinnia:
        fullname: zinnia
        description: Zinnia - Online hand recognition system with machine learning
        license: BSD
        homepage: https://taku910.github.io/zinnia/
    - zinnia-tomoe:
        fullname: zinnia-tomoe
        description: Handwriting model files trained with Tomoe data
        license: LGPL-2.1+
        homepage: https://taku910.github.io/zinnia/
```
the first root entry in the yaml file uses the github generator as expected, but the `zinnia_rule` entry uses the `zinniag` generator. All data here is
pure metadata, the only important stuff here is the `generator`'s name and the entries in the `packages` array. Here 2 packages, `zinnia` and
`zinnia-tomoe` will be generated with the `zinniag` generator. The templates are as expected stored under the `templates` folder for the category-global
`autogen.py`. The generator itself can be found under the `generators` folder, under the `zinniag.py` file.

Opening the file gives us this information
```py
#!/usr/bin/env python3
# TODO: Convert to YAML autogen when FL-10360 gets resolved
from datetime import datetime, timedelta


async def query_github_api(user, repo, query):
    return await hub.pkgtools.fetch.get_page(
        f"https://api.github.com/repos/{user}/{repo}/{query}",
        is_json=True,
        refresh_interval=timedelta(days=15),
    )


async def is_valid(user, repo, commit):
    commit_sha = commit["sha"]
    commit_status = await query_github_api(user, repo, f"commits/{commit_sha}/status")

    return "failure" not in commit_status["state"]


async def generate(hub, **pkginfo):
    github_user = "taku910"
    github_repo = "zinnia"

    commits = await query_github_api(github_user, github_repo, "commits?sha=master")

    valid_commits = (
        commit for commit in commits if await is_valid(github_user, github_repo, commit)
    )

    target_commit = await valid_commits.__anext__()

    commit_date = datetime.strptime(
        target_commit["commit"]["committer"]["date"], "%Y-%m-%dT%H:%M:%SZ"
    )
    package = pkginfo["name"]
    commit_hash = target_commit["sha"]
    version = commit_date.strftime("%Y%m%d")
    url = f"https://github.com/{github_user}/{github_repo}/archive/{commit_hash}.tar.gz"
    final_name = f"{package}-{version}.tar.gz"

    ebuild = hub.pkgtools.ebuild.BreezyBuild(
        **pkginfo,
        github_user=github_user,
        github_repo=github_repo,
        version=version,
        artifacts=[hub.pkgtools.ebuild.Artifact(url=url, final_name=final_name)],
    )
    ebuild.push()
```
here, similar to the `rtl8192eu` package, we fetch the lates commit from a github repository. THe zinnia github repo contains 2 github folders, one for
zinnia and the other for zinnia-tomoe. And because of that we can reuse this script to generate the 2 packages at the same time. However, unlike the other
autogens I showed, here we don't actually hardcode the name of the package, instead it's given to us in the `pkginfo` struct, so when creating the
`final_name` we acutally use `pkginfo["name"]` to get the package name when generating it. This way our script is completely modular

Next, if we generate `zinnia` using `doit --pkg zinnia` and enter the `zinnia` folder we can see that we have an ebuild ready to install. And that's how
we create 2 packages at the same time using a generator. These generators can be more complicated like the `m17n` generator under 
`kit-fixups/dev-kit/curated/dev-libs/generators/m17n.py` which uses webscraping to get a tarball for the `m17n-lib`, `m17n-db` and `m17n-contrib` packages
(`m17n-db` and `m17n-contrib` packages are under `dev-db` and have their own copy of the generator but it's still the same tactic)
### Showcasing the powers of jinja and autogen
Lastly I want to show you an autogen script that I wrote myself for `rime-plum`, the package manager for [the rime input method](https://rime.im).
Here is the issue, rime-plum uses github to download its packages, and ebuilds do not allow for downloading during the installation period. It is important
to note here that the packages that depend on `rime-plum` i.e. `ibus-rime` and `fcitx-rime` need the base package database. Fortunately the developers
keep a file containing the packages in the base database in the github repo of plum. So I figured, that I can fetch the latest commit of all the packages
and put it as a source for `plum` and I was successful in doing so. I wanted to share this with you to show you how powerful autogens are. Here is the
autogen
```py
#!/usr/bin/env python3
# TODO: When plum 1.0 releases, switch to release based autogen
# TODO: Convert to yaml commit based autogen if it releases before the 1.0 of plum
from datetime import datetime, timedelta

github_user = "rime"
github_repo = "rime"

async def query_github_api(user, repo, query):
    return await hub.pkgtools.fetch.get_page(
        f"https://api.github.com/repos/{user}/{repo}/{query}",
        is_json=True,
        refresh_interval=timedelta(days=15),
    )


async def is_valid(user, repo, commit):
    commit_sha = commit["sha"]
    commit_status = await query_github_api(user, repo, f"commits/{commit_sha}/status")

    return "failure" not in commit_status["state"]

# Generates a link from a name
async def process_pkg(pkg, hub, **pkginfo):
    commits = await query_github_api(github_user, f"{github_repo}-{pkg}", "commits?sha=master")
    valid_commits = (
        commit for commit in commits if await is_valid(github_user, f"{github_repo}-{pkg}", commit)
    )
    target_commit = await valid_commits.__anext__()
    commit_hash = target_commit["sha"]

    return f"https://github.com/{github_user}/{github_repo}-{pkg}/archive/{commit_hash}.tar.gz"


# This function fetches the initial package list from the plum repository and parses it to return a list of packages
async def get_pkgs():
    package_list = await hub.pkgtools.fetch.get_page("https://raw.githubusercontent.com/rime/plum/master/preset-packages.conf", is_json=False, refresh_interval=timedelta(days=15))

    package_list = package_list.replace(" ", "").replace("\t", "")
    # find the first occurance of ( and erase 2 additional characters(\r\n) to remove the space,
    # resulting in a nice string to iterate over line by line until we find the ) terminator
    package_list = package_list[package_list.find('(') + 2:]

    packages = []
    accum = ""
    for pkg in package_list:
        if pkg == '\n':
            packages.append(accum)
            accum = ""
        elif pkg == ')':
            break
        else:
            accum += pkg

    return packages

async def generate(hub, **pkginfo):
    commits = await query_github_api(github_user, "plum", "commits?sha=master")

    valid_commits = (
        commit for commit in commits if await is_valid(github_user, "plum", commit)
    )

    target_commit = await valid_commits.__anext__()

    commit_date = datetime.strptime(
        target_commit["commit"]["committer"]["date"], "%Y-%m-%dT%H:%M:%SZ"
    )
    commit_hash = target_commit["sha"]
    version = commit_date.strftime("%Y%m%d")
    final_name = f"{pkginfo['name']}-{version}.tar.gz"
    url = f"https://github.com/{github_user}/plum/archive/{commit_hash}.tar.gz"

    artifacts = [ hub.pkgtools.ebuild.Artifact(url=url, final_name=final_name)]

    packages = await get_pkgs()
    # Process the package to get a link, alias the artifact using ebuild formatting to get a human-readable name
    for pkg in packages:
        artifacts.append(hub.pkgtools.ebuild.Artifact(await process_pkg(pkg, hub, **pkginfo), final_name=f"{pkg}.tar.gz"))

    ebuild = hub.pkgtools.ebuild.BreezyBuild(
        **pkginfo,
        github_user=github_user,
        github_repo="plum",
        version=version,
        pkgs=packages,
        artifacts=artifacts,
    )
    ebuild.push()
```
what this autogen does is, it fetches the latest commit from the main plum repo, downloads everything, then fetches the package file, 
iterates all package names, generates a github link for all packages in the format `https://github.com/rime/rime-{name}`, fetches their latest commit,
gets the tarball URL from the commit and pushes it as a new artifact in the artifacts array. Here is the template:
```ebuild
# Distributed under the terms of the GNU General Public License v2
# Plum replaces brise, the old database package that many distributions currently use
EAPI="7"

inherit user

DESCRIPTION="Rime configuration manager and input schema repository"
HOMEPAGE="https://rime.im/ https://github.com/rime/plum"
SRC_URI="{% for artifact in artifacts %}
	{{artifact.src_uri}}{% endfor %}"

LICENSE="GPL-3 LGPL-3 extra? ( Apache-2.0 )"
SLOT="0"
KEYWORDS="*"
IUSE="extra"

DEPEND="app-i18n/librime"
RDEPEND="${DEPEND}"

pkg_setup() {
	# Create the rime group
	enewgroup "rime"
}

src_unpack() {
	unpack ${A}
	mv "${WORKDIR}"/plum-* "${S}"
}

src_compile() {
	echo "Nothing to compile"
}

src_install() {
	# create directories and files that are needed
	mkdir -p ${ED}/usr/bin/
	mkdir -p ${ED}/usr/share/rime-data
	mkdir -p ${ED}/var/lib/plum
	mkdir -p ${ED}/etc

	# Install the plum source code to /var/lib, the source is required for plum to actually function.
	# There is no standard directory for installing the plum source, instead it is defined by an
	# environment variable. Logically it should be under /var/lib so that's where I put it
	cp "${S}"/* "${ED}"/var/lib/plum -r

	# Create symbolic link between the source and the binary directory
	cp ${ED}/var/lib/plum/rime-install ${ED}/usr/bin/rime-install

	# Install the data for rime, we cannot use the rime-install package manager since we don't have internet access
	for directory in "${WORKDIR}"/*/; do
		cp -f "${directory}"*.yaml "${directory}"*.txt "${ED}"/usr/share/rime-data &> /dev/null
	done

	# install the plum_dir environment variable
	echo "plum_dir=\"/var/lib/plum\"" >> "${ED}"/etc/environment

	# Manage permissions here
	chgrp -R rime "${ED}"/var/lib/plum/
	chmod -R g+w "${ED}"/var/lib/plum/
}
```
Notice how for the `SRC_URI` variable we iterate the artifacts array using jinja. When we run doit we get this SRC_URI variable:
```ebuild
SRC_URI="
	https://github.com/rime/plum/archive/3d06432dda5fd1738bebda298c574b6ed2d512d8.tar.gz -> rime-plum-20220702.tar.gz
	https://github.com/rime/rime-bopomofo/archive/c7618f4f5728e1634417e9d02ea50d82b71956ab.tar.gz -> bopomofo.tar.gz
	https://github.com/rime/rime-cangjie/archive/8dfad9e537f18821b71ba28773315d9c670ae245.tar.gz -> cangjie.tar.gz
	https://github.com/rime/rime-essay/archive/8882482d07f38b5713ea3f49cb593eed94e671dd.tar.gz -> essay.tar.gz
	https://github.com/rime/rime-luna-pinyin/archive/6e677427764b542313858eaed22c2951d8ec22fe.tar.gz -> luna-pinyin.tar.gz
	https://github.com/rime/rime-prelude/archive/dd84abecc33f0b05469f1d744e32d2b60b3529e3.tar.gz -> prelude.tar.gz
	https://github.com/rime/rime-stroke/archive/ea8576d1accd6fda339e96b415caadb56e2a07d1.tar.gz -> stroke.tar.gz
	https://github.com/rime/rime-terra-pinyin/archive/aefaf372b25febbf4d5f9443bd284d3dd6876085.tar.gz -> terra-pinyin.tar.gz"
```
all arranged as it should

### Final remarks on ebuild development
Here I want to present some useful information for ebuilds in Funtoo.

#### Adding config file and accessing the file system
During `src_install` you can add files and folders to the user's filesystem. Ebuilds are sandboxed and therefore you can't use the `/` path directly,
instead your ebuild only has access to what portage allows it to have access to. To fix this prepend the `${ED}` variable before your `/`, so for example
`/etc/environment` becomes `"${ED}"/etc/environment`. Moreover you can do whatever file operations you want on these files.

#### Config file protection
As discussed way above, the `etc-conf` and `dispatch-conf` utilities allow the user to update their config files when the application updates. To update a
configuration file trough an ebuild just add anything to it, a temporary file will be created by portage and portage will signal the user to use
`dispatch-conf` or `etc-conf` to fix the problem. So for example in the plum ebuild we use:
```sh
echo "plum_dir=\"/var/lib/plum\"" >> "${ED}"/etc/environment
```
to append `plum_dir="/var/lib/plum"` to `/etc/environment`

#### Python compat
You might see Gentoo using the syntax of `PYTHON_COMPAT=( python3_{8..10} )`, however in funtoo we have unified python versions, so we mostly use
`PYTHON_COMPAT=( python3+ )` if the package just requires python 3. We can still add a specific version to `PYTHON_COMPAT` if it really requires that specific version

#### Keywords
In Funtoo we don't support as much architectures as Gentoo does, this is because funtoo has its own support matrix system, where the most-popular 
architectures are a priority. Therefore we usually don't add specific keywords and instead write:
```ebuild
KEYWORDS="*"
```
## Closing note
Hope you learned something from this guide, I tried to make it as easy and as large as I could because there are really a lot of concepts to cover when
talking about gentoo and funtoo development. If you find any error or problem here, please submit an issue to my website's github repo 
[here](https://github.com/Madman10K/madman10k.github.io)
