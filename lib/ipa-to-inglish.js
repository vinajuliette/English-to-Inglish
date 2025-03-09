

class IPAToInglish {
  constructor() {
    this.ipa_to_lower = {};
    this.ipa_to_upper = {};
    this.non_ipa_keys_re = null;
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
      // get all keys (IPA characters) and make them into a
      let keys = Object.keys(this.ipa_to_lower).join('');
      this.non_ipa_keys_re = new RegExp('[^'+keys+']+', 'g');
    });
  }

  convert(input) {
    let output = [];
    input.split(/\s/g).forEach((token) => {
      let new_token = [];
      token.split('').forEach((chr) => {
        if (chr.match(/[\u02C8|\u02CC|\u02CC|\u02D1]/g)) {  // skip IPA stress and length marker characters
          return;
        }
        if (chr.match(this.non_ipa_keys_re))
          new_token.push(chr);
        else if (chr in this.ipa_to_lower)
          new_token.push(this.ipa_to_lower[chr]);
        else
          new_token.push('\\u'+parseInt(chr.charCodeAt(), 16));
      });
      // If there are multiple IPA pronunciations, which will result in them grouped in parens
      // and separated by forward slashes, pull it apart and unique it.
      // This *can* result in false positives if the original user input included it but that's
      // on the user for that.
      if (new_token[0] == '(' && new_token.slice(-1) == ')' && new_token.includes('/')) {
        new_token = ([... new Set(new_token.join('').slice(1,-1).split(/\//g))].join('/'));
        if (new_token.includes('/'))
          new_token = '(' + new_token + ')';
        output.push(new_token);
      }
      else {
        output.push(new_token.join(''));
      }
    });
    
    return output.join(' ');
  }
}
