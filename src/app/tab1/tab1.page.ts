import { Component } from '@angular/core';
import { AppVersion } from '@ionic-native/app-version/ngx';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { Geolocation, Position } from '@capacitor/geolocation';
import { Share } from '@capacitor/share';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  myImage = null;
  position: Position = null;

  constructor(private appVersion: AppVersion) {
    // this.appversion.getVersionCode().then(value => {
    //   alert(value);
    // }).catch(err => {
    //   alert(err);
    // });
    this.appVersion.getPackageName().then(value => {
      alert(value);
  }).catch(err => {
      alert(err);
    });
  }


  async takePicture() {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: true,
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera
    });

    this.myImage = image.webPath;
  }

  async getCurrentPosition() {
    const coordinates = await Geolocation.getCurrentPosition();

    this.position = coordinates;
  }

  async share() {
    await Share.share({
      title: 'Come and find me',
      text: `Here's my current location: 
        ${this.position.coords.latitude}, 
        ${this.position.coords.longitude}`,
      url: 'http://ionicacademy.com/'
    });
  }
}
