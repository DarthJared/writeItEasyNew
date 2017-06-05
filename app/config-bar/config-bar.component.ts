import { Component, OnChanges, Output, EventEmitter, OnInit } from "@angular/core";
import { ConfigOptionService } from "./../services/config-options.service";
import { FontsService } from "./../services/fonts.service";

@Component({
   selector: 'config-bar',
   templateUrl: './config-bar/config-bar.component.html',
   styleUrls: ['./config-bar/config-bar.component.css'],
   providers: [ConfigOptionService, FontsService]
})

export class ConfigBar implements OnChanges, OnInit {
  @Output() configObj: EventEmitter<string> = new EventEmitter<string>();
  sections: any = [];
  subsections: any = [];
  apaMla: string= "APA";

  paperSettings: any = {};

  constructor(private configOptions: ConfigOptionService, private fontsService: FontsService) { 
    this.paperSettings = this.configOptions.paperSettings;    
    // console.log("started");
  }  

  ngOnInit() {
    this.sendConfigObj();
  }

  getOrderedInfo(info) {
    let ordered = [];
    for (let i = 0; i < info.length; i++) {
      for (let j = 0; j < info.length; j++) {
        if (info[j].index == i) {
          ordered.push(info[j]);
        }
      }
    }
    return ordered;
  }

  moveUp(fieldName, optionName, index) {
    if (index > 0) {
      for (let i = 0; i < this.configOptions.options.sections.length; i++) {
        let section = this.configOptions.options.sections[i];
        for (let j = 0; j < section.fields.length; j++) {
          if (section.fields[j].name == fieldName) {          
            for (let k = 0; k < section.fields[j]['options'].length; k++) {
              let option = section.fields[j]['options'][k];            
              if (option.index == index - 1) {
                option.index++;
              }
            }
            for (let k = 0; k < section.fields[j]['options'].length; k++) {
              let option = section.fields[j]['options'][k];
              if (option.name == optionName) {
                option.index--;
              }
            }
            for (let k = 0; k < section.fields[j]['options'].length; k++) {
              let option = section.fields[j]['options'][k];
              this.paperSettings[option.name + 'Index'] = option.index;          
            }
          }        
        }
      }
    }
  }
  
  moveDown(fieldName, optionName, index) {    
    for (let i = 0; i < this.configOptions.options.sections.length; i++) {
      let section = this.configOptions.options.sections[i];
      for (let j = 0; j < section.fields.length; j++) {
        if (section.fields[j].name == fieldName) {
          if (index < section.fields[j]['options'].length - 1) {
            for (let k = 0; k < section.fields[j]['options'].length; k++) {
              let option = section.fields[j]['options'][k];            
              if (option.index == index + 1) {
                option.index--;
              }
            }
            for (let k = 0; k < section.fields[j]['options'].length; k++) {
              let option = section.fields[j]['options'][k];
              if (option.name == optionName) {
                option.index++;
              }
            }
            for (let k = 0; k < section.fields[j]['options'].length; k++) {
              let option = section.fields[j]['options'][k];
              this.paperSettings[option.name + 'Index'] = option.index;          
            }
          }
        }
      }    
    }
  }

  checkHides(hideUntil) {
    for (let hider in hideUntil) {
      if (!this.paperSettings[hideUntil[hider]])
        return false;
    }
    return true;
  }

  correctEnabled(toCheck) {
    let correct = true;
    for (let i = 0; i < toCheck.length; i++) {
      if (!this.paperSettings[toCheck[i]]) {
        correct = false;
      }
    }
    return correct;
  }

  sendConfigObj() {
    this.configObj.emit(this.paperSettings);
  }

  radioUpdated(fieldName:string, value: any) {
    this.paperSettings[fieldName] = value.srcElement.checked;
  }

  ngOnChanges() {
    console.log("here");
  }

  addSection(sectionName: string) {
    console.log("here2");
    this.sections += sectionName; 
  }

  sectionIncluded(sectionName: string) {
    return this.sections.indexOf(sectionName) != -1;
  }

  addSubsection(sectionName: string) {
    this.subsections += sectionName; 
  }

  subsectionIncluded(sectionName: string) {
    return this.subsections.indexOf(sectionName) != -1;
  }
}