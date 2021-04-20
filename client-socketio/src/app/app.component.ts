import { Component } from '@angular/core';
import { SocketService } from './socket.service';
import { Observable } from 'rxjs';
import { CesarService } from './cesar.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  messageList:  string[] = [];
  obs: Observable<any>;
  juju: number;

  constructor(private socketService: SocketService, private cesarService: CesarService) {
  }
chiave(ciao: HTMLInputElement){
  this.juju=Number(ciao.value);
}
 sendMessage(message: HTMLInputElement) {
    let encoded = this.cesarService.encode(message.value, this.juju);
    this.socketService.sendMessage(encoded);
    console.log("sent: " + message.value)
    message.value="";
  }
  ngOnInit() {
    this.obs = this.socketService.getMessage();
    this.obs.subscribe(this.rcvMessage);}
  rcvMessage = (message: string) => {
        this.messageList.push("messagereceived: " + message + " messagio decifrato " +  this.cesarService.decode(message, this.juju));
        console.log("messagereceived: " + message + "messagio decifrato " +  this.cesarService.decode(message, this.juju) );
      }
  }





