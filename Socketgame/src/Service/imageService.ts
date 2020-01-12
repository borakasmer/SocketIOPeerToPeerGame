import { Socket } from 'ngx-socket-io';
import { Injectable } from '@angular/core';
import { Picture } from 'src/Model/Picture';

@Injectable({ providedIn: 'root' })

export class ImageService {
    constructor(private socket: Socket) { }

    sendPictureUrl(pictureUrl: string, socketID: string) {
        let picture: Picture = new Picture();
        picture.name = pictureUrl;
        picture.url = `../assets/images/${pictureUrl}.jpg`;
        picture.socketID = socketID;
        
        this.socket.emit('sendUpdatePicture', picture);
    }

    updatedPicture = this.socket.fromEvent<Picture>('changePicture');
    socketList = this.socket.fromEvent<Array<string>>('getSocketID');
    currentSocketID = this.socket.fromEvent<string>('currentSocketID');
    leaveSocketID = this.socket.fromEvent<string>('leaveSocketID');

}