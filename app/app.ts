
import {bootstrap} from '@angular/platform-browser-dynamic';
import {Component} from '@angular/core';
import * as fs from 'fs';

import {remote, ipcRenderer} from 'electron';

let {dialog} = remote;

@Component({
    selector: 'my-app',
    templateUrl: './app.html',
    styleUrls: ['./app.css']
})

export class AppComponent {
    //https://github.com/rajayogan/angular2-desktop
    constructor() {

        var menu = remote.Menu.buildFromTemplate([{
            label: 'Raja',
            submenu: [
                {
                    label: 'open',
                    click: function(){
                      dialog.showOpenDialog((cb) => {
                          
                      })  
                    }
                },
                {
                    label: 'opencustom',
                    click: function(){
                      ipcRenderer.send('open-custom');
                          let notification = new Notification('Customdialog', {
                              body: 'This is a custom window created by us'
                          })
                        
                    }
                }
            ]
        }])
        remote.Menu.setApplicationMenu(menu);
    }
    
}

bootstrap(AppComponent);

