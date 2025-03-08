//  converter-form.js

//  This file creates a global ConverterForm object containing the public convert
//  and all additional helper methods.

//  The purpose of this program is to act as a tool to help interface with the text-to-ipa.js program
//  by providing a method to take text input from a text field, output the translated
//  IPA text, and output any error messages if need be.

//      ConverterForm.convert(inID, outID, errID)
//          inID        This is the name of the unique ID (string) of a text area
//                      that input should be read from. The program will find
//                      the first instance of this ID and assume it contains
//                      the english text to convert.
//          outID       This is the name of the unique ID (string) of a text area
//                      that out should be sent to. The program will find
//                      the first instance of this ID and assume it is a text
//                      field, and output the translated IPA there.
//          errID       This is the name of the unique ID (string) of a div that errors
//                      will be output to. The div will automatically be filled
//                      with a paragraph <p> element, and existing data in it
//                      will be overwritten
//          This method produces no output, but will take the value of the inID
//          text area and convert that text with TextToIPA. If the inID, or
//          TextToIPA object do not exist or are not objects, the method will
//          not do anything

// ESLint settings. We want console logging and some problems may exist
// with undefined objects (ConverterForm, TextToIPA) but we check for these
// beforehand
/* eslint-disable no-console, no-undef */

class ConverterForm {
  'use strict';

  // Error messages
  // Store error messages in the ConverterForm Object for accessing later without
  // polluting the global namespace.

  // Error message if a word entered is not defined within the dictionary
	constructor(inID, outID, errID, tti) {
		this.inID = inID;
		this.outID = outID;
		this.errID = errID;
		this.tti = tti;
    this._undefMsg = 'Some words you have entered cannot be found in the IPA dictionary.';
    this._multiMsg = 'Some words you have entered have multiple pronunciations in english. These differences are seperated with "/" and grouped in parentheses.';
  }

  _updateParagraph(the_id, text) {
    $(the_id).html('<p>'+text+'</p>');
  }

  // Update a text area by replacing its contents
  _updateTextArea(the_id, text) {
    $(the_id).val(text);
  }

  convert() {
		// Reset the error messages
		var currentErrorMessage = '';
		var currentMultiMessage = '';
		
    // Resulting array of IPA text words
    var IPAText = [];
		
    // Get the input from the inID as an array of strings that are each individual word
    var englishTextArray = $(this.inID).val().split(/\s+/g);
		
    // Begin converting
    for (var i in englishTextArray) {
      // Lookup the word with TextToIPA. The first element will be the error
      // with the word, the second element will be the converted word itself.
      // We also strip punctuation and and case.
      var IPAWord = this.tti.lookup(englishTextArray[i].toLowerCase().replace(/[^\w\s]|_/g, '').replace(/\s+/g, ' '));
			
      // Does the word exist?
      if (typeof IPAWord.error === 'undefined') {
        // No, so set the error message
        currentErrorMessage = this._undefMsg;
        // Push plain text instead of IPA
        IPAText.push(englishTextArray[i]);
      }
      // If it does, see how many pronunciations there are (TextToIPA knows this, and sends all pronunciations regardless)
			else if (IPAWord.error === 'multi') {
				currentErrorMessage = this._multiMsg;
        IPAText.push(IPAWord.text);
      }
      // Otherwise just push the converted word
			else {
        IPAText.push(IPAWord.text);
      }
		}
    // Turn the array to a sentence, and update the DOM
    IPAText = IPAText.join(' ');
    this._updateTextArea(this.outID, IPAText);
    this._updateParagraph(this.errID, currentErrorMessage + ' ' + currentMultiMessage);
    
  }

}
