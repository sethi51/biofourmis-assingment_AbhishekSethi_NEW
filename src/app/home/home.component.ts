import { Component, OnInit, ViewChild } from '@angular/core';
// import { DialogService } from 'primeng/dynamicdialog';
import { DataService } from '../data.service';
import * as _ from 'lodash';
export class domain {
  id: string;
  domain: string;
  storage: string;
  usedStorage: string;
  monthlyVisitor: string;
  status: string;
  subDomain: any[];
  // constructor(){}
}
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  // providers: [DialogService]
})
export class HomeComponent implements OnInit {
  @ViewChild('filterInput') filterInput: HTMLInputElement;
  headers: any;
  domains: domain[];
  domainCopy: domain[];
  searchTimeOut: any = null;
  constructor(private service: DataService) { }

  ngOnInit(): void {
    this.headers = [
      {
        field: "domain",
        header: "Domain & Plan Name"
      },
      {
        field: "storage",
        header: "Storage"
      },
      {
        field: "monthlyVisitor",
        header: "Monthly Visitor"
      },
      {
        field: "domainTag",
        header: "Domain"
      },
      {
        field: "status",
        header: "Status"
      }
    ];
    this.getData();
    this.service.refreshDomain.subscribe((data: domain) => {
      this.domains.push(data);
      this.domains = this.domains.map((x => {
        return { ...x, subDomainLen: x.subDomain.length, isOpen: false };
      }))
      this.domainCopy = _.cloneDeep(this.domains);
      // console.log(this.domains);
    });
  }
  getData() {
    this.service.getDomains().subscribe((data: domain[]) => {
      this.domains = data;
      this.domains = this.domains.map((x => {
        return { ...x, subDomainLen: x.subDomain.length, isOpen: false };
      }))
      // console.log(this.domains);
      this.domainCopy = _.cloneDeep(this.domains);
      // console.log(this.domainCopy);
    });
  }
  setBar(data: domain) {
    // console.log(data);
    let styles = {
      'width': (parseInt(data.usedStorage) / parseInt(data.storage)) * 100 + '%'
    };
    return styles;
  }
  expandCollapse(data) {
    if (data.subDomainLen > 0) {
      data.isOpen = !data.isOpen;
    }
  }
  globalFilterHandler(event, waitTimeInMillis = 500) {
    // console.log(event);
    if (this.searchTimeOut) {
      clearTimeout(this.searchTimeOut);
      this.searchTimeOut = null;
    }
    this.searchTimeOut = setTimeout(() => {
      // console.log("Here");
      // console.log(event);
      if ((event == this.filterInput.value) || (event == '' && !this.filterInput.value)) {
        // console.log('here');
        return;
      }
      this.filterInput.value = event;
      if (event == null || event == '') {
        console.log("Here1" + event);
        this.domains = [...this.domainCopy];
      }
      else {
        console.log(event);
        let filteredData = this.domainCopy.filter(data => {
          let output = false;
          for (let obj of Object.entries(data)) {
            console.log(obj)
            if (String(obj[1]).toLowerCase().includes(event.toLowerCase())) {
              output = true;
              break;
            }
          }
          return output;
        });
        this.domains = [...filteredData];
      }
    }, waitTimeInMillis)
  }
  addNewSite() {
    this.service.addNewSite(true);
  }
}
