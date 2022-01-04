import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { domain } from '../home/home.component';
import { Message } from '../message/message.component';

@Component({
  selector: 'app-add-new-site',
  templateUrl: './add-new-site.component.html',
  styleUrls: ['./add-new-site.component.scss']
})
export class AddNewSiteComponent implements OnInit {
  showPopUp: boolean = false;
  payload: domain = { id: "999", domain: "", storage: "", usedStorage: "", monthlyVisitor: "", status: "", subDomain: [] };
  constructor(private dataShare: DataService) { }

  ngOnInit(): void {
    this.dataShare.addNewSitePopup.subscribe((data) => {
      if (data) {
        this.showPopUp = true;
      }
    })
  }
  handleOutsideEvent() {
    this.showPopUp = false;
    this.payload = { id: "999", domain: "", storage: "", usedStorage: "", monthlyVisitor: "", status: "", subDomain: [] };
  }
  saveDomain() {
    console.log(this.payload);
    this.dataShare.refreshDomains(this.payload);
    this.dataShare.showMessage(new Message("Success", "Domain Added Successfully"));
    this.payload = { id: "999", domain: "", storage: "", usedStorage: "", monthlyVisitor: "", status: "", subDomain: [] };
    this.showPopUp = false;
  }

}
