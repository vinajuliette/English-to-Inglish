# English to İňglıš ![JS Version](https://img.shields.io/badge/javascript-ES6-orange.svg) [![License: GPL v3](https://img.shields.io/badge/License-GPL%20v3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)

English to İňglıš and IPA converter in JavaScript.

This comes with the core dictionary lookup and example frontend. This project assumes you will be running this translator in a browser of some sort.
* `text-to-ipa.js`: contains the main logic for loading the `ipadict.txt` and looking up words.
* `ipa-to-inslish.js`: contains the logic for translating IPA to İňglıš.
* `converter-form.js`: contains logic for tokenizing input text, which is fed to the text-to-ipa tool.
* `example-translator.html`: provides a Web interface to use these tools

## About İňglıš:

İňglıš is a constructed writing system for the English language and covers both General American (GA) English and Received Pronunciation (RP) British English. It's goal is to be a nearly phonetic writing system which is still largely legible to native English readers/speakers while also being easier to read for non-native English readers/speakers. It tries where it can to use the same characters for sounds as in the normal English writing system where it makes sense, and uses other easy to recognize and easy to write characters for other English-language sounds.

İňglıš does not use accent/stress markers like IPA does, so the ipa-to-inglish code removes those, and subsequently removes duplicates from the conversion which differ only in stress markers. Because İňglıš itself is in development, the lack of stress markers may change.

### Examples:

Example 1:
* English: Hello friend! How are you today?
* IPA: (hʌlowˈ/hɛlowˈ) fɹɛˈnd! hawˈ (ɑˈɹ/ɚ) juˈ (tʌdejˈ/tudejˈ)?
* İňglıš: (hǒlow/helow) frend! häw (ȧr/ěr) yu (tǒdėy/tudėy)?

Example 2:
* English: The history of all hitherto existing society is the history of class struggles.
* IPA: (ðʌ/ðʌˈ/ði) (hɪˈstɚi/hɪˈstɹi) (ʌˈv/ʌv) ɔˈl hɪˈðɚˌtuˈ ɪgzɪˈstɪŋ sʌsajˈʌti (ɪˈz/ɪz) (ðʌ/ðʌˈ/ði) (hɪˈstɚi/hɪˈstɹi) (ʌˈv/ʌv) klæˈs stɹʌˈgʌlz.
* İňglıš: (đǒ/đi) (hıstěri/hıstri) ǒv ȯl hıđěrtu ıgzıstıň sǒsäyǒti ız (đǒ/đi) (hıstěri/hıstri) ǒv klās strǒgǒlz.

### Additional:

Note: this translator groups multiple pronunciations together in parentheses and separated my forward slashes, but this is easily changed in the code.

See the ipa-to-inglish.txt file for a mapping from the IPA to lowercase and uppercase Inglish characters

The text to IPA portion uses the CMU-IPA Dictionary, which is based on American English; RP or other pronunciations are not immediately provided by this tool.

## About the CMU-IPA Dictionary

This tool implies that the CMU-IPA Dictionary _will_ be used. You can load any dictionary you want into this program, but the method to lookup words assumes it will be in the CMU format.

This was kind of a pain to get working, as most of the time was found looking for a good IPA dictionary which was ultimately found [here](http://people.umass.edu/nconstan/CMU-IPA/). This dictionary is included with this repository by default.

## License

<img align="center" src="https://licensebuttons.net/l/GPL/2.0/88x62.png" alt="GPL license image">

This code is released under the GNU GENERAL PUBLIC LICENSE. All works in this repository are meant to be utilized under this license. You are entitled to remix, remodify, and redistribute this program as you see fit, under the condition that all derivative works must use the GPL Version 3.

## See Also

[IPA Chart](https://www.ipachart.com/)

## Acknowledgements

[CMU IPA Dictionary](http://people.umass.edu/nconstan/CMU-IPA/)

