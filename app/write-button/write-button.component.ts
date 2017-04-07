import { Component, Input, Output, EventEmitter } from "@angular/core";
import { DocwriterService } from "./../services/docwriter.service";

@Component({
   selector: 'write-button',
   providers: [ DocwriterService ],
   templateUrl: './write-button/write-button.component.html',
   styleUrls: ['./write-button/write-button.component.css']
})

export class WriteButton {
  constructor(private docwriterService: DocwriterService) { }  
  @Input() configOptions;
  optionsOpen = false;
  headerObj = {
    applyTo: "",
    leftType: "",
    rightType: "",
    left: "",
    right: ""
  };
  titleFieldObj = {
    name: "",
    value: ""
  }
  paraObj = {
    alignment: "",
    spacing: 0,
    topIndent: 0,
    bottomIndent: 0,
    formatSections: []
  };
  formatSectObj = {
    bold: false,
    underline: false,
    italicize: false,
    fontSize: 12,
    font: "Times New Roman",
    content: ""
  };
  sectionObj = {
    sectionLevel: 0,
    onOwnPage: false,
    includeLabel: false,
    label: {			
      labelText: "",
      font: "Times New Roman",
      fontSize: 12,
      bold: false,
      underline: false,
      italicize: false,
      alignment: "",
      position: ""
    },
    paragraphs: []
  };
  citationObj = {
    keyData: "",
    fields: [],
    inText: "",
    quotations: []
  };
  citationFieldObj = {
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
  paperObj =  {
    title: "",
    author: "",
    headers:  {
      includeHeaders: false,
      diffFirstPage: false,
      font: "Times New Roman",
      fontSize: 12,
      headers: []
    },	
    titleInfo:
    {
      onOwnPage: false,
      alignment: "",
      font: "Times New Roman",
      fontSize: 12,
      bold: false,
      underline: false,
      italicize: false,
      fields: []
    },
    summaryAbstract: {
      onOwnPage: false,
      includeLabel: false,
      label: {			
        labelText: "",
        font: "Times New Roman",
        fontSize: 12,
        bold: false,
        underline: false,
        italicize: false,
        alignment: "",
        position: ""
      },		
      paragraphs: []
    },
    body: {
      sections: []		
    },
    conclusion: {
      onOwnPage: false,
      includeLabel: false,
      label: {			
        labelText: "",
        font: "Times New Roman",
        fontSize: 12,
        bold: false,
        underline: false,
        italicize: false,
        alignment: "",
        position: ""
      },
      paragraphs: []
    },	
    references: {
      onOwnPage: false,
      includeLabel: false,
      alignment: "",
      topIndent: 0,
      bottomIndent: 0,
      fontSize: 12,
      font: "Times New Roman",
      spacing: 0,
      label: {			
        labelText: "",
        font: "Times New Roman",
        fontSize: 12,
        bold: false,
        underline: false,
        italicize: false,
        alignment: "",
        position: ""
      },	
      citations: []
    }
  };

  @Output() sectionAdded = new EventEmitter();
  @Output() subsectionAdded = new EventEmitter();
  @Output() subsubsectionAdded = new EventEmitter();
  
  showOptions() {
    this.optionsOpen = !this.optionsOpen;
  }

  hideOptions() {
    this.optionsOpen = false;
  }

  addSection() {
    this.optionsOpen = false;
    this.sectionAdded.emit('added');
  }

  addSubsection() {
    this.optionsOpen = false;
    this.subsectionAdded.emit('added');
  }

  addSubsubsection() {
    this.optionsOpen = false;
    this.subsubsectionAdded.emit('added');
  }

  writeIt() {
    this.optionsOpen = false;
    this.parseConfig();
    this.parseContent();
    this.docwriterService.writeDocument(this.samplePaperObj);
    // this.docwriterService.writeDocument(this.samplePaperObj);
  }

  parseConfig() {     
    this.paperObj.title = this.configOptions.paperTitle;
    //author needed?

    /*Configure Header*/
    this.paperObj.headers.includeHeaders = this.configOptions.includeHeader;
    if (this.configOptions.includeHeader) {
      this.paperObj.headers.diffFirstPage = this.configOptions.headerDifferentFirstPage;
      this.paperObj.headers.font = this.configOptions.headerFont;
      this.paperObj.headers.fontSize = this.configOptions.headerFontSize;
      if (this.configOptions.headerDifferentFirstPage) {
        let headerFirst = JSON.parse(JSON.stringify(this.headerObj));
        if (this.configOptions.headerMoreDifferent) {
          if (this.configOptions.headerFirstLeft == 'headerFirstLeftPaperTitle' || this.configOptions.headerFirstLeft == 'headerFirstLeftOtherText') {
            headerFirst.applyTo = 'firstPage';
            headerFirst.leftType = 'text';
            headerFirst.left = this.configOptions.headerUseRunningHead 
              ? 'Running head: ' + this.configOptions.headerFirstLeftInput 
              : this.configOptions.headerFirstLeftInput;
          }
          else if (this.configOptions.headerFirstLeft == 'headerFirstLeftPageNumber') {
            headerFirst.applyTo = 'firstPage';
            headerFirst.leftType = 'pageNumber';
          }
          else {
            headerFirst.applyTo = 'firstPage';
            headerFirst.leftType = 'none';
          }
          if (this.configOptions.headerFirstRight == 'headerFirstRightPaperTitle' || this.configOptions.headerFirstRight == 'headerFirstRightOtherText') {
            headerFirst.rightType = 'text';
            headerFirst.right = this.configOptions.headerFirstRightInput;
          }
          else if (this.configOptions.headerFirstRight == 'headerFirstRightPageNumber') {
            headerFirst.rightType = 'pageNumber';
          }
          else {
            headerFirst.rightType = 'none';
          }
        }
        else {
          if (this.configOptions.headerLeft == 'headerLeftPaperTitle' || this.configOptions.headerLeft == 'headerLeftOtherText') {
            headerFirst.applyTo = 'firstPage';
            headerFirst.leftType = 'text';
            headerFirst.left = this.configOptions.headerUseRunningHead 
              ? 'Running head: ' + this.configOptions.headerLeftInput 
              : this.configOptions.headerLeftInput;
          }
          else if (this.configOptions.headerLeft == 'headerLeftPageNumber') {
            headerFirst.applyTo = 'firstPage';
            headerFirst.leftType = 'pageNumber';
          }
          else {
            headerFirst.applyTo = 'firstPage';
            headerFirst.leftType = 'none';
          }
          if (this.configOptions.headerRight == 'headerRightPaperTitle' || this.configOptions.headerRight == 'headerRightOtherText') {
            headerFirst.rightType = 'text';
            headerFirst.right = this.configOptions.headerRightInput;
          }
          else if (this.configOptions.headerRight == 'headerRightPageNumber') {
            headerFirst.rightType = 'pageNumber';
          }
          else {
            headerFirst.rightType = 'none';
          }
        }
        this.paperObj.headers.headers.push(headerFirst)
      }
      let headerMain = JSON.parse(JSON.stringify(this.headerObj));;
      if (this.configOptions.headerLeft == 'headerLeftPaperTitle' || this.configOptions.headerLeft == 'headerLeftOtherText') {
        headerMain.applyTo = 'default';
        headerMain.leftType = 'text';
        headerMain.left = this.configOptions.headerLeftInput;
      }
      else if (this.configOptions.headerLeft == 'headerLeftPageNumber') {
        headerMain.applyTo = 'default';
        headerMain.leftType = 'pageNumber';
      }
      else {
        headerMain.applyTo = 'default';
        headerMain.leftType = 'none';
      }
      if (this.configOptions.headerRight == 'headerRightPaperTitle' || this.configOptions.headerRight == 'headerRightOtherText') {
        headerMain.rightType = 'text';
        headerMain.right = this.configOptions.headerRightInput;
      }
      else if (this.configOptions.headerRight == 'headerRightPageNumber') {
        headerMain.rightType = 'pageNumber';
      }
      else {
        headerMain.rightType = 'none';
      }
      this.paperObj.headers.headers.push(headerMain);
    }

    /*Configure Title Info*/
    if (this.configOptions.includeTitle) {
      this.paperObj.titleInfo.onOwnPage = this.configOptions.titleInfoPos == 'titleInfoSeparatePage';
      let titleAlign = '';
      if (this.configOptions.titleInfoAlign == 'titleInfoAlignLeft') {
        titleAlign = 'left';
      }
      else if (this.configOptions.titleInfoAlign == 'titleInfoAlignCenter') {
        titleAlign = 'center';
      }
      else if (this.configOptions.titleInfoAlign == 'titleInfoAlignRight') {
        titleAlign = 'right';
      }
      this.paperObj.titleInfo.alignment = titleAlign;
      this.paperObj.titleInfo.font = this.configOptions.titleInfoFont;
      this.paperObj.titleInfo.fontSize = this.configOptions.titleInfoFontSize;
      //bold, underline, and italicize needed
      //title fields still not passed in

    }

    /*Summary / Abstract*/
    if (this.configOptions.includeSummaryAbstract) {
      this.paperObj.summaryAbstract.onOwnPage = this.configOptions.summaryOwnPage;
      if (this.configOptions.summaryIncludeSectionLabel) {
        this.paperObj.summaryAbstract.includeLabel = true;
        //insert label text
        //handle font, size, bold, underline, and italicize
        //handle alignment and position
      }
    }
    //handle paragraphs

    /*Paper Body*/
    //handle sections and paragraphs
    //handle between sections

    /*Conclusion*/
    if (this.configOptions.includeConclusion) {
      this.paperObj.conclusion.onOwnPage = this.configOptions.conclusionOwnPage;
      if (this.configOptions.conclusionIncludeLabel) {
        this.paperObj.conclusion.includeLabel = true;
        //insert label text
        //handle font, size, bold, underline, and italicize
        //handle alignment and position
      }
      //handle paragraphs
    }

    /*References*/
    if (this.configOptions.includeReferencesWorksCited) {
      this.paperObj.references.onOwnPage = this.configOptions.referencesOwnPage;
      //handle alignment (left, center, right)
      //handle hanging indent
      this.paperObj.references.font = this.configOptions.referencesFont;
      this.paperObj.references.fontSize = this.configOptions.referencesFontSize;
      let spacing = 2;
      if (this.configOptions.spacing =='singleSpace') {
        spacing = 1;
      }
      else if (this.configOptions.spacing == 'oneAndHalfSpace') {
        spacing = 1.5;
      }
      else if (this.configOptions.spacing == 'doubleSpace') {
        spacing = 2;
      }      
      this.paperObj.references.spacing = spacing;
      if (this.configOptions.referencesIncludeLabel) {
        this.paperObj.references.includeLabel = true;
        this.paperObj.references.label.labelText = this.configOptions.referencesLabelInput;
        this.paperObj.references.label.font = this.configOptions.referencesFont;
        this.paperObj.references.label.fontSize = this.configOptions.referencesFontSize;        
        let align = "";
        if (this.configOptions.referencesLabelAlign == 'referencesLabelAlignLeft') {
          align = "left";
        }
        else if (this.configOptions.referencesLabelAlign == 'referencesLabelAlignCenter') {
          align = "center";
        }
        else if (this.configOptions.referencesLabelAlign == 'referencesLabelAlignRight') {
          align = "right";
        }
        this.paperObj.references.label.alignment = align;
      }
      //handle references
    }
  }

  parseContent() {

  }

  samplePaperObj = {
    title: "My Paper",
    author: "Jared Beagley",
    headers:  {
          includeHeaders: true,
          diffFirstPage: true,
          font: "Times New Roman",
          fontSize: 12,
          headers: [
              {
                  applyTo: "firstPage",
                  leftType: "text",
                  rightType: "pageNumber",
                  left: "Running head: MY PAPER"
              },
              {
                  applyTo: "default",
                  leftType: "text",
                  rightType: "pageNumber",
                  left: "MY PAPER"
              }
          ]
      },	
    titleInfo:
    {
      onOwnPage: true,
      alignment: "center",
      font: "Times New Roman",
      fontSize: 12,
      bold: false,
      underline: false,
      italicize: false,
      fields: [
        {
          name: "Title",
          value: "My Paper"
        },
        {
          name: "Author",
          value: "Jared Beagley"
        },
        {
          name: "Course",
          value: "CS 124"
        }
      ]
    },
    summaryAbstract: {
      onOwnPage: true,
      includeLabel: true,
      label: {			
        labelText: "Summary",
        font: "Times New Roman",
        fontSize: 12,
        bold: true,
        underline: false,
        italicize: false,
        alignment: "center",
        position: "lineBefore"
      },		
      paragraphs: 
      [	
        {
          alignment: "left",
          spacing: 2,
          topIndent: 1,
          bottomIndent: 0,
          formatSections:
          [
            {
              bold: false,
              underline: false,
              italicize: false,
              fontSize: 12,
              font: "Times New Roman",
              content: "I do not plan on getting a Ph.D. at any point.  In the reading it says, 'Do not even think of applying for a Ph.D. if you have not tried research and/or teaching and found that you like at least one of those' (Harchol-Balter, 2014).  I personally "
            },
            {
              bold: true,
              underline: false,
              italicize: false,
              fontSize: 12,
              font: "Times New Roman",
              content: "do not like teaching"
            },
            {
              bold: false,
              underline: false,
              italicize: false,
              fontSize: 12,
              font: "Times New Roman",
              content: " or research and research is not exciting to me at all.  What I want to do to continue my education and training is to keep myself up to date on the latest technology through self-training and going to conferences whenever the opportunity arises.  In that sense, I will keep up to scratch with the people coming straight out of college with the new techniques and still gain experience in the work force.  If my company offers to send me to a graduate school, I might consider it, but I will be perfectly happy doing the work that my bachelor's degree will get me"
            }
          ]
        },
        {
          alignment: "left",
          spacing: 2,
          topIndent: 1,
          bottomIndent: 0,
          formatSections:
          [
            {
              bold: false,
              underline: false,
              italicize: false,
              fontSize: 12,
              font: "Times New Roman",
              content: "I do not plan on getting a Ph.D. at any point.  In the reading it says, 'Do not even think of applying for a Ph.D. if you have not tried research and/or teaching and found that you like at least one of those' (Harchol-Balter, 2014).  I personally do not like teaching or research and research is not exciting to me at all.  What I want to do to continue my education and training is to keep myself up to date on the latest technology through self-training and going to conferences whenever the opportunity arises.  In that sense, I will keep up to scratch with the people coming straight out of college with the new techniques and still gain experience in the work force.  If my company offers to send me to a graduate school, I might consider it, but I will be perfectly happy doing the work that my bachelor's degree will get me"
            }
          ]
        }	
      ]
    },
    body: {
      sections: [
        {
          sectionLevel: 1,
          onOwnPage: false,
          includeLabel: true,
          label: {			
            labelText: "Section 1",
            font: "Times New Roman",
            fontSize: 12,
            bold: true,
            underline: false,
            italicize: false,
            alignment: "center",
            position: "lineBefore"
          },
          paragraphs: 
          [	
            {
              alignment: "left",
              spacing: 2,
              topIndent: 1,
              bottomIndent: 0,
              formatSections:
              [
                {
                  bold: false,
                  underline: false,
                  italicize: false,
                  fontSize: 12,
                  font: "Times New Roman",
                  content: "I do not plan on getting a Ph.D. at any point.  In the reading it says, 'Do not even think of applying for a Ph.D. if you have not tried research and/or teaching and found that you like at least one of those' (Harchol-Balter, 2014).  I personally "
                },
                {
                  bold: true,
                  underline: false,
                  italicize: false,
                  fontSize: 12,
                  font: "Times New Roman",
                  content: "do not like teaching"
                },
                {
                  bold: false,
                  underline: false,
                  italicize: false,
                  fontSize: 12,
                  font: "Times New Roman",
                  content: " or research and research is not exciting to me at all.  What I want to do to continue my education and training is to keep myself up to date on the latest technology through self-training and going to conferences whenever the opportunity arises.  In that sense, I will keep up to scratch with the people coming straight out of college with the new techniques and still gain experience in the work force.  If my company offers to send me to a graduate school, I might consider it, but I will be perfectly happy doing the work that my bachelor's degree will get me"
                }
              ]
            },
            {
              alignment: "center",
              spacing: 2,
              topIndent: 1,
              bottomIndent: 0,
              formatSections:
              [
                {
                  bold: false,
                  underline: false,
                  italicize: false,
                  fontSize: 12,
                  font: "Times New Roman",
                  content: "I do not plan on getting a Ph.D. at any point.  In the reading it says, 'Do not even think of applying for a Ph.D. if you have not tried research and/or teaching and found that you like at least one of those' (Harchol-Balter, 2014).  I personally do not like teaching or research and research is not exciting to me at all.  What I want to do to continue my education and training is to keep myself up to date on the latest technology through self-training and going to conferences whenever the opportunity arises.  In that sense, I will keep up to scratch with the people coming straight out of college with the new techniques and still gain experience in the work force.  If my company offers to send me to a graduate school, I might consider it, but I will be perfectly happy doing the work that my bachelor's degree will get me"
                }
              ]
            },
            {
              alignment: "left",
              spacing: 2,
              topIndent: 1,
              bottomIndent: 0,
              formatSections:
              [
                {
                  bold: false,
                  underline: false,
                  italicize: false,
                  fontSize: 12,
                  font: "Times New Roman",
                  content: "I do not plan on getting a Ph.D. at any point.  In the reading it says, 'Do not even think of applying for a Ph.D. if you have not tried research and/or teaching and found that you like at least one of those' (Harchol-Balter, 2014).  I personally "
                },
                {
                  bold: false,
                  underline: false,
                  italicize: true,
                  fontSize: 12,
                  font: "Times New Roman",
                  content: "do not like teaching"
                },
                {
                  bold: false,
                  underline: false,
                  italicize: false,
                  fontSize: 12,
                  font: "Times New Roman",
                  content: " or research and research is not exciting to me at all.  What I want to do to continue my education and training is to keep myself up to date on the latest technology through self-training and going to conferences whenever the opportunity arises.  In that sense, I will keep up to scratch with the people coming straight out of college with the new techniques and still gain experience in the work force.  If my company offers to send me to a graduate school, I might consider it, but I will be perfectly happy doing the work that my bachelor's degree will get me"
                }
              ]
            }		
          ]
        },
        {
          sectionLevel: 2,
          onOwnPage: false,
          includeLabel: true,
          label: {			
            labelText: "Subsection 1",
            font: "Times New Roman",
            fontSize: 12,
            bold: true,
            underline: false,
            italicize: false,
            alignment: "left",
            position: "lineBefore"
          },
          paragraphs: 
          [	
            {
              alignment: "right",
              spacing: 2,
              topIndent: 1,
              bottomIndent: 0,
              formatSections:
              [
                {
                  bold: false,
                  underline: false,
                  italicize: false,
                  fontSize: 12,
                  font: "Times New Roman",
                  content: "I do not plan on getting a Ph.D. at any point.  In the reading it says, 'Do not even think of applying for a Ph.D. if you have not tried research and/or teaching and found that you like at least one of those' (Harchol-Balter, 2014).  I personally "
                },
                {
                  bold: false,
                  underline: true,
                  italicize: false,
                  fontSize: 12,
                  font: "Times New Roman",
                  content: "do not like teaching"
                },
                {
                  bold: false,
                  underline: false,
                  italicize: false,
                  fontSize: 12,
                  font: "Times New Roman",
                  content: " or research and research is not exciting to me at all.  What I want to do to continue my education and training is to keep myself up to date on the latest technology through self-training and going to conferences whenever the opportunity arises.  In that sense, I will keep up to scratch with the people coming straight out of college with the new techniques and still gain experience in the work force.  If my company offers to send me to a graduate school, I might consider it, but I will be perfectly happy doing the work that my bachelor's degree will get me"
                }
              ]
            },
            {
              alignment: "left",
              spacing: 2,
              topIndent: 1,
              bottomIndent: 0,
              formatSections:
              [
                {
                  bold: false,
                  underline: false,
                  italicize: false,
                  fontSize: 12,
                  font: "Times New Roman",
                  content: "I do not plan on getting a Ph.D. at any point.  In the reading it says, 'Do not even think of applying for a Ph.D. if you have not tried research and/or teaching and found that you like at least one of those' (Harchol-Balter, 2014).  I personally do not like teaching or research and research is not exciting to me at all.  What I want to do to continue my education and training is to keep myself up to date on the latest technology through self-training and going to conferences whenever the opportunity arises.  In that sense, I will keep up to scratch with the people coming straight out of college with the new techniques and still gain experience in the work force.  If my company offers to send me to a graduate school, I might consider it, but I will be perfectly happy doing the work that my bachelor's degree will get me"
                }
              ]
            },
            {
              alignment: "left",
              spacing: 2,
              topIndent: 1,
              bottomIndent: 0,
              formatSections:
              [
                {
                  bold: false,
                  underline: false,
                  italicize: false,
                  fontSize: 12,
                  font: "Times New Roman",
                  content: "I do not plan on getting a Ph.D. at any point.  In the reading it says, 'Do not even think of applying for a Ph.D. if you have not tried research and/or teaching and found that you like at least one of those' (Harchol-Balter, 2014).  I personally "
                },
                {
                  bold: false,
                  underline: false,
                  italicize: false,
                  fontSize: 12,
                  font: "Times New Roman",
                  content: "do not like teaching"
                },
                {
                  bold: false,
                  underline: false,
                  italicize: false,
                  fontSize: 12,
                  font: "Times New Roman",
                  content: " or research and research is not exciting to me at all.  What I want to do to continue my education and training is to keep myself up to date on the latest technology through self-training and going to conferences whenever the opportunity arises.  In that sense, I will keep up to scratch with the people coming straight out of college with the new techniques and still gain experience in the work force.  If my company offers to send me to a graduate school, I might consider it, but I will be perfectly happy doing the work that my bachelor's degree will get me"
                }
              ]
            }		
          ]
        },
        {
          sectionLevel: 3,
          onOwnPage: false,
          includeLabel: true,
          label: {			
            labelText: "Subsubsection 1",
            font: "Times New Roman",
            fontSize: 12,
            bold: true,
            underline: false,
            italicize: false,
            alignment: "left",
            position: "inline"
          },
          paragraphs: 
          [	
            {
              alignment: "left",
              spacing: 2,
              topIndent: 1,
              bottomIndent: 0,
              formatSections:
              [
                {
                  bold: false,
                  underline: false,
                  italicize: false,
                  fontSize: 12,
                  font: "Times New Roman",
                  content: "I do not plan on getting a Ph.D. at any point.  In the reading it says, 'Do not even think of applying for a Ph.D. if you have not tried research and/or teaching and found that you like at least one of those' (Harchol-Balter, 2014).  I personally "
                },
                {
                  bold: false,
                  underline: false,
                  italicize: false,
                  fontSize: 12,
                  font: "Times New Roman",
                  content: "do not like teaching"
                },
                {
                  bold: false,
                  underline: false,
                  italicize: false,
                  fontSize: 12,
                  font: "Times New Roman",
                  content: " or research and research is not exciting to me at all.  What I want to do to continue my education and training is to keep myself up to date on the latest technology through self-training and going to conferences whenever the opportunity arises.  In that sense, I will keep up to scratch with the people coming straight out of college with the new techniques and still gain experience in the work force.  If my company offers to send me to a graduate school, I might consider it, but I will be perfectly happy doing the work that my bachelor's degree will get me"
                }
              ]
            },
            {
              alignment: "left",
              spacing: 2,
              topIndent: 1,
              bottomIndent: 0,
              formatSections:
              [
                {
                  bold: false,
                  underline: false,
                  italicize: false,
                  fontSize: 12,
                  font: "Times New Roman",
                  content: "I do not plan on getting a Ph.D. at any point.  In the reading it says, 'Do not even think of applying for a Ph.D. if you have not tried research and/or teaching and found that you like at least one of those' (Harchol-Balter, 2014).  I personally do not like teaching or research and research is not exciting to me at all.  What I want to do to continue my education and training is to keep myself up to date on the latest technology through self-training and going to conferences whenever the opportunity arises.  In that sense, I will keep up to scratch with the people coming straight out of college with the new techniques and still gain experience in the work force.  If my company offers to send me to a graduate school, I might consider it, but I will be perfectly happy doing the work that my bachelor's degree will get me"
                }
              ]
            },
            {
              alignment: "left",
              spacing: 2,
              topIndent: 1,
              bottomIndent: 0,
              formatSections:
              [
                {
                  bold: false,
                  underline: false,
                  italicize: false,
                  fontSize: 12,
                  font: "Times New Roman",
                  content: "I do not plan on getting a Ph.D. at any point.  In the reading it says, 'Do not even think of applying for a Ph.D. if you have not tried research and/or teaching and found that you like at least one of those' (Harchol-Balter, 2014).  I personally "
                },
                {
                  bold: false,
                  underline: false,
                  italicize: false,
                  fontSize: 12,
                  font: "Times New Roman",
                  content: "do not like teaching"
                },
                {
                  bold: false,
                  underline: false,
                  italicize: false,
                  fontSize: 12,
                  font: "Times New Roman",
                  content: " or research and research is not exciting to me at all.  What I want to do to continue my education and training is to keep myself up to date on the latest technology through self-training and going to conferences whenever the opportunity arises.  In that sense, I will keep up to scratch with the people coming straight out of college with the new techniques and still gain experience in the work force.  If my company offers to send me to a graduate school, I might consider it, but I will be perfectly happy doing the work that my bachelor's degree will get me"
                }
              ]
            }		
          ]
        },
        {
          sectionLevel: 2,
          onOwnPage: false,
          includeLabel: true,
          label: {			
            labelText: "Subsection 2",
            font: "Times New Roman",
            fontSize: 12,
            bold: true,
            underline: false,
            italicize: false,
            alignment: "left",
            position: "lineBefore"
          },
          paragraphs: 
          [	
            {
              alignment: "left",
              spacing: 2,
              topIndent: 1,
              bottomIndent: 0,
              formatSections:
              [
                {
                  bold: false,
                  underline: false,
                  italicize: false,
                  fontSize: 12,
                  font: "Times New Roman",
                  content: "I do not plan on getting a Ph.D. at any point.  In the reading it says, 'Do not even think of applying for a Ph.D. if you have not tried research and/or teaching and found that you like at least one of those' (Harchol-Balter, 2014).  I personally "
                },
                {
                  bold: false,
                  underline: false,
                  italicize: false,
                  fontSize: 12,
                  font: "Times New Roman",
                  content: "do not like teaching"
                },
                {
                  bold: false,
                  underline: false,
                  italicize: false,
                  fontSize: 12,
                  font: "Times New Roman",
                  content: " or research and research is not exciting to me at all.  What I want to do to continue my education and training is to keep myself up to date on the latest technology through self-training and going to conferences whenever the opportunity arises.  In that sense, I will keep up to scratch with the people coming straight out of college with the new techniques and still gain experience in the work force.  If my company offers to send me to a graduate school, I might consider it, but I will be perfectly happy doing the work that my bachelor's degree will get me"
                }
              ]
            },
            {
              alignment: "left",
              spacing: 2,
              topIndent: 1,
              bottomIndent: 0,
              formatSections:
              [
                {
                  bold: false,
                  underline: false,
                  italicize: false,
                  fontSize: 12,
                  font: "Times New Roman",
                  content: "I do not plan on getting a Ph.D. at any point.  In the reading it says, 'Do not even think of applying for a Ph.D. if you have not tried research and/or teaching and found that you like at least one of those' (Harchol-Balter, 2014).  I personally do not like teaching or research and research is not exciting to me at all.  What I want to do to continue my education and training is to keep myself up to date on the latest technology through self-training and going to conferences whenever the opportunity arises.  In that sense, I will keep up to scratch with the people coming straight out of college with the new techniques and still gain experience in the work force.  If my company offers to send me to a graduate school, I might consider it, but I will be perfectly happy doing the work that my bachelor's degree will get me"
                }
              ]
            },
            {
              alignment: "left",
              spacing: 2,
              topIndent: 1,
              bottomIndent: 0,
              formatSections:
              [
                {
                  bold: false,
                  underline: false,
                  italicize: false,
                  fontSize: 12,
                  font: "Times New Roman",
                  content: "I do not plan on getting a Ph.D. at any point.  In the reading it says, 'Do not even think of applying for a Ph.D. if you have not tried research and/or teaching and found that you like at least one of those' (Harchol-Balter, 2014).  I personally "
                },
                {
                  bold: false,
                  underline: false,
                  italicize: false,
                  fontSize: 12,
                  font: "Times New Roman",
                  content: "do not like teaching"
                },
                {
                  bold: false,
                  underline: false,
                  italicize: false,
                  fontSize: 12,
                  font: "Times New Roman",
                  content: " or research and research is not exciting to me at all.  What I want to do to continue my education and training is to keep myself up to date on the latest technology through self-training and going to conferences whenever the opportunity arises.  In that sense, I will keep up to scratch with the people coming straight out of college with the new techniques and still gain experience in the work force.  If my company offers to send me to a graduate school, I might consider it, but I will be perfectly happy doing the work that my bachelor's degree will get me"
                }
              ]
            }		
          ]
        },
        {
          sectionLevel: 3,
          onOwnPage: false,
          includeLabel: true,
          label: {			
            labelText: "Subsubsection 1",
            font: "Times New Roman",
            fontSize: 12,
            bold: true,
            underline: false,
            italicize: false,
            alignment: "left",
            position: "inline"
          },
          paragraphs: 
          [	
            {
              alignment: "left",
              spacing: 2,
              topIndent: 1,
              bottomIndent: 0,
              formatSections:
              [
                {
                  bold: false,
                  underline: false,
                  italicize: false,
                  fontSize: 12,
                  font: "Times New Roman",
                  content: "I do not plan on getting a Ph.D. at any point.  In the reading it says, 'Do not even think of applying for a Ph.D. if you have not tried research and/or teaching and found that you like at least one of those' (Harchol-Balter, 2014).  I personally "
                },
                {
                  bold: false,
                  underline: false,
                  italicize: false,
                  fontSize: 12,
                  font: "Times New Roman",
                  content: "do not like teaching"
                },
                {
                  bold: false,
                  underline: false,
                  italicize: false,
                  fontSize: 12,
                  font: "Times New Roman",
                  content: " or research and research is not exciting to me at all.  What I want to do to continue my education and training is to keep myself up to date on the latest technology through self-training and going to conferences whenever the opportunity arises.  In that sense, I will keep up to scratch with the people coming straight out of college with the new techniques and still gain experience in the work force.  If my company offers to send me to a graduate school, I might consider it, but I will be perfectly happy doing the work that my bachelor's degree will get me"
                }
              ]
            },
            {
              alignment: "left",
              spacing: 2,
              topIndent: 1,
              bottomIndent: 0,
              formatSections:
              [
                {
                  bold: false,
                  underline: false,
                  italicize: false,
                  fontSize: 12,
                  font: "Times New Roman",
                  content: "I do not plan on getting a Ph.D. at any point.  In the reading it says, 'Do not even think of applying for a Ph.D. if you have not tried research and/or teaching and found that you like at least one of those' (Harchol-Balter, 2014).  I personally do not like teaching or research and research is not exciting to me at all.  What I want to do to continue my education and training is to keep myself up to date on the latest technology through self-training and going to conferences whenever the opportunity arises.  In that sense, I will keep up to scratch with the people coming straight out of college with the new techniques and still gain experience in the work force.  If my company offers to send me to a graduate school, I might consider it, but I will be perfectly happy doing the work that my bachelor's degree will get me"
                }
              ]
            },
            {
              alignment: "left",
              spacing: 2,
              topIndent: 1,
              bottomIndent: 0,
              formatSections:
              [
                {
                  bold: false,
                  underline: false,
                  italicize: false,
                  fontSize: 12,
                  font: "Times New Roman",
                  content: "I do not plan on getting a Ph.D. at any point.  In the reading it says, 'Do not even think of applying for a Ph.D. if you have not tried research and/or teaching and found that you like at least one of those' (Harchol-Balter, 2014).  I personally "
                },
                {
                  bold: false,
                  underline: false,
                  italicize: false,
                  fontSize: 12,
                  font: "Times New Roman",
                  content: "do not like teaching"
                },
                {
                  bold: false,
                  underline: false,
                  italicize: false,
                  fontSize: 12,
                  font: "Times New Roman",
                  content: " or research and research is not exciting to me at all.  What I want to do to continue my education and training is to keep myself up to date on the latest technology through self-training and going to conferences whenever the opportunity arises.  In that sense, I will keep up to scratch with the people coming straight out of college with the new techniques and still gain experience in the work force.  If my company offers to send me to a graduate school, I might consider it, but I will be perfectly happy doing the work that my bachelor's degree will get me"
                }
              ]
            }		
          ]
        },
        {
          sectionLevel: 3,
          onOwnPage: false,
          includeLabel: true,
          label: {			
            labelText: "Subsubsection 2",
            font: "Times New Roman",
            fontSize: 12,
            bold: true,
            underline: false,
            italicize: false,
            alignment: "left",
            position: "inline"
          },
          paragraphs: 
          [	
            {
              alignment: "left",
              spacing: 2,
              topIndent: 1,
              bottomIndent: 0,
              formatSections:
              [
                {
                  bold: false,
                  underline: false,
                  italicize: false,
                  fontSize: 12,
                  font: "Times New Roman",
                  content: "I do not plan on getting a Ph.D. at any point.  In the reading it says, 'Do not even think of applying for a Ph.D. if you have not tried research and/or teaching and found that you like at least one of those' (Harchol-Balter, 2014).  I personally "
                },
                {
                  bold: false,
                  underline: false,
                  italicize: false,
                  fontSize: 12,
                  font: "Times New Roman",
                  content: "do not like teaching"
                },
                {
                  bold: false,
                  underline: false,
                  italicize: false,
                  fontSize: 12,
                  font: "Times New Roman",
                  content: " or research and research is not exciting to me at all.  What I want to do to continue my education and training is to keep myself up to date on the latest technology through self-training and going to conferences whenever the opportunity arises.  In that sense, I will keep up to scratch with the people coming straight out of college with the new techniques and still gain experience in the work force.  If my company offers to send me to a graduate school, I might consider it, but I will be perfectly happy doing the work that my bachelor's degree will get me"
                }
              ]
            },
            {
              alignment: "left",
              spacing: 2,
              topIndent: 1,
              bottomIndent: 0,
              formatSections:
              [
                {
                  bold: false,
                  underline: false,
                  italicize: false,
                  fontSize: 12,
                  font: "Times New Roman",
                  content: "I do not plan on getting a Ph.D. at any point.  In the reading it says, 'Do not even think of applying for a Ph.D. if you have not tried research and/or teaching and found that you like at least one of those' (Harchol-Balter, 2014).  I personally do not like teaching or research and research is not exciting to me at all.  What I want to do to continue my education and training is to keep myself up to date on the latest technology through self-training and going to conferences whenever the opportunity arises.  In that sense, I will keep up to scratch with the people coming straight out of college with the new techniques and still gain experience in the work force.  If my company offers to send me to a graduate school, I might consider it, but I will be perfectly happy doing the work that my bachelor's degree will get me"
                }
              ]
            },
            {
              alignment: "left",
              spacing: 2,
              topIndent: 1,
              bottomIndent: 0,
              formatSections:
              [
                {
                  bold: false,
                  underline: false,
                  italicize: false,
                  fontSize: 12,
                  font: "Times New Roman",
                  content: "I do not plan on getting a Ph.D. at any point.  In the reading it says, 'Do not even think of applying for a Ph.D. if you have not tried research and/or teaching and found that you like at least one of those' (Harchol-Balter, 2014).  I personally "
                },
                {
                  bold: false,
                  underline: false,
                  italicize: false,
                  fontSize: 12,
                  font: "Times New Roman",
                  content: "do not like teaching"
                },
                {
                  bold: false,
                  underline: false,
                  italicize: false,
                  fontSize: 12,
                  font: "Times New Roman",
                  content: " or research and research is not exciting to me at all.  What I want to do to continue my education and training is to keep myself up to date on the latest technology through self-training and going to conferences whenever the opportunity arises.  In that sense, I will keep up to scratch with the people coming straight out of college with the new techniques and still gain experience in the work force.  If my company offers to send me to a graduate school, I might consider it, but I will be perfectly happy doing the work that my bachelor's degree will get me"
                }
              ]
            }		
          ]
        },
        {
          sectionLevel: 1,
          onOwnPage: false,
          includeLabel: true,
          label: {			
            labelText: "Section 2",
            font: "Times New Roman",
            fontSize: 12,
            bold: true,
            underline: false,
            italicize: false,
            alignment: "center",
            position: "lineBefore"
          },
          paragraphs: 
          [	
            {
              alignment: "left",
              spacing: 2,
              topIndent: 1,
              bottomIndent: 0,
              formatSections:
              [
                {
                  bold: false,
                  underline: false,
                  italicize: false,
                  fontSize: 12,
                  font: "Times New Roman",
                  content: "I do not plan on getting a Ph.D. at any point.  In the reading it says, 'Do not even think of applying for a Ph.D. if you have not tried research and/or teaching and found that you like at least one of those' (Harchol-Balter, 2014).  I personally "
                },
                {
                  bold: false,
                  underline: false,
                  italicize: false,
                  fontSize: 12,
                  font: "Times New Roman",
                  content: "do not like teaching"
                },
                {
                  bold: false,
                  underline: false,
                  italicize: false,
                  fontSize: 12,
                  font: "Times New Roman",
                  content: " or research and research is not exciting to me at all.  What I want to do to continue my education and training is to keep myself up to date on the latest technology through self-training and going to conferences whenever the opportunity arises.  In that sense, I will keep up to scratch with the people coming straight out of college with the new techniques and still gain experience in the work force.  If my company offers to send me to a graduate school, I might consider it, but I will be perfectly happy doing the work that my bachelor's degree will get me"
                }
              ]
            },
            {
              alignment: "left",
              spacing: 2,
              topIndent: 1,
              bottomIndent: 0,
              formatSections:
              [
                {
                  bold: false,
                  underline: false,
                  italicize: false,
                  fontSize: 12,
                  font: "Times New Roman",
                  content: "I do not plan on getting a Ph.D. at any point.  In the reading it says, 'Do not even think of applying for a Ph.D. if you have not tried research and/or teaching and found that you like at least one of those' (Harchol-Balter, 2014).  I personally do not like teaching or research and research is not exciting to me at all.  What I want to do to continue my education and training is to keep myself up to date on the latest technology through self-training and going to conferences whenever the opportunity arises.  In that sense, I will keep up to scratch with the people coming straight out of college with the new techniques and still gain experience in the work force.  If my company offers to send me to a graduate school, I might consider it, but I will be perfectly happy doing the work that my bachelor's degree will get me"
                }
              ]
            },
            {
              alignment: "left",
              spacing: 2,
              topIndent: 1,
              bottomIndent: 0,
              formatSections:
              [
                {
                  bold: false,
                  underline: false,
                  italicize: false,
                  fontSize: 12,
                  font: "Times New Roman",
                  content: "I do not plan on getting a Ph.D. at any point.  In the reading it says, 'Do not even think of applying for a Ph.D. if you have not tried research and/or teaching and found that you like at least one of those' (Harchol-Balter, 2014).  I personally "
                },
                {
                  bold: false,
                  underline: false,
                  italicize: false,
                  fontSize: 12,
                  font: "Times New Roman",
                  content: "do not like teaching"
                },
                {
                  bold: false,
                  underline: false,
                  italicize: false,
                  fontSize: 12,
                  font: "Times New Roman",
                  content: " or research and research is not exciting to me at all.  What I want to do to continue my education and training is to keep myself up to date on the latest technology through self-training and going to conferences whenever the opportunity arises.  In that sense, I will keep up to scratch with the people coming straight out of college with the new techniques and still gain experience in the work force.  If my company offers to send me to a graduate school, I might consider it, but I will be perfectly happy doing the work that my bachelor's degree will get me"
                }
              ]
            }		
          ]
        },
        {
          sectionLevel: 2,
          onOwnPage: false,
          includeLabel: true,
          label: {			
            labelText: "Subsection 1",
            font: "Times New Roman",
            fontSize: 12,
            bold: true,
            underline: false,
            italicize: false,
            alignment: "left",
            position: "lineBefore"
          },
          paragraphs: 
          [	
            {
              alignment: "left",
              spacing: 2,
              topIndent: 1,
              bottomIndent: 0,
              formatSections:
              [
                {
                  bold: false,
                  underline: false,
                  italicize: false,
                  fontSize: 12,
                  font: "Times New Roman",
                  content: "I do not plan on getting a Ph.D. at any point.  In the reading it says, 'Do not even think of applying for a Ph.D. if you have not tried research and/or teaching and found that you like at least one of those' (Harchol-Balter, 2014).  I personally "
                },
                {
                  bold: false,
                  underline: false,
                  italicize: false,
                  fontSize: 12,
                  font: "Times New Roman",
                  content: "do not like teaching"
                },
                {
                  bold: false,
                  underline: false,
                  italicize: false,
                  fontSize: 12,
                  font: "Times New Roman",
                  content: " or research and research is not exciting to me at all.  What I want to do to continue my education and training is to keep myself up to date on the latest technology through self-training and going to conferences whenever the opportunity arises.  In that sense, I will keep up to scratch with the people coming straight out of college with the new techniques and still gain experience in the work force.  If my company offers to send me to a graduate school, I might consider it, but I will be perfectly happy doing the work that my bachelor's degree will get me"
                }
              ]
            },
            {
              alignment: "left",
              spacing: 2,
              topIndent: 1,
              bottomIndent: 0,
              formatSections:
              [
                {
                  bold: false,
                  underline: false,
                  italicize: false,
                  fontSize: 12,
                  font: "Times New Roman",
                  content: "I do not plan on getting a Ph.D. at any point.  In the reading it says, 'Do not even think of applying for a Ph.D. if you have not tried research and/or teaching and found that you like at least one of those' (Harchol-Balter, 2014).  I personally do not like teaching or research and research is not exciting to me at all.  What I want to do to continue my education and training is to keep myself up to date on the latest technology through self-training and going to conferences whenever the opportunity arises.  In that sense, I will keep up to scratch with the people coming straight out of college with the new techniques and still gain experience in the work force.  If my company offers to send me to a graduate school, I might consider it, but I will be perfectly happy doing the work that my bachelor's degree will get me"
                }
              ]
            },
            {
              alignment: "left",
              spacing: 2,
              topIndent: 1,
              bottomIndent: 0,
              formatSections:
              [
                {
                  bold: false,
                  underline: false,
                  italicize: false,
                  fontSize: 12,
                  font: "Times New Roman",
                  content: "I do not plan on getting a Ph.D. at any point.  In the reading it says, 'Do not even think of applying for a Ph.D. if you have not tried research and/or teaching and found that you like at least one of those' (Harchol-Balter, 2014).  I personally "
                },
                {
                  bold: false,
                  underline: false,
                  italicize: false,
                  fontSize: 12,
                  font: "Times New Roman",
                  content: "do not like teaching"
                },
                {
                  bold: false,
                  underline: false,
                  italicize: false,
                  fontSize: 12,
                  font: "Times New Roman",
                  content: " or research and research is not exciting to me at all.  What I want to do to continue my education and training is to keep myself up to date on the latest technology through self-training and going to conferences whenever the opportunity arises.  In that sense, I will keep up to scratch with the people coming straight out of college with the new techniques and still gain experience in the work force.  If my company offers to send me to a graduate school, I might consider it, but I will be perfectly happy doing the work that my bachelor's degree will get me"
                }
              ]
            }		
          ]
        },
        {
          sectionLevel: 3,
          onOwnPage: false,
          includeLabel: true,
          label: {			
            labelText: "Subsubsection 1",
            font: "Times New Roman",
            fontSize: 12,
            bold: true,
            underline: false,
            italicize: false,
            alignment: "left",
            position: "inline"
          },
          paragraphs: 
          [	
            {
              alignment: "left",
              spacing: 2,
              topIndent: 1,
              bottomIndent: 0,
              formatSections:
              [
                {
                  bold: false,
                  underline: false,
                  italicize: false,
                  fontSize: 12,
                  font: "Times New Roman",
                  content: "I do not plan on getting a Ph.D. at any point.  In the reading it says, 'Do not even think of applying for a Ph.D. if you have not tried research and/or teaching and found that you like at least one of those' (Harchol-Balter, 2014).  I personally "
                },
                {
                  bold: false,
                  underline: false,
                  italicize: false,
                  fontSize: 12,
                  font: "Times New Roman",
                  content: "do not like teaching"
                },
                {
                  bold: false,
                  underline: false,
                  italicize: false,
                  fontSize: 12,
                  font: "Times New Roman",
                  content: " or research and research is not exciting to me at all.  What I want to do to continue my education and training is to keep myself up to date on the latest technology through self-training and going to conferences whenever the opportunity arises.  In that sense, I will keep up to scratch with the people coming straight out of college with the new techniques and still gain experience in the work force.  If my company offers to send me to a graduate school, I might consider it, but I will be perfectly happy doing the work that my bachelor's degree will get me"
                }
              ]
            },
            {
              alignment: "left",
              spacing: 2,
              topIndent: 1,
              bottomIndent: 0,
              formatSections:
              [
                {
                  bold: false,
                  underline: false,
                  italicize: false,
                  fontSize: 12,
                  font: "Times New Roman",
                  content: "I do not plan on getting a Ph.D. at any point.  In the reading it says, 'Do not even think of applying for a Ph.D. if you have not tried research and/or teaching and found that you like at least one of those' (Harchol-Balter, 2014).  I personally do not like teaching or research and research is not exciting to me at all.  What I want to do to continue my education and training is to keep myself up to date on the latest technology through self-training and going to conferences whenever the opportunity arises.  In that sense, I will keep up to scratch with the people coming straight out of college with the new techniques and still gain experience in the work force.  If my company offers to send me to a graduate school, I might consider it, but I will be perfectly happy doing the work that my bachelor's degree will get me"
                }
              ]
            },
            {
              alignment: "left",
              spacing: 2,
              topIndent: 1,
              bottomIndent: 0,
              formatSections:
              [
                {
                  bold: false,
                  underline: false,
                  italicize: false,
                  fontSize: 12,
                  font: "Times New Roman",
                  content: "I do not plan on getting a Ph.D. at any point.  In the reading it says, 'Do not even think of applying for a Ph.D. if you have not tried research and/or teaching and found that you like at least one of those' (Harchol-Balter, 2014).  I personally "
                },
                {
                  bold: false,
                  underline: false,
                  italicize: false,
                  fontSize: 12,
                  font: "Times New Roman",
                  content: "do not like teaching"
                },
                {
                  bold: false,
                  underline: false,
                  italicize: false,
                  fontSize: 12,
                  font: "Times New Roman",
                  content: " or research and research is not exciting to me at all.  What I want to do to continue my education and training is to keep myself up to date on the latest technology through self-training and going to conferences whenever the opportunity arises.  In that sense, I will keep up to scratch with the people coming straight out of college with the new techniques and still gain experience in the work force.  If my company offers to send me to a graduate school, I might consider it, but I will be perfectly happy doing the work that my bachelor's degree will get me"
                }
              ]
            }		
          ]
        },
        {
          sectionLevel: 2,
          onOwnPage: false,
          includeLabel: true,
          label: {			
            labelText: "Subsection 2",
            font: "Times New Roman",
            fontSize: 12,
            bold: true,
            underline: false,
            italicize: false,
            alignment: "left",
            position: "lineBefore"
          },
          paragraphs: 
          [	
            {
              alignment: "left",
              spacing: 2,
              topIndent: 1,
              bottomIndent: 0,
              formatSections:
              [
                {
                  bold: false,
                  underline: false,
                  italicize: false,
                  fontSize: 12,
                  font: "Times New Roman",
                  content: "I do not plan on getting a Ph.D. at any point.  In the reading it says, 'Do not even think of applying for a Ph.D. if you have not tried research and/or teaching and found that you like at least one of those' (Harchol-Balter, 2014).  I personally "
                },
                {
                  bold: false,
                  underline: false,
                  italicize: false,
                  fontSize: 12,
                  font: "Times New Roman",
                  content: "do not like teaching"
                },
                {
                  bold: false,
                  underline: false,
                  italicize: false,
                  fontSize: 12,
                  font: "Times New Roman",
                  content: " or research and research is not exciting to me at all.  What I want to do to continue my education and training is to keep myself up to date on the latest technology through self-training and going to conferences whenever the opportunity arises.  In that sense, I will keep up to scratch with the people coming straight out of college with the new techniques and still gain experience in the work force.  If my company offers to send me to a graduate school, I might consider it, but I will be perfectly happy doing the work that my bachelor's degree will get me"
                }
              ]
            },
            {
              alignment: "left",
              spacing: 2,
              topIndent: 1,
              bottomIndent: 0,
              formatSections:
              [
                {
                  bold: false,
                  underline: false,
                  italicize: false,
                  fontSize: 12,
                  font: "Times New Roman",
                  content: "I do not plan on getting a Ph.D. at any point.  In the reading it says, 'Do not even think of applying for a Ph.D. if you have not tried research and/or teaching and found that you like at least one of those' (Harchol-Balter, 2014).  I personally do not like teaching or research and research is not exciting to me at all.  What I want to do to continue my education and training is to keep myself up to date on the latest technology through self-training and going to conferences whenever the opportunity arises.  In that sense, I will keep up to scratch with the people coming straight out of college with the new techniques and still gain experience in the work force.  If my company offers to send me to a graduate school, I might consider it, but I will be perfectly happy doing the work that my bachelor's degree will get me"
                }
              ]
            },
            {
              alignment: "left",
              spacing: 2,
              topIndent: 1,
              bottomIndent: 0,
              formatSections:
              [
                {
                  bold: false,
                  underline: false,
                  italicize: false,
                  fontSize: 12,
                  font: "Times New Roman",
                  content: "I do not plan on getting a Ph.D. at any point.  In the reading it says, 'Do not even think of applying for a Ph.D. if you have not tried research and/or teaching and found that you like at least one of those' (Harchol-Balter, 2014).  I personally "
                },
                {
                  bold: false,
                  underline: false,
                  italicize: false,
                  fontSize: 12,
                  font: "Times New Roman",
                  content: "do not like teaching"
                },
                {
                  bold: false,
                  underline: false,
                  italicize: false,
                  fontSize: 12,
                  font: "Times New Roman",
                  content: " or research and research is not exciting to me at all.  What I want to do to continue my education and training is to keep myself up to date on the latest technology through self-training and going to conferences whenever the opportunity arises.  In that sense, I will keep up to scratch with the people coming straight out of college with the new techniques and still gain experience in the work force.  If my company offers to send me to a graduate school, I might consider it, but I will be perfectly happy doing the work that my bachelor's degree will get me"
                }
              ]
            }		
          ]
        },
        {
          sectionLevel: 3,
          onOwnPage: false,
          includeLabel: true,
          label: {			
            labelText: "Subsubsection 1",
            font: "Times New Roman",
            fontSize: 12,
            bold: true,
            underline: false,
            italicize: false,
            alignment: "left",
            position: "inline"
          },
          paragraphs: 
          [	
            {
              alignment: "left",
              spacing: 2,
              topIndent: 1,
              bottomIndent: 0,
              formatSections:
              [
                {
                  bold: false,
                  underline: false,
                  italicize: false,
                  fontSize: 12,
                  font: "Times New Roman",
                  content: "I do not plan on getting a Ph.D. at any point.  In the reading it says, 'Do not even think of applying for a Ph.D. if you have not tried research and/or teaching and found that you like at least one of those' (Harchol-Balter, 2014).  I personally "
                },
                {
                  bold: false,
                  underline: false,
                  italicize: false,
                  fontSize: 12,
                  font: "Times New Roman",
                  content: "do not like teaching"
                },
                {
                  bold: false,
                  underline: false,
                  italicize: false,
                  fontSize: 12,
                  font: "Times New Roman",
                  content: " or research and research is not exciting to me at all.  What I want to do to continue my education and training is to keep myself up to date on the latest technology through self-training and going to conferences whenever the opportunity arises.  In that sense, I will keep up to scratch with the people coming straight out of college with the new techniques and still gain experience in the work force.  If my company offers to send me to a graduate school, I might consider it, but I will be perfectly happy doing the work that my bachelor's degree will get me"
                }
              ]
            },
            {
              alignment: "left",
              spacing: 2,
              topIndent: 1,
              bottomIndent: 0,
              formatSections:
              [
                {
                  bold: false,
                  underline: false,
                  italicize: false,
                  fontSize: 12,
                  font: "Times New Roman",
                  content: "I do not plan on getting a Ph.D. at any point.  In the reading it says, 'Do not even think of applying for a Ph.D. if you have not tried research and/or teaching and found that you like at least one of those' (Harchol-Balter, 2014).  I personally do not like teaching or research and research is not exciting to me at all.  What I want to do to continue my education and training is to keep myself up to date on the latest technology through self-training and going to conferences whenever the opportunity arises.  In that sense, I will keep up to scratch with the people coming straight out of college with the new techniques and still gain experience in the work force.  If my company offers to send me to a graduate school, I might consider it, but I will be perfectly happy doing the work that my bachelor's degree will get me"
                }
              ]
            },
            {
              alignment: "left",
              spacing: 2,
              topIndent: 1,
              bottomIndent: 0,
              formatSections:
              [
                {
                  bold: false,
                  underline: false,
                  italicize: false,
                  fontSize: 12,
                  font: "Times New Roman",
                  content: "I do not plan on getting a Ph.D. at any point.  In the reading it says, 'Do not even think of applying for a Ph.D. if you have not tried research and/or teaching and found that you like at least one of those' (Harchol-Balter, 2014).  I personally "
                },
                {
                  bold: false,
                  underline: false,
                  italicize: false,
                  fontSize: 12,
                  font: "Times New Roman",
                  content: "do not like teaching"
                },
                {
                  bold: false,
                  underline: false,
                  italicize: false,
                  fontSize: 12,
                  font: "Times New Roman",
                  content: " or research and research is not exciting to me at all.  What I want to do to continue my education and training is to keep myself up to date on the latest technology through self-training and going to conferences whenever the opportunity arises.  In that sense, I will keep up to scratch with the people coming straight out of college with the new techniques and still gain experience in the work force.  If my company offers to send me to a graduate school, I might consider it, but I will be perfectly happy doing the work that my bachelor's degree will get me"
                }
              ]
            }		
          ]
        },
        {
          sectionLevel: 3,
          onOwnPage: false,
          includeLabel: true,
          label: {			
            labelText: "Subsubsection 2",
            font: "Times New Roman",
            fontSize: 12,
            bold: true,
            underline: false,
            italicize: false,
            alignment: "left",
            position: "inline"
          },
          paragraphs: 
          [	
            {
              alignment: "left",
              spacing: 2,
              topIndent: 1,
              bottomIndent: 0,
              formatSections:
              [
                {
                  bold: false,
                  underline: false,
                  italicize: false,
                  fontSize: 12,
                  font: "Times New Roman",
                  content: "I do not plan on getting a Ph.D. at any point.  In the reading it says, 'Do not even think of applying for a Ph.D. if you have not tried research and/or teaching and found that you like at least one of those' (Harchol-Balter, 2014).  I personally "
                },
                {
                  bold: false,
                  underline: false,
                  italicize: false,
                  fontSize: 12,
                  font: "Times New Roman",
                  content: "do not like teaching"
                },
                {
                  bold: false,
                  underline: false,
                  italicize: false,
                  fontSize: 12,
                  font: "Times New Roman",
                  content: " or research and research is not exciting to me at all.  What I want to do to continue my education and training is to keep myself up to date on the latest technology through self-training and going to conferences whenever the opportunity arises.  In that sense, I will keep up to scratch with the people coming straight out of college with the new techniques and still gain experience in the work force.  If my company offers to send me to a graduate school, I might consider it, but I will be perfectly happy doing the work that my bachelor's degree will get me"
                }
              ]
            },
            {
              alignment: "left",
              spacing: 2,
              topIndent: 1,
              bottomIndent: 0,
              formatSections:
              [
                {
                  bold: false,
                  underline: false,
                  italicize: false,
                  fontSize: 12,
                  font: "Times New Roman",
                  content: "I do not plan on getting a Ph.D. at any point.  In the reading it says, 'Do not even think of applying for a Ph.D. if you have not tried research and/or teaching and found that you like at least one of those' (Harchol-Balter, 2014).  I personally do not like teaching or research and research is not exciting to me at all.  What I want to do to continue my education and training is to keep myself up to date on the latest technology through self-training and going to conferences whenever the opportunity arises.  In that sense, I will keep up to scratch with the people coming straight out of college with the new techniques and still gain experience in the work force.  If my company offers to send me to a graduate school, I might consider it, but I will be perfectly happy doing the work that my bachelor's degree will get me"
                }
              ]
            },
            {
              alignment: "left",
              spacing: 2,
              topIndent: 1,
              bottomIndent: 0,
              formatSections:
              [
                {
                  bold: false,
                  underline: false,
                  italicize: false,
                  fontSize: 12,
                  font: "Times New Roman",
                  content: "I do not plan on getting a Ph.D. at any point.  In the reading it says, 'Do not even think of applying for a Ph.D. if you have not tried research and/or teaching and found that you like at least one of those' (Harchol-Balter, 2014).  I personally "
                },
                {
                  bold: false,
                  underline: false,
                  italicize: false,
                  fontSize: 12,
                  font: "Times New Roman",
                  content: "do not like teaching"
                },
                {
                  bold: false,
                  underline: false,
                  italicize: false,
                  fontSize: 12,
                  font: "Times New Roman",
                  content: " or research and research is not exciting to me at all.  What I want to do to continue my education and training is to keep myself up to date on the latest technology through self-training and going to conferences whenever the opportunity arises.  In that sense, I will keep up to scratch with the people coming straight out of college with the new techniques and still gain experience in the work force.  If my company offers to send me to a graduate school, I might consider it, but I will be perfectly happy doing the work that my bachelor's degree will get me"
                }
              ]
            }		
          ]
        },
        {
          sectionLevel: 1,
          onOwnPage: false,
          includeLabel: true,
          label: {			
            labelText: "Section 3",
            font: "Times New Roman",
            fontSize: 12,
            bold: true,
            underline: false,
            italicize: false,
            alignment: "center",
            position: "lineBefore"
          },
          paragraphs: 
          [	
            {
              alignment: "left",
              spacing: 2,
              topIndent: 1,
              bottomIndent: 0,
              formatSections:
              [
                {
                  bold: false,
                  underline: false,
                  italicize: false,
                  fontSize: 12,
                  font: "Times New Roman",
                  content: "I do not plan on getting a Ph.D. at any point.  In the reading it says, 'Do not even think of applying for a Ph.D. if you have not tried research and/or teaching and found that you like at least one of those' (Harchol-Balter, 2014).  I personally "
                },
                {
                  bold: false,
                  underline: false,
                  italicize: false,
                  fontSize: 12,
                  font: "Times New Roman",
                  content: "do not like teaching"
                },
                {
                  bold: false,
                  underline: false,
                  italicize: false,
                  fontSize: 12,
                  font: "Times New Roman",
                  content: " or research and research is not exciting to me at all.  What I want to do to continue my education and training is to keep myself up to date on the latest technology through self-training and going to conferences whenever the opportunity arises.  In that sense, I will keep up to scratch with the people coming straight out of college with the new techniques and still gain experience in the work force.  If my company offers to send me to a graduate school, I might consider it, but I will be perfectly happy doing the work that my bachelor's degree will get me"
                }
              ]
            },
            {
              alignment: "left",
              spacing: 2,
              topIndent: 1,
              bottomIndent: 0,
              formatSections:
              [
                {
                  bold: false,
                  underline: false,
                  italicize: false,
                  fontSize: 12,
                  font: "Times New Roman",
                  content: "I do not plan on getting a Ph.D. at any point.  In the reading it says, 'Do not even think of applying for a Ph.D. if you have not tried research and/or teaching and found that you like at least one of those' (Harchol-Balter, 2014).  I personally do not like teaching or research and research is not exciting to me at all.  What I want to do to continue my education and training is to keep myself up to date on the latest technology through self-training and going to conferences whenever the opportunity arises.  In that sense, I will keep up to scratch with the people coming straight out of college with the new techniques and still gain experience in the work force.  If my company offers to send me to a graduate school, I might consider it, but I will be perfectly happy doing the work that my bachelor's degree will get me"
                }
              ]
            },
            {
              alignment: "left",
              spacing: 2,
              topIndent: 1,
              bottomIndent: 0,
              formatSections:
              [
                {
                  bold: false,
                  underline: false,
                  italicize: false,
                  fontSize: 12,
                  font: "Times New Roman",
                  content: "I do not plan on getting a Ph.D. at any point.  In the reading it says, 'Do not even think of applying for a Ph.D. if you have not tried research and/or teaching and found that you like at least one of those' (Harchol-Balter, 2014).  I personally "
                },
                {
                  bold: false,
                  underline: false,
                  italicize: false,
                  fontSize: 12,
                  font: "Times New Roman",
                  content: "do not like teaching"
                },
                {
                  bold: false,
                  underline: false,
                  italicize: false,
                  fontSize: 12,
                  font: "Times New Roman",
                  content: " or research and research is not exciting to me at all.  What I want to do to continue my education and training is to keep myself up to date on the latest technology through self-training and going to conferences whenever the opportunity arises.  In that sense, I will keep up to scratch with the people coming straight out of college with the new techniques and still gain experience in the work force.  If my company offers to send me to a graduate school, I might consider it, but I will be perfectly happy doing the work that my bachelor's degree will get me"
                }
              ]
            }		
          ]
        },
        {
          sectionLevel: 2,
          onOwnPage: false,
          includeLabel: true,
          label: {			
            labelText: "Subsection 1",
            font: "Times New Roman",
            fontSize: 12,
            bold: true,
            underline: false,
            italicize: false,
            alignment: "left",
            position: "lineBefore"
          },
          paragraphs: 
          [	
            {
              alignment: "left",
              spacing: 2,
              topIndent: 1,
              bottomIndent: 0,
              formatSections:
              [
                {
                  bold: false,
                  underline: false,
                  italicize: false,
                  fontSize: 12,
                  font: "Times New Roman",
                  content: "I do not plan on getting a Ph.D. at any point.  In the reading it says, 'Do not even think of applying for a Ph.D. if you have not tried research and/or teaching and found that you like at least one of those' (Harchol-Balter, 2014).  I personally "
                },
                {
                  bold: false,
                  underline: false,
                  italicize: false,
                  fontSize: 12,
                  font: "Times New Roman",
                  content: "do not like teaching"
                },
                {
                  bold: false,
                  underline: false,
                  italicize: false,
                  fontSize: 12,
                  font: "Times New Roman",
                  content: " or research and research is not exciting to me at all.  What I want to do to continue my education and training is to keep myself up to date on the latest technology through self-training and going to conferences whenever the opportunity arises.  In that sense, I will keep up to scratch with the people coming straight out of college with the new techniques and still gain experience in the work force.  If my company offers to send me to a graduate school, I might consider it, but I will be perfectly happy doing the work that my bachelor's degree will get me"
                }
              ]
            },
            {
              alignment: "left",
              spacing: 2,
              topIndent: 1,
              bottomIndent: 0,
              formatSections:
              [
                {
                  bold: false,
                  underline: false,
                  italicize: false,
                  fontSize: 12,
                  font: "Times New Roman",
                  content: "I do not plan on getting a Ph.D. at any point.  In the reading it says, 'Do not even think of applying for a Ph.D. if you have not tried research and/or teaching and found that you like at least one of those' (Harchol-Balter, 2014).  I personally do not like teaching or research and research is not exciting to me at all.  What I want to do to continue my education and training is to keep myself up to date on the latest technology through self-training and going to conferences whenever the opportunity arises.  In that sense, I will keep up to scratch with the people coming straight out of college with the new techniques and still gain experience in the work force.  If my company offers to send me to a graduate school, I might consider it, but I will be perfectly happy doing the work that my bachelor's degree will get me"
                }
              ]
            },
            {
              alignment: "left",
              spacing: 2,
              topIndent: 1,
              bottomIndent: 0,
              formatSections:
              [
                {
                  bold: false,
                  underline: false,
                  italicize: false,
                  fontSize: 12,
                  font: "Times New Roman",
                  content: "I do not plan on getting a Ph.D. at any point.  In the reading it says, 'Do not even think of applying for a Ph.D. if you have not tried research and/or teaching and found that you like at least one of those' (Harchol-Balter, 2014).  I personally "
                },
                {
                  bold: false,
                  underline: false,
                  italicize: false,
                  fontSize: 12,
                  font: "Times New Roman",
                  content: "do not like teaching"
                },
                {
                  bold: false,
                  underline: false,
                  italicize: false,
                  fontSize: 12,
                  font: "Times New Roman",
                  content: " or research and research is not exciting to me at all.  What I want to do to continue my education and training is to keep myself up to date on the latest technology through self-training and going to conferences whenever the opportunity arises.  In that sense, I will keep up to scratch with the people coming straight out of college with the new techniques and still gain experience in the work force.  If my company offers to send me to a graduate school, I might consider it, but I will be perfectly happy doing the work that my bachelor's degree will get me"
                }
              ]
            }		
          ]
        },
        {
          sectionLevel: 3,
          onOwnPage: false,
          includeLabel: true,
          label: {			
            labelText: "Subsubsection 1",
            font: "Times New Roman",
            fontSize: 12,
            bold: true,
            underline: false,
            italicize: false,
            alignment: "left",
            position: "inline"
          },
          paragraphs: 
          [	
            {
              alignment: "left",
              spacing: 2,
              topIndent: 1,
              bottomIndent: 0,
              formatSections:
              [
                {
                  bold: false,
                  underline: false,
                  italicize: false,
                  fontSize: 12,
                  font: "Times New Roman",
                  content: "I do not plan on getting a Ph.D. at any point.  In the reading it says, 'Do not even think of applying for a Ph.D. if you have not tried research and/or teaching and found that you like at least one of those' (Harchol-Balter, 2014).  I personally "
                },
                {
                  bold: false,
                  underline: false,
                  italicize: false,
                  fontSize: 12,
                  font: "Times New Roman",
                  content: "do not like teaching"
                },
                {
                  bold: false,
                  underline: false,
                  italicize: false,
                  fontSize: 12,
                  font: "Times New Roman",
                  content: " or research and research is not exciting to me at all.  What I want to do to continue my education and training is to keep myself up to date on the latest technology through self-training and going to conferences whenever the opportunity arises.  In that sense, I will keep up to scratch with the people coming straight out of college with the new techniques and still gain experience in the work force.  If my company offers to send me to a graduate school, I might consider it, but I will be perfectly happy doing the work that my bachelor's degree will get me"
                }
              ]
            },
            {
              alignment: "left",
              spacing: 2,
              topIndent: 1,
              bottomIndent: 0,
              formatSections:
              [
                {
                  bold: false,
                  underline: false,
                  italicize: false,
                  fontSize: 12,
                  font: "Times New Roman",
                  content: "I do not plan on getting a Ph.D. at any point.  In the reading it says, 'Do not even think of applying for a Ph.D. if you have not tried research and/or teaching and found that you like at least one of those' (Harchol-Balter, 2014).  I personally do not like teaching or research and research is not exciting to me at all.  What I want to do to continue my education and training is to keep myself up to date on the latest technology through self-training and going to conferences whenever the opportunity arises.  In that sense, I will keep up to scratch with the people coming straight out of college with the new techniques and still gain experience in the work force.  If my company offers to send me to a graduate school, I might consider it, but I will be perfectly happy doing the work that my bachelor's degree will get me"
                }
              ]
            },
            {
              alignment: "left",
              spacing: 2,
              topIndent: 1,
              bottomIndent: 0,
              formatSections:
              [
                {
                  bold: false,
                  underline: false,
                  italicize: false,
                  fontSize: 12,
                  font: "Times New Roman",
                  content: "I do not plan on getting a Ph.D. at any point.  In the reading it says, 'Do not even think of applying for a Ph.D. if you have not tried research and/or teaching and found that you like at least one of those' (Harchol-Balter, 2014).  I personally "
                },
                {
                  bold: false,
                  underline: false,
                  italicize: false,
                  fontSize: 12,
                  font: "Times New Roman",
                  content: "do not like teaching"
                },
                {
                  bold: false,
                  underline: false,
                  italicize: false,
                  fontSize: 12,
                  font: "Times New Roman",
                  content: " or research and research is not exciting to me at all.  What I want to do to continue my education and training is to keep myself up to date on the latest technology through self-training and going to conferences whenever the opportunity arises.  In that sense, I will keep up to scratch with the people coming straight out of college with the new techniques and still gain experience in the work force.  If my company offers to send me to a graduate school, I might consider it, but I will be perfectly happy doing the work that my bachelor's degree will get me"
                }
              ]
            }		
          ]
        },
        {
          sectionLevel: 2,
          onOwnPage: false,
          includeLabel: true,
          label: {			
            labelText: "Subsection 2",
            font: "Times New Roman",
            fontSize: 12,
            bold: true,
            underline: false,
            italicize: false,
            alignment: "left",
            position: "lineBefore"
          },
          paragraphs: 
          [	
            {
              alignment: "left",
              spacing: 2,
              topIndent: 1,
              bottomIndent: 0,
              formatSections:
              [
                {
                  bold: false,
                  underline: false,
                  italicize: false,
                  fontSize: 12,
                  font: "Times New Roman",
                  content: "I do not plan on getting a Ph.D. at any point.  In the reading it says, 'Do not even think of applying for a Ph.D. if you have not tried research and/or teaching and found that you like at least one of those' (Harchol-Balter, 2014).  I personally "
                },
                {
                  bold: false,
                  underline: false,
                  italicize: false,
                  fontSize: 12,
                  font: "Times New Roman",
                  content: "do not like teaching"
                },
                {
                  bold: false,
                  underline: false,
                  italicize: false,
                  fontSize: 12,
                  font: "Times New Roman",
                  content: " or research and research is not exciting to me at all.  What I want to do to continue my education and training is to keep myself up to date on the latest technology through self-training and going to conferences whenever the opportunity arises.  In that sense, I will keep up to scratch with the people coming straight out of college with the new techniques and still gain experience in the work force.  If my company offers to send me to a graduate school, I might consider it, but I will be perfectly happy doing the work that my bachelor's degree will get me"
                }
              ]
            },
            {
              alignment: "left",
              spacing: 2,
              topIndent: 1,
              bottomIndent: 0,
              formatSections:
              [
                {
                  bold: false,
                  underline: false,
                  italicize: false,
                  fontSize: 12,
                  font: "Times New Roman",
                  content: "I do not plan on getting a Ph.D. at any point.  In the reading it says, 'Do not even think of applying for a Ph.D. if you have not tried research and/or teaching and found that you like at least one of those' (Harchol-Balter, 2014).  I personally do not like teaching or research and research is not exciting to me at all.  What I want to do to continue my education and training is to keep myself up to date on the latest technology through self-training and going to conferences whenever the opportunity arises.  In that sense, I will keep up to scratch with the people coming straight out of college with the new techniques and still gain experience in the work force.  If my company offers to send me to a graduate school, I might consider it, but I will be perfectly happy doing the work that my bachelor's degree will get me"
                }
              ]
            },
            {
              alignment: "left",
              spacing: 2,
              topIndent: 1,
              bottomIndent: 0,
              formatSections:
              [
                {
                  bold: false,
                  underline: false,
                  italicize: false,
                  fontSize: 12,
                  font: "Times New Roman",
                  content: "I do not plan on getting a Ph.D. at any point.  In the reading it says, 'Do not even think of applying for a Ph.D. if you have not tried research and/or teaching and found that you like at least one of those' (Harchol-Balter, 2014).  I personally "
                },
                {
                  bold: false,
                  underline: false,
                  italicize: false,
                  fontSize: 12,
                  font: "Times New Roman",
                  content: "do not like teaching"
                },
                {
                  bold: false,
                  underline: false,
                  italicize: false,
                  fontSize: 12,
                  font: "Times New Roman",
                  content: " or research and research is not exciting to me at all.  What I want to do to continue my education and training is to keep myself up to date on the latest technology through self-training and going to conferences whenever the opportunity arises.  In that sense, I will keep up to scratch with the people coming straight out of college with the new techniques and still gain experience in the work force.  If my company offers to send me to a graduate school, I might consider it, but I will be perfectly happy doing the work that my bachelor's degree will get me"
                }
              ]
            }		
          ]
        },
        {
          sectionLevel: 3,
          onOwnPage: false,
          includeLabel: true,
          label: {			
            labelText: "Subsubsection 1",
            font: "Times New Roman",
            fontSize: 12,
            bold: true,
            underline: false,
            italicize: false,
            alignment: "left",
            position: "inline"
          },
          paragraphs: 
          [	
            {
              alignment: "left",
              spacing: 2,
              topIndent: 1,
              bottomIndent: 0,
              formatSections:
              [
                {
                  bold: false,
                  underline: false,
                  italicize: false,
                  fontSize: 12,
                  font: "Times New Roman",
                  content: "I do not plan on getting a Ph.D. at any point.  In the reading it says, 'Do not even think of applying for a Ph.D. if you have not tried research and/or teaching and found that you like at least one of those' (Harchol-Balter, 2014).  I personally "
                },
                {
                  bold: false,
                  underline: false,
                  italicize: false,
                  fontSize: 12,
                  font: "Times New Roman",
                  content: "do not like teaching"
                },
                {
                  bold: false,
                  underline: false,
                  italicize: false,
                  fontSize: 12,
                  font: "Times New Roman",
                  content: " or research and research is not exciting to me at all.  What I want to do to continue my education and training is to keep myself up to date on the latest technology through self-training and going to conferences whenever the opportunity arises.  In that sense, I will keep up to scratch with the people coming straight out of college with the new techniques and still gain experience in the work force.  If my company offers to send me to a graduate school, I might consider it, but I will be perfectly happy doing the work that my bachelor's degree will get me"
                }
              ]
            },
            {
              alignment: "left",
              spacing: 2,
              topIndent: 1,
              bottomIndent: 0,
              formatSections:
              [
                {
                  bold: false,
                  underline: false,
                  italicize: false,
                  fontSize: 12,
                  font: "Times New Roman",
                  content: "I do not plan on getting a Ph.D. at any point.  In the reading it says, 'Do not even think of applying for a Ph.D. if you have not tried research and/or teaching and found that you like at least one of those' (Harchol-Balter, 2014).  I personally do not like teaching or research and research is not exciting to me at all.  What I want to do to continue my education and training is to keep myself up to date on the latest technology through self-training and going to conferences whenever the opportunity arises.  In that sense, I will keep up to scratch with the people coming straight out of college with the new techniques and still gain experience in the work force.  If my company offers to send me to a graduate school, I might consider it, but I will be perfectly happy doing the work that my bachelor's degree will get me"
                }
              ]
            },
            {
              alignment: "left",
              spacing: 2,
              topIndent: 1,
              bottomIndent: 0,
              formatSections:
              [
                {
                  bold: false,
                  underline: false,
                  italicize: false,
                  fontSize: 12,
                  font: "Times New Roman",
                  content: "I do not plan on getting a Ph.D. at any point.  In the reading it says, 'Do not even think of applying for a Ph.D. if you have not tried research and/or teaching and found that you like at least one of those' (Harchol-Balter, 2014).  I personally "
                },
                {
                  bold: false,
                  underline: false,
                  italicize: false,
                  fontSize: 12,
                  font: "Times New Roman",
                  content: "do not like teaching"
                },
                {
                  bold: false,
                  underline: false,
                  italicize: false,
                  fontSize: 12,
                  font: "Times New Roman",
                  content: " or research and research is not exciting to me at all.  What I want to do to continue my education and training is to keep myself up to date on the latest technology through self-training and going to conferences whenever the opportunity arises.  In that sense, I will keep up to scratch with the people coming straight out of college with the new techniques and still gain experience in the work force.  If my company offers to send me to a graduate school, I might consider it, but I will be perfectly happy doing the work that my bachelor's degree will get me"
                }
              ]
            }		
          ]
        },
        {
          sectionLevel: 3,
          onOwnPage: false,
          includeLabel: true,
          label: {			
            labelText: "Subsubsection 2",
            font: "Times New Roman",
            fontSize: 12,
            bold: true,
            underline: false,
            italicize: false,
            alignment: "left",
            position: "inline"
          },
          paragraphs: 
          [	
            {
              alignment: "left",
              spacing: 2,
              topIndent: 1,
              bottomIndent: 0,
              formatSections:
              [
                {
                  bold: false,
                  underline: false,
                  italicize: false,
                  fontSize: 12,
                  font: "Times New Roman",
                  content: "I do not plan on getting a Ph.D. at any point.  In the reading it says, 'Do not even think of applying for a Ph.D. if you have not tried research and/or teaching and found that you like at least one of those' (Harchol-Balter, 2014).  I personally "
                },
                {
                  bold: false,
                  underline: false,
                  italicize: false,
                  fontSize: 12,
                  font: "Times New Roman",
                  content: "do not like teaching"
                },
                {
                  bold: false,
                  underline: false,
                  italicize: false,
                  fontSize: 12,
                  font: "Times New Roman",
                  content: " or research and research is not exciting to me at all.  What I want to do to continue my education and training is to keep myself up to date on the latest technology through self-training and going to conferences whenever the opportunity arises.  In that sense, I will keep up to scratch with the people coming straight out of college with the new techniques and still gain experience in the work force.  If my company offers to send me to a graduate school, I might consider it, but I will be perfectly happy doing the work that my bachelor's degree will get me"
                }
              ]
            },
            {
              alignment: "left",
              spacing: 2,
              topIndent: 1,
              bottomIndent: 0,
              formatSections:
              [
                {
                  bold: false,
                  underline: false,
                  italicize: false,
                  fontSize: 12,
                  font: "Times New Roman",
                  content: "I do not plan on getting a Ph.D. at any point.  In the reading it says, 'Do not even think of applying for a Ph.D. if you have not tried research and/or teaching and found that you like at least one of those' (Harchol-Balter, 2014).  I personally do not like teaching or research and research is not exciting to me at all.  What I want to do to continue my education and training is to keep myself up to date on the latest technology through self-training and going to conferences whenever the opportunity arises.  In that sense, I will keep up to scratch with the people coming straight out of college with the new techniques and still gain experience in the work force.  If my company offers to send me to a graduate school, I might consider it, but I will be perfectly happy doing the work that my bachelor's degree will get me"
                }
              ]
            },
            {
              alignment: "left",
              spacing: 2,
              topIndent: 1,
              bottomIndent: 0,
              formatSections:
              [
                {
                  bold: false,
                  underline: false,
                  italicize: false,
                  fontSize: 12,
                  font: "Times New Roman",
                  content: "I do not plan on getting a Ph.D. at any point.  In the reading it says, 'Do not even think of applying for a Ph.D. if you have not tried research and/or teaching and found that you like at least one of those' (Harchol-Balter, 2014).  I personally "
                },
                {
                  bold: false,
                  underline: false,
                  italicize: false,
                  fontSize: 12,
                  font: "Times New Roman",
                  content: "do not like teaching"
                },
                {
                  bold: false,
                  underline: false,
                  italicize: false,
                  fontSize: 12,
                  font: "Times New Roman",
                  content: " or research and research is not exciting to me at all.  What I want to do to continue my education and training is to keep myself up to date on the latest technology through self-training and going to conferences whenever the opportunity arises.  In that sense, I will keep up to scratch with the people coming straight out of college with the new techniques and still gain experience in the work force.  If my company offers to send me to a graduate school, I might consider it, but I will be perfectly happy doing the work that my bachelor's degree will get me"
                }
              ]
            }		
          ]
        }
      ]		
    },
    conclusion: {
      onOwnPage: true,
      includeLabel: true,
      label: {			
        labelText: "Conclusion",
        font: "Times New Roman",
        fontSize: 12,
        bold: true,
        underline: false,
        italicize: false,
        alignment: "center",
        position: "lineBefore"
      },
      paragraphs: 
      [	
        {
          alignment: "left",
          spacing: 2,
          topIndent: 1,
          bottomIndent: 0,
          formatSections:
          [
            {
              bold: false,
              underline: false,
              italicize: false,
              fontSize: 12,
              font: "Times New Roman",
              content: "I do not plan on getting a Ph.D. at any point.  In the reading it says, 'Do not even think of applying for a Ph.D. if you have not tried research and/or teaching and found that you like at least one of those' (Harchol-Balter, 2014).  I personally "
            },
            {
              bold: false,
              underline: false,
              italicize: false,
              fontSize: 12,
              font: "Times New Roman",
              content: "do not like teaching"
            },
            {
              bold: false,
              underline: false,
              italicize: false,
              fontSize: 12,
              font: "Times New Roman",
              content: " or research and research is not exciting to me at all.  What I want to do to continue my education and training is to keep myself up to date on the latest technology through self-training and going to conferences whenever the opportunity arises.  In that sense, I will keep up to scratch with the people coming straight out of college with the new techniques and still gain experience in the work force.  If my company offers to send me to a graduate school, I might consider it, but I will be perfectly happy doing the work that my bachelor's degree will get me"
            }
          ]
        },
        {
          alignment: "left",
          spacing: 2,
          topIndent: 1,
          bottomIndent: 0,
          formatSections:
          [
            {
              bold: false,
              underline: false,
              italicize: false,
              fontSize: 12,
              font: "Times New Roman",
              content: "I do not plan on getting a Ph.D. at any point.  In the reading it says, 'Do not even think of applying for a Ph.D. if you have not tried research and/or teaching and found that you like at least one of those' (Harchol-Balter, 2014).  I personally do not like teaching or research and research is not exciting to me at all.  What I want to do to continue my education and training is to keep myself up to date on the latest technology through self-training and going to conferences whenever the opportunity arises.  In that sense, I will keep up to scratch with the people coming straight out of college with the new techniques and still gain experience in the work force.  If my company offers to send me to a graduate school, I might consider it, but I will be perfectly happy doing the work that my bachelor's degree will get me"
            }
          ]
        }	
      ]
    },	
    references: {
      onOwnPage: true,
      includeLabel: true,
      alignment: "left",
      topIndent: 0,
      bottomIndent: 1,
      fontSize: 12,
      font: "Times New Roman",
      spacing: 2,
      label: {			
        labelText: "References",
        font: "Times New Roman",
        fontSize: 12,
        bold: true,
        underline: false,
        italicize: false,
        alignment: "center"
      },	
      citations: [
        {
          keyData: "Title",
          fields: [
            {
              name: "Author",
              value: "Beagley, J. A.",
              bold: false,
              underline: false,
              italicize: false,
              inQuotes: false,
              inParens: false
            },
            {
              name: "Title",
              value: "My Awesome Book",
              underline: false,
              italicize: false,
              inQuotes: true,
              inParens: false
            },
            {
              name: "Publication Date",
              value: "2017",
              underline: false,
              italicize: false,
              inQuotes: false,
              inParens: true
            }
          ],
          inText: "(Beagley, 2017)",
          quotations: [
            {
              content: "I am awesome",
              block: false
            },
            {
              content: "I am awesome I am awesome I am awesome I am awesome I am awesome I am awesome I am awesome I am awesome I am awesome I am awesome I am awesome I am awesome I am awesome I am awesome",
              block: true
            }
          ]
        },
        {
          keyData: "Title",
          fields: [
            {
              name: "Author",
              value: "Beagley, N. P.",
              bold: false,
              underline: false,
              italicize: false,
              inQuotes: false,
              inParens: false
            },
            {
              name: "Title",
              value: "My Awesomer Book",
              underline: false,
              italicize: false,
              inQuotes: true,
              inParens: false
            },
            {
              name: "Publication Date",
              value: "2018",
              underline: false,
              italicize: false,
              inQuotes: false,
              inParens: true
            }
          ],
          inText: "(Beagley, 2018)",
          quotations: [
            {
              content: "I am awesomest",
              block: false
            },
            {
              content: "I am awesome I am awesomest I am awesome I am awesome I am awesome I am awesome I am awesome I am awesomest I am awesome I am awesome I am awesome I am awesome I am awesome I am awesomest",
              block: true
            }
          ]
        }
      ]
    }
  }
}