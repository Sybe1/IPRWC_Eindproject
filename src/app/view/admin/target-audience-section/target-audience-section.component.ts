import { Component } from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {TargetAudience} from "../../../models/target-audience";
import {TargetAudienceService} from "../../../services/target-audience.service";
import {
  PopUpUpdateTargetAudienceComponent
} from "./pop-up-update-target-audience/pop-up-update-target-audience.component";
import {OpenPopUpService} from "../../../services/open-pop-up.service";

@Component({
  selector: 'app-target-audience-section',
  templateUrl: './target-audience-section.component.html',
  styleUrl: './target-audience-section.component.scss'
})
export class TargetAudienceSectionComponent {
  public targetAudiences: TargetAudience[] = [];
  protected readonly PopUpUpdateTargetAudienceComponent = PopUpUpdateTargetAudienceComponent;

  constructor(private targetAudienceService: TargetAudienceService, public openPupUpService: OpenPopUpService) {
  }

  ngOnInit() {
    this.getTargetAudiences();
  }

  public getTargetAudiences(): void{
    this.targetAudienceService.getTargetAudiences().subscribe((response: TargetAudience[]) => {
      this.targetAudiences = response;
    })
  }

  public deleteTargetAudience(targetAudienceId: string):void {
    if(confirm('Are you sure you want to delete this clothing type?')) {
      this.targetAudienceService.deleteTargetAudience(targetAudienceId).subscribe(
        (resp) => {
          console.log(resp);
          this.getTargetAudiences();
        },
        (err) => {
          console.log(err);
        }
      );
    }
  }
}
