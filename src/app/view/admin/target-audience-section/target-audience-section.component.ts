import { Component } from '@angular/core';
import {TargetAudience} from "../../../models/target-audience";
import {TargetAudienceService} from "../../../services/target-audience.service";
import {PopUpUpdateTargetAudienceComponent} from "./pop-up-update-target-audience/pop-up-update-target-audience.component";
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
  public ngOnInit(): void{
    this.getTargetAudiences();
  }

  public getTargetAudiences(): void{
    this.targetAudienceService.getTargetAudiences().subscribe((response: TargetAudience[]) => {
      this.targetAudiences = response;
    })
  }
}
