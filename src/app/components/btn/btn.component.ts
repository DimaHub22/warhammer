import {Component, Input, OnInit} from '@angular/core';
import {WahaType} from "../../../types/waha.type";
import {Router} from "@angular/router";
import {UnitService} from "../../service/unit.service";

@Component({
  selector: 'app-btn',
  templateUrl: './btn.component.html',
  styleUrls: ['./btn.component.css']
})
export class BtnComponent implements OnInit {
@Input('toggle') toggle!:WahaType
  constructor(private router: Router,
              private service:UnitService) { }

  ngOnInit(): void {

  }

  addUnit(){
    this.router.navigate(['/unit'], {queryParams:{status:this.toggle.status, id:this.toggle.id}})
  }

}
