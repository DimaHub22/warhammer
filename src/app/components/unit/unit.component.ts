import {Component, Input, OnInit} from '@angular/core';
import {UnitService} from "../../service/unit.service";
import {WahaType} from "../../../types/waha.type";
import {ActivatedRoute, Router} from "@angular/router";
import {WahaOtherType} from "../../../types/wahaOther.type";


@Component({
  selector: 'app-unit',
  templateUrl: './unit.component.html',
  styleUrls: ['./unit.component.css']
})
export class UnitComponent implements OnInit {

  units: WahaOtherType[] = []
  idUnitLeader:string = ''

  constructor(private activatedRouter: ActivatedRoute,
              private services: UnitService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.activatedRouter.queryParams.subscribe(data => {
      this.idUnitLeader = data['id']
      this.services.getWahaOther(data['status'])
        .subscribe(data => {
          this.units = data
        })

    })

  }

  leaderUnit(u: WahaOtherType) {
    this.services.addNewUnit(u,this.idUnitLeader).subscribe(data => {
      if (data){
        this.router.navigate([''])
      }
    })

  }

  back(){
    this.router.navigate([''])
  }
}
