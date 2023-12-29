import { Component } from '@angular/core';
import {ClothingType} from "../../../models/clothing-type";
import {ClothingTypeService} from "../../../services/clothing-type.service";
import {MatDialog} from "@angular/material/dialog";
import {
  PopUpUpdateClothingTypeComponent
} from "../clothing-type-section/pop-up-update-clothing-type/pop-up-update-clothing-type.component";
import {TargetAudience} from "../../../models/target-audience";
import {TargetAudienceService} from "../../../services/target-audience.service";
import {
  PopUpUpdateTargetAudienceComponent
} from "./pop-up-update-target-audience/pop-up-update-target-audience.component";

@Component({
  selector: 'app-target-audience-section',
  templateUrl: './target-audience-section.component.html',
  styleUrl: './target-audience-section.component.scss'
})
export class TargetAudienceSectionComponent {
  targetAudiences: TargetAudience[] = [];

  constructor(private targetAudienceService: TargetAudienceService, private dialog: MatDialog) {
  }

  ngOnInit() {
    this.getTargetAudiences()
  }

  public getTargetAudiences(): void{
    this.targetAudienceService.getTargetAudiences().subscribe((response: any[]) => {
      this.targetAudiences = response
    })
  }

  deleteTargetAudience(targetAudienceId: string) {
    if(confirm('Are you sure you want to delete this clothing type?')) {
      this.targetAudienceService.deleteTargetAudience(targetAudienceId).subscribe(
        (resp) => {
          console.log(resp)
          this.getTargetAudiences();
        },
        (err) => {
          console.log(err);
        }
      );
    }
  }

  public openPopup(code:any, title :any): void{
    const dialogRef = this.dialog.open(PopUpUpdateTargetAudienceComponent,{
      width:'18%',
      data: {
        title: title,
        code: code
      }
    });
    dialogRef.componentInstance.onClose.subscribe(() => {
      this.getTargetAudiences();
    });
  }
}
