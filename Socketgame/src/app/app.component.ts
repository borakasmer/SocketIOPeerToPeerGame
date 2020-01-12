import { Component, AfterViewInit } from '@angular/core';
import { ImageService } from 'src/Service/imageService';
import { Picture } from 'src/Model/Picture';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
  title = 'Socketgame';
  bigImage: string = "";
  socketList = [];
  selectedSocket: string;
  socketID: string;
  hasBigImage: boolean = false;

  constructor(public service: ImageService) { }

  ngAfterViewInit() {

    this.service.updatedPicture.subscribe((picture: Picture) => {
      console.log(`Url: ${picture.url} - SocketID ${picture.socketID}`)
      this.bigImage = picture.url;
      this.hasBigImage = true;
    });

    this.service.currentSocketID.subscribe((currentSocketID: string) => {
      this.socketID = currentSocketID;
      console.log(`Your SocketID :${this.socketID}`)
    });

    this.service.socketList.subscribe((socketList: Array<string>) => {
      this.socketList = socketList;
      this.selectedSocket = socketList[0];
      console.log(`Your SocketID :${this.socketID}`)
    });

    this.service.leaveSocketID.subscribe((leaveSocketID: string) => {
      console.log(`Leave SocketID :${leaveSocketID}`)
      const index: number = this.socketList.indexOf(leaveSocketID);
      if (index !== -1) {
        this.socketList.splice(index, 1);
      }
    });
  }

  public changePicture(imgName) {
    console.log(`Sending image:${imgName} to ${this.selectedSocket}`);
    this.bigImage = `../assets/images/${imgName}.jpg`;
    this.hasBigImage=false;
    this.service.sendPictureUrl(imgName, this.selectedSocket);
  }
}
