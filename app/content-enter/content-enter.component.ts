import { Component, Input, OnChanges } from "@angular/core";
import { WriteButton } from "../write-button/write-button.component";

@Component({
   selector: 'content-enter',
   templateUrl: './content-enter/content-enter.component.html',
   styleUrls: ['./content-enter/content-enter.component.css'],
   directives: [ WriteButton ]
})

export class ContentEnter implements OnChanges {
  @Input() configOptions;
  deletedSections = [];
  
  ngOnChanges() {
    
  }

  constructor() { 
    let starterObj = JSON.parse(JSON.stringify(this.sectionObj));  
    let lengthSect = this.contentObj.bodySections.length;  
    if (lengthSect > 0)
      starterObj.indexVal = this.contentObj.bodySections[lengthSect - 1].indexVal + 1;
    this.contentObj.bodySections.push(starterObj);
  }  

  updateHeaderInfo(selection, content) {
    // console.log(change.currentTarget.outerText);

    switch(selection) {
      case 'firstLeft':

        break;
      case 'firstRight':

        break;
      case 'left':

        break;
      case 'right':

        break;
      
    }
    if (content == 'pageNumber') {

    }
  } 

  updateTitleInfo(name, content) {
    let titleInfoToAdd = JSON.parse(JSON.stringify(this.titleFieldObj));
    titleInfoToAdd.name = name;
    let formatSectionToAdd = JSON.parse(JSON.stringify(this.formatSectionObj));
    formatSectionToAdd.content = content;
    titleInfoToAdd.formatSections.push(formatSectionToAdd);
    let indexToAdd = 0;
    for (let index in this.contentObj.titleFields) {
      let titleObj = this.contentObj.titleFields[index];
      if (titleObj.name == name) {
        indexToAdd = titleObj.index;
        delete this.contentObj.titleFields[index];
      }
    }
    titleInfoToAdd.index = indexToAdd;
    this.contentObj.titleFields.push(titleInfoToAdd);
  }

  getTitleField(name) {
    for (let index in this.contentObj.titleFields) { 
      let titleObj = this.contentObj.titleFields[index];
      if (titleObj.name == name) {
        return this.contentify([titleObj]);
      }
    }    
  }

  deleteSection(section) {
    let todelete = confirm("Are you sure you want to delete this section?  If you proceed, the contents will be lost and it cannot be undone.");
    if (todelete) {
      for (let i = 0; i < this.contentObj.bodySections.length; i++) {
        if (this.contentObj.bodySections[i].indexVal === section.indexVal) {
          this.deletedSections.push(this.contentObj.bodySections[i]);
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
  
  getOffset(property: string, value1: string, result1: string, value2: string, result2: string, value3: string, result3: string) {
    if (property === value1)
      return result1;
    if (property === value2)
      return result2;
    if (property === value3)
      return result3;
  }

  parseSummary(summaryContent) {
    let paragraphs = this.parseParagraphs(summaryContent);
    this.contentObj.summaryParagraphs = paragraphs;
    console.log(this.contentObj);
  }

  getSummary() {
    return this.contentify(this.contentObj.summaryParagraphs);
  }

  parseConclusion(conclusionContent) {
    let paragraphs = this.parseParagraphs(conclusionContent);
    this.contentObj.conclusionParagraphs = paragraphs;
    console.log(this.contentObj);
  }

  getConclusion() {
    return this.contentify(this.contentObj.conclusionParagraphs);
  }

  contentify(toParse) {
    let content = "";
    for (let i = 0; i < toParse.length; i++) {
      let paragraphContent = "<div>";
      let paragraph = toParse[i];
      for (let j = 0; j < paragraph.formatSections.length; j++) {
        let formatContent = "";
        let formatSection = paragraph.formatSections[j];
        if (formatSection.bold)
          formatContent += "<strong>";
        if (formatSection.underline)
          formatContent += "<u>";
        if (formatSection.italicize)
          formatContent += "<em>";
        formatContent += `<span style="font-family: '${formatSection.font}'; font-size: '${formatSection.fontSize}'">
                      ${formatSection.content}
                    </span>`;
        if (formatSection.italicize)
          formatContent += "</em>";
        if (formatSection.underline)
          formatContent += "</u>";
        if (formatSection.bold)
          formatContent += "</strong>";
        paragraphContent += formatContent;
      }
      if (paragraphContent == "<div>")
        paragraphContent += "<br>";
      paragraphContent += "</div>";
      content += paragraphContent;
    }
    return content;
  }

  parseParagraphs(paragraphs) {
    let toReturn = [];
    let paragraphsSplit = paragraphs.split("<div>");    
    for(let i = 0; i < paragraphsSplit.length; i++) {
      let paragraph = paragraphsSplit[i].replace("</div>", "");
      let newParagraphObj = JSON.parse(JSON.stringify(this.paragraphObj));
      let newFormatObj = JSON.parse(JSON.stringify(this.formatSectionObj));
      newFormatObj.content = paragraph;
      newParagraphObj.formatSections.push(newFormatObj);
      toReturn.push(newParagraphObj);      
    }
    return toReturn;
  }

  titleFieldObj = {
    name: "",
    formatSections: [],
    index: 0
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
    formatSections: []
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
  headerObj = {
    applyTo: "firstPage",
    leftType: "text",
    rightType: "pageNumber",
    formatSections: []
  };
  contentObj = {
    titleFields: [],
    headers: [],
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