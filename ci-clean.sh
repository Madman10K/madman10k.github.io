#!/usr/bin/env bash
rm -rf *.md
rm -rf Components/ UBTCustomFunctions/ .github/ docs/ monthly-newsletter/ untitled-desktop/
mv build/*.html .
mv build/*/ .
rm -rf build/ UVKBuildTool/
mv docs/UVKBuildToolN docs/UVKBuildTool

for i in `find ./ -type f -name '*.html' -printf '%p\n'` ; do
	sed -i 's/\.\//https:\/\/madladsquad.com\//g' "$i"
	sed -i 's/\/index\.html//g' "$i"
	sed -i 's/\.html//g' "$i"
done
