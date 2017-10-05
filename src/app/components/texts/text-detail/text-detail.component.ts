import { Component, OnInit } from '@angular/core';
import { TextModel } from 'app/model/text.model';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { TextService } from 'app/services/text.service';
import { DatabaseService } from 'app/services/database.service';

@Component({
  selector: 'app-text-detail',
  templateUrl: './text-detail.component.html',
  styleUrls: ['./text-detail.component.css'],
  providers: [TextService, DatabaseService]
})
export class TextDetailComponent implements OnInit {

  public text: TextModel;

  constructor(private route: ActivatedRoute,
              private location: Location,
              private textService: TextService) {
    this.route.params.subscribe( params => 
      {
        let _id:number = params['id'];
        let _text:string = params['text'];
        this.text = new TextModel(_id, _text);
      } 
    );
   }

  ngOnInit() {
  }

  cancel(): void {
    this.location.back();
  }

  accept():void {
    this.textService.update(this.text.text, this.text.id)
    .then(existing=> {
      this.location.back();
    }).catch(error=> {
      alert(error);
    });
  }

  remove():void {
    this.textService.remove(this.text.id)
    .then(existing=> {
      this.location.back();
    }).catch(error=> {
      alert(error);
    });
  }

}
