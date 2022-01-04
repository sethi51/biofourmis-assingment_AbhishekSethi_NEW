import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable, Subject } from 'rxjs';
import { Message } from './message/message.component';
import { domain } from './home/home.component';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  addNewSitePopup: Subject<boolean> = new Subject<boolean>();
  messageService: Subject<Message> = new Subject<Message>();
  refreshDomain: Subject<domain> = new Subject<domain>();
  constructor(private http: HttpClient) { }
  getDomains(): Observable<any> {
    return this.http.get(window.location + '/assets/mockJson/getDomains.json')
  }
  addNewSite(showPopUp: boolean) {
    this.addNewSitePopup.next(showPopUp);
  }
  showMessage(messageObj: Message) {
    this.messageService.next(messageObj);
  }
  refreshDomains(newDomain: domain) {
    this.refreshDomain.next(newDomain);
  }
}
