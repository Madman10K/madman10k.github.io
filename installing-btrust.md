This guide will help you install all required files and applications for using a B-Trust QES under Linux.

## Installing the required applications
First, we need to install the applications that will interact with the card reader. These are:
1. OpenSC
2. PCSC-lite

Next, start the `pcscd` service on boot:
```
root # rc-update pcscd add pcscd default
```
Enable hotreloading by adding the following line to `/etc/rc.conf`:
```
rc_hotplug="pcscd"
```
Add yourself to the `pcscd` group and add it to the `usb` group:
```
root # usermod -a -G pcscd <user>
root # usermod -a -G usb pcscd
```
Reboot your PC.

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

If everything is done correctly, you should be able to log into a site, like [nra.bg](https://login-portal.nra.bg/auth/login). If everything is successfull, you will be asked 
for your QES PIN code and redirected further.

Otherwise, an `SSL_ERROR_HANDSHAKE_FAILURE_ALERT` error will be returned

## Install BISS
To digitally sign documents, you also need the BISS(Browser Independend Signing Service). You can download a tarball [here](https://www.b-trust.bg/services/software).

You can use the following ebuild to easily install it:
```ebuild
# Distributed under the terms of the GNU General Public License v2

EAPI="7"

inherit desktop rpm xdg

DESCRIPTION="Browser Independent Signing Service by Borika for signing files with a QES"
HOMEPAGE="https://www.b-trust.bg/services/software"
SRC_URI="https://www.b-trust.bg/attachments/BtrustPrivateFile/146/docs/B-TrustBISS.tar"

LICENSE="EULA"
SLOT="0"
KEYWORDS="*"
IUSE=""
RESTRICT=""

BDEPEND=""
DEPEND=""
RDEPEND=""

S="${WORKDIR}"

src_unpack() {
	unpack "${A}"
	rpm_unpack ./"${P}"-*.rpm
}

src_install() {
	doicon opt/btrustbiss/lib/BISS.png
	domenu opt/btrustbiss/lib/btrustbiss-BISS.desktop

	insinto /opt/btrustbiss
	doins -r opt/btrustbiss/.

	fperms +x /opt/btrustbiss/bin/BISS
	fperms 775 /opt/btrustbiss/lib/runtime/lib/*.so
	fperms 775 /opt/btrustbiss/lib/runtime/lib/jexec
	fperms 775 /opt/btrustbiss/lib/runtime/lib/jspawnhelper
	dosym /opt/btrustbiss/bin/BISS usr/bin/BISS
}

pkg_postinst() {
	xdg_mimeinfo_database_update
	xdg_icon_cache_update
	xdg_desktop_database_update
}

pkg_postrm() {
	xdg_mimeinfo_database_update
	xdg_icon_cache_update
	xdg_desktop_database_update
}
```

Once installed, you can run `BISS` and once running successfully you can try signing a file [here]().
