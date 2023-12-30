import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {TargetAudienceService} from "../../../services/target-audience.service";
import {ClothingType} from "../../../models/clothing-type";
import {TargetAudience} from "../../../models/target-audience";

@Component({
  selector: 'app-filter-target-audience',
  templateUrl: './filter-target-audience.component.html',
  styleUrls: ['./filter-target-audience.component.scss']
})
export class FilterTargetAudienceComponent implements OnInit{
  @Input() allTargetAudience:string[] = [];
  isTargetAudienceCollapsed: boolean = true;
  @Output() targetAudienceFilterChange: EventEmitter<string[]> = new EventEmitter<string[]>();

  selectedTargetAudience: string[] = [];

  constructor(private targetAudienceService: TargetAudienceService) {
  }

  ngOnInit() {
    this.getTargetAudiences();
  }

  public getTargetAudiences(): void{
    this.targetAudienceService.getTargetAudiences().subscribe((response: any[]) => {
      const targetAudiences: TargetAudience[] = response
      for (let i = 0; i < targetAudiences.length; i++) {
        this.selectedTargetAudience.push(targetAudiences[i].audience)
      }
    })
  }

  public toggleTargetAudienceCollapse(): void{
    this.isTargetAudienceCollapsed = !this.isTargetAudienceCollapsed;
  }

  public onCheckboxChangeTargetAudience(product: string): void{
    for (let i = 0; i < this.selectedTargetAudience.length; i++) {
      if (product === this.selectedTargetAudience[i]){
        this.selectedTargetAudience.splice(i, 1);
        this.emitFilterChange()
        return;
      }
    }
    this.selectedTargetAudience.push(product)
    this.emitFilterChange()
  }

  private emitFilterChange(): void{
    this.targetAudienceFilterChange.emit(this.selectedTargetAudience)
  }
}

