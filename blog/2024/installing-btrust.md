# Installing B-Trust QES on Linux
This guide will help you install all required files and applications for using a B-Trust QES under Linux.

## Installing the required applications
First, we need to install the applications that will interact with the card reader. These are:
1. OpenSC - Gentoo/Funtoo: `root # emerge opensc`
2. PCSC-lite - Gentoo/Funtoo: `root # emerge pcsc-lite`

Next, start the `pcscd` service on boot:
```
root # rc-update pcscd add pcscd default
```
or the following for systemd:
```
root # systemctl systemctl enable pcscd
```

Enable hotreloading by adding the following line to `/etc/rc.conf` if on OpenRC:
```
rc_hotplug="pcscd"
```
Add yourself to the `pcscd` group and add it to the `usb` group:
```
root # usermod -a -G pcscd <user>
root # usermod -a -G usb pcscd
```
Reboot your PC.

## Install AB Circle CCID drivers
Many CCID readers in Bulgaria are made by a company, known as COMITEX, which produces readers such as the CCR7115B, which is
quite popular. These readers use hardware made by AB Circle. They provide source tarballs, however the easiest way is to download
a tarball obtained by invakid404's webscraper through 
[invakid404's GitHub repository's releases](https://github.com/invakid404/abcccid/releases).

Funtoo/Gentoo users can get an autogen and an ebuild from 
[here](https://github.com/MadLadSquad/UntitledDesktopOverlay/tree/master/app-crypt/abcccid).

To compile manually, extract all tarballs recursively, then enter `Circle_USB_Linux_Mac_Driver_v<version here>/abcccid-<version here>/` and run the following:
```
user $ ./configure
user $ make -j <number of jobs>
root # make install
root # cp src/92_pcscd_abcccid.rules /etc/udev/rules.d/
```

## Installing the required certificates
### Chromium
They are pre-installed for Chromium-based browsers

### Firefox
You have to download and install the following certificates in firefox:
1. <http://ca.b-trust.org/repository/B-TrustRootQCA_DER.crt>
1. <http://ca.b-trust.org/repository/B-TrustRootACA_DER.crt>
1. <http://ca.b-trust.org/repository/ca5/RootCA5_DER.crt>
1. <http://ca.b-trust.org/repository/B-TrustOperationalQCA_DER.crt>
1. <http://ca.b-trust.org/repository/B-TrustOperationalACA_DER.crt>
1. <http://ca.b-trust.org/repository/ca5/OperCA5QES_DER.cer>
1. <http://ca.b-trust.org/repository/ca5/OperCA5AES_DER.cer>

## Install QES for Firefox
Go to Settings -> Privacy and Security -> Certificates -> Security devices.

Click on the load button and load the `/usr/lib64/pkcs11/opensc-pkcs11.so` library.

You should be able to click the login button and enter you PIN code.

If everything is done correctly, you should be able to log into a site, like [nra.bg](https://login-portal.nra.bg/auth/login). 
If everything is successfull, you will be asked for your QES PIN code and redirected further.

Otherwise, an `SSL_ERROR_HANDSHAKE_FAILURE_ALERT` error will be returned.

## Install BISS
To digitally sign documents, you also need the BISS(Browser Independend Signing Service). You can download a tarball 
[here](https://www.b-trust.bg/services/software). Simply copy the files into your `/usr/local` or `~/.local` directories and
create a symlink from `<prefix>/opt/btrustbiss/bin/BISS` to a binary directory, like `/usr/local/bin` or `~/.local/bin`.

You can use an ebuild, like the one 
[here](https://github.com/MadLadSquad/UntitledDesktopOverlay/tree/master/app-crypt/btrustbiss) to easily install it on 
Gentoo/Funtoo systems. Note dependencies are not set, so you may lack some dependencies when compiling.

Once installed, you can run `user $ BISS` and once running successfully you can try signing a file 
[here](https://wsp.b-trust.bg/WSP/?lang=bg).
