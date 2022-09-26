import { Component } from '@angular/core';
import { ActionSheet, ActionSheetButtonStyle } from '@capacitor/action-sheet';
import { Browser } from '@capacitor/browser';
import { Device } from '@capacitor/device';
import { Dialog } from '@capacitor/dialog';
import { PluginListenerHandle } from '@capacitor/core';
import { Motion } from '@capacitor/motion';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  constructor() {}

  async showActions (){
    const result = await ActionSheet.showActions({
      title: 'Photo Options',
      message: 'Select an option to perform',
      options: [
        {
          title: 'Upload',
        },
        {
          title: 'Share',
        },
        {
          title: 'Remove',
          style: ActionSheetButtonStyle.Destructive,
        },
      ],
    });
  
    console.log('Action Sheet result:', result);
  };

  async openCapacitorSite(){
    await Browser.open({ url: 'http://capacitorjs.com/' });
  };

  async logDeviceInfo(){
    const info = await Device.getInfo();
    const getId = await Device.getId();
    const getLanguageCode = await Device.getLanguageCode();
    const getLanguageTag = await Device.getLanguageTag();
    console.log(info);
    console.log(getId);
    console.log(getLanguageCode);
    console.log(getLanguageTag);
  };
  
  async logBatteryInfo(){
    const info = await Device.getBatteryInfo();
    console.log(info);
  };

  async showAlert() {
    await Dialog.alert({
      title: 'Stop',
      message: 'this is an error',
    });
  };
  
  async showConfirm() {
    const { value } = await Dialog.confirm({
      title: 'Confirm',
      message: `Are you sure you'd like to press the red button?`,
    });
  
    console.log('Confirmed:', value);
  };
  
  async showPrompt() {
    const { value, cancelled } = await Dialog.prompt({
      title: 'Hello',
      message: `What's your name?`,
    });
  
    console.log('Name:', value);
    console.log('Cancelled:', cancelled);
  };


  async checkMotion(){
    
let accelHandler: PluginListenerHandle;
// var myButton = document.getElementById('myButton');

//  myButton.addEventListener('click', async () => {
//   try {
//     await DeviceMotionEvent.requestPermission();
//   } catch (e) {
//     // Handle error
//     return;
//   }

  // Once the user approves, can start listening:
  accelHandler = await Motion.addListener('accel', event => {
    console.log('Device motion event:', event);
  });

// Stop the acceleration listener
// const stopAcceleration = () => {
//   if (accelHandler) {
//     accelHandler.remove();
//   }
// };

// Remove all listeners
  }

  removeListeners() {
    Motion.removeAllListeners();
  }
}
