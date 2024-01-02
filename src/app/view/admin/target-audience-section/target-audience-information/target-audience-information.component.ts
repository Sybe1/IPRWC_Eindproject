import {Component, Input} from '@angular/core';
import {TargetAudience} from "../../../../models/target-audience";
import {
  PopUpUpdateTargetAudienceComponent
} from "../pop-up-update-target-audience/pop-up-update-target-audience.component";
import {MatIconModule} from "@angular/material/icon";
import {TargetAudienceService} from "../../../../services/target-audience.service";
import {OpenPopUpService} from "../../../../services/open-pop-up.service";
import {TargetAudienceSectionComponent} from "../target-audience-section.component";

@Component({
  selector: 'app-target-audience-information',
  standalone: true,
  imports: [
    MatIconModule
  ],
  templateUrl: './target-audience-information.component.html',
  styleUrl: './target-audience-information.component.scss'
})
export class TargetAudienceInformationComponent {
  @Input() public targetAudience: TargetAudience = <TargetAudience>{};
  protected readonly PopUpUpdateTargetAudienceComponent = PopUpUpdateTargetAudienceComponent;
  constructor(private targetAudienceService: TargetAudienceService, public openPupUpService: OpenPopUpService,
              private targetAudienceSectionComponent: TargetAudienceSectionComponent) {
  }
  public deleteTargetAudience(targetAudienceId: string):void {
    if(confirm('Are you sure you want to delete this clothing type?')) {
      this.targetAudienceService.deleteTargetAudience(targetAudienceId).subscribe(
        (resp) => {
          console.log(resp);
          this.targetAudienceSectionComponent.getTargetAudiences();
        },
        (err) => {
          console.log(err);
        }
      );
    }
  }
}
