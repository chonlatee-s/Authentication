import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EventService } from '../event.service';

@Component({
  selector: 'app-special-event',
  templateUrl: './special-event.component.html',
  styleUrls: ['./special-event.component.scss']
})
export class SpecialEventComponent implements OnInit {

  specialEvents = [{ name:'', desription: '', date: '' }]
  constructor(private _eventService: EventService, private _router: Router) { }

  ngOnInit(): void {
    this._eventService.getSpecialEvents().subscribe(
      res => this.specialEvents = res,
      err => {
        if(err instanceof HttpErrorResponse) {
          if(err.status === 400) {
            this._router.navigate(['/login'])
          }
        }
      }
    )
  }

}
