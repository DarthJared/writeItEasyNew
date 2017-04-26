import { Component, Input } from "@angular/core";
import { WriteButton } from "../write-button/write-button.component";

@Component({
   selector: 'content-enter',
   templateUrl: './content-enter/content-enter.component.html',
   styleUrls: ['./content-enter/content-enter.component.css'],
   directives: [ WriteButton ]
})

export class ContentEnter {
  constructor() { 
    let starterObj = JSON.parse(JSON.stringify(this.sectionObj));  
    let lengthSect = this.contentObj.bodySections.length;  
    if (lengthSect > 0)
      starterObj.indexVal = this.contentObj.bodySections[lengthSect - 1].indexVal + 1;
    this.contentObj.bodySections.push(starterObj);
  }  

  deleteSection(section) {
    let todelete = confirm("Are you sure you want to delete this section?  If you proceed, the contents will be lost and it cannot be undone.");
    if (todelete) {
      // console.log("Delete the section!");
      for (let i = 0; i < this.contentObj.bodySections.length; i++) {
        if (this.contentObj.bodySections[i].indexVal === section.indexVal) {
          this.contentObj.bodySections.splice(i, 1);
        }
      }
    }
  }

  addSection(msg) {
    let newSection = JSON.parse(JSON.stringify(this.sectionObj));
    let lengthSect = this.contentObj.bodySections.length;  
    if (lengthSect > 0)
      newSection.indexVal = this.contentObj.bodySections[lengthSect - 1].indexVal + 1;
    newSection.sectionLevel = 1;
    this.contentObj.bodySections.push(newSection);
  }

  addSubsection(msg) {
    let newSection = JSON.parse(JSON.stringify(this.sectionObj));
    let lengthSect = this.contentObj.bodySections.length;  
    if (lengthSect > 0)
      newSection.indexVal = this.contentObj.bodySections[lengthSect - 1].indexVal + 1;
    newSection.sectionLevel = 2;
    this.contentObj.bodySections.push(newSection);
  }

  addSubsubsection(msg) {
    let newSection = JSON.parse(JSON.stringify(this.sectionObj));
    let lengthSect = this.contentObj.bodySections.length;  
    if (lengthSect > 0)
      newSection.indexVal = this.contentObj.bodySections[lengthSect - 1].indexVal + 1;
    newSection.sectionLevel = 3;
    this.contentObj.bodySections.push(newSection);
  }

  @Input() configOptions;
  
  getOffset(property: string, value1: string, result1: string, value2: string, result2: string, value3: string, result3: string) {
    if (property === value1)
      return result1;
    if (property === value2)
      return result2;
    if (property === value3)
      return result3;
  }

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
    content: "",  
    indexVal: 0  
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
    paragraphs: [],
    indexVal: 0
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