import {Component, HostListener, OnInit} from '@angular/core';
import {WahaType} from "../../../types/waha.type";
import {UnitService} from "../../service/unit.service";
import {ActivatedRoute} from "@angular/router";
import {WahaOtherType} from "../../../types/wahaOther.type";


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  waha: WahaType[] = [];
  unitOther: WahaOtherType[] = []

  loader: boolean = false
  modal: boolean = false

  constructor(private service: UnitService,
              private activatedRouter: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.getUnitAll()

  }

  getUnitAll() {
    this.loader = true
    this.service.getMainUnit()
      .subscribe(data => {

        this.waha = data.sort((a, b) => a.name > b.name ? 1 : -1)
        this.loader = false
        this.service.getOtherUnit()
          .subscribe(data => {

            this.waha.forEach(item => {
              const us = data.filter(el => el.leader === item.id)
              item.otherUnits = us
            })

          })

      })

  }

  openDialog() {
    this.modal = true
  }

  // wb: WahaType[] = [
  //   {
  //     id: 1,
  //     name: 'Immortals x10',
  //     pts: '150 pts',
  //     image: 'IMMORTALS.jpg',
  //     power: '',
  //     description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  //     user: false,
  //   },
  //   {
  //     id: 2,
  //     name: 'Immortals x5',
  //     pts: '75 pts',
  //     image: 'IMMORTALS.jpg',
  //     description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  //     user: false
  //   },
  //   {
  //     id: 3,
  //     name: 'Warrior  x10',
  //     pts: '100 pts',
  //     image: 'NECRON-WARRIORS.jpg',
  //     description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  //     user: false
  //   },
  //   {
  //     id: 4,
  //     name: 'Warrior  x20',
  //     pts: '200 pts',
  //     image: 'NECRON-WARRIORS.jpg',
  //     description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  //     user: false
  //   },
  // ];
  // wt: WahaType[] = [
  //   {
  //     id: 1,
  //     name: 'Ghost-ark',
  //     pts: '125 pts',
  //     image: 'GHOST-ARK.jpg',
  //     power: '',
  //     description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  //     user: false,
  //   },
  //   {
  //     id: 2,
  //     name: 'Ghost-ark',
  //     pts: '125 pts',
  //     image: 'GHOST-ARK.jpg',
  //     description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  //     user: false
  //   },
  // ];


  waha2!: WahaType

  getId(id: WahaType) {

    // if (id) {
    //   this.waha2 = id
    //   if (this.waha2) {
    //     this.waha2.user = true
    //   }
    // }

  }

  closeUser(id: string) {
    // this.waha.forEach(item => {
    //   if (id === item.id) {
    //     item.user = false
    //   }
    // })

  }

  duplicate(unit: WahaType, units: WahaType[]) {
    this.service.addDuplicate(unit)
      .subscribe(data => {
        console.log(data)
        this.getUnitAll()

      })
  }

  deleteUnit(id: string) {
    this.service.deleteUnit(id)
      .subscribe(data => {

        this.getUnitAll()

      })
  }

  @HostListener('document:click', ['$event.target'])
  click(event: HTMLElement) {
    if (this.modal && event.className.indexOf('modal') === -1) {
      this.modal = false
    }
  }

  deleteOtherUnit(id: string) {
    this.service.deleteOtherUnit(id)
      .subscribe(data => {

        this.getUnitAll()
      })
  }

}
