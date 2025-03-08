

class IPAToInglish {
  constructor() {
    this.ipa_to_lower = {};
    this.ipa_to_upper = {};
  }

  loadDict(location) {
    console.log('IPAToInglish: Loading dict from ' + location + '...');
    if (typeof location !== 'string') {
      console.log('IPAToInglish Error: Location is not valid!');
      return;
    }
    $.get(location, (data) => {
      data.split(/\n/g).forEach((line) => {
        let ipa, lower, upper;
        [ipa, lower, upper] = line.split(/\s/g);
        this.ipa_to_lower[ipa] = lower;
        this.ipa_to_upper[ipa] = upper;
      });
    });
  }

  convert(input) {
    let output = [];
    input.split(/\s/g).forEach((token) => {
      let new_token = [];
      token.split('').forEach((chr) => {
        if (chr.match(/[\u02C8]/g)) {  // skip IPA stress marker character
          return;
        }
        if (chr.match(/[\(\)\.\?\/]/g))
          new_token.push(chr);
        else if (chr in this.ipa_to_lower)
          new_token.push(this.ipa_to_lower[chr]);
        else
          new_token.push('\\u'+parseInt(chr.charCodeAt(), 16));
      });
      output.push(new_token.join(''));
    });
    return output.join(' ');
  }
}
