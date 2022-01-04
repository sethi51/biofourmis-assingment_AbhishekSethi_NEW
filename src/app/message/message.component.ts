import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
export class Message {
  // messageType:string;
  messageTitle: string;
  messageBody: string;
  constructor(messageTitle: string, messageBody: string) {
    this.messageTitle = messageTitle;
    this.messageBody = messageBody;
  }
}
@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit {
  showMessage: boolean = false;
  timer: any;
  message: Message;
  constructor(private dataShare: DataService) { }

  ngOnInit(): void {
    this.dataShare.messageService.subscribe((data: Message) => {
      if (this.timer) {
        clearTimeout(this.timer);
        this.showMessage = false;
      }
      this.showMessage = true;
      this.message = data;
      this.timer = setTimeout(() => {
        this.showMessage = false;
      }, 7000);
    });
  }
  close() {
    this.showMessage = false;
  }

}
