import { Component, Input } from "@angular/core";
import { WriteButton } from "../write-button/write-button.component";

@Component({
   selector: 'content-enter',
   templateUrl: './content-enter/content-enter.component.html',
   styleUrls: ['./content-enter/content-enter.component.css'],
   directives: [ WriteButton ]
})

export class ContentEnter {
  constructor() { }  

  @Input() configOptions;

  titleFieldObj = {
    name: "",
    value: ""
  };
  formatSectionObj = {
    bold: false,
    underline: false,
    italicize: false,
    fontSize: 12,
    font: "Times New Roman",
    content: ""    
  };
  paragraphObj = {
    alignment: "left",
    spacing: 2,
    topIndent: 1,
    bottomIndent: 0,
    formatSections:[]
  };
  sectionObj = {
    sectionLevel: 1,
    onOwnPage: false,
    includeLabel: true,
    label: {			
      labelText: "",
      font: "Times New Roman",
      fontSize: 12,
      bold: true,
      underline: false,
      italicize: false
    },
    paragraphs: []
  };
  referenceFieldObj = {
    name: "",
    value: "",
    bold: false,
    underline: false,
    italicize: false,
    inQuotes: false,
    inParens: false
  };
  quotationObj = {
    content: "",
    block: false
  };
  referenceObj = {
    keyData: "Title",
    fields: [],
    inText: "",
    quotations: []
  };
  contentObj = {
    titleFields: [],
    summaryLabel: {
      labelText: "",
      font: "Times New Roman",
      fontSize: 12,
      bold: true,
      underline: false,
      italicize: false
    },
    summaryParagraphs: [],
    bodySections: [],
    conclusionLabel: {
      labelText: "",
      font: "Times New Roman",
      fontSize: 12,
      bold: true,
      underline: false,
      italicize: false
    },
    conclusionParagraphs: [],
    references: []
  };


}