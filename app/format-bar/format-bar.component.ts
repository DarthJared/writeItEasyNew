import { Component, Output, EventEmitter } from "@angular/core";
import { FontsService } from "./../services/fonts.service";

@Component({
   selector: 'format-bar',
   providers: [ FontsService ],
   templateUrl: './format-bar/format-bar.component.html',
   styleUrls: ['./format-bar/format-bar.component.css']
})

export class FormatBar {
  constructor(private fontsService: FontsService) { }  
  bold: boolean = false;
  italic: boolean = false;
  underline: boolean = false;

  @Output() boldEvent = new EventEmitter();
  @Output() italicsEvent = new EventEmitter();
  @Output() underlineEvent = new EventEmitter();
  @Output() fontChangeEvent = new EventEmitter();
  @Output() fontSizeChangeEvent = new EventEmitter();
  @Output() indentEvent = new EventEmitter();
  @Output() reverseIndentEvent = new EventEmitter();
  @Output() addReferenceEvent = new EventEmitter();

  setBold() {
    this.bold = !this.bold;
    this.boldEvent.emit('bolded');
  }

  setItalic() {
    this.italic = !this.italic;
    this.italicsEvent.emit('italics');
  }

  setUnderline() {
    this.underline = !this.underline;
    this.underlineEvent.emit('underlined');
  }

  isBold() {

  }

  isItalic() {

  }

  isUnderlined() {

  }

  fontChanged(newFont) {
    this.fontChangeEvent.emit(newFont);
  }

  fontSizeChanged(newSize) {
    this.fontSizeChangeEvent.emit(newSize);
  }

  indent() {
    this.indentEvent.emit('indented');
  }

  reverseIndent() {
    this.reverseIndentEvent.emit('reverseIndent');
  }

  insertReference() {
    this.addReferenceEvent.emit('newReference');
  }
}