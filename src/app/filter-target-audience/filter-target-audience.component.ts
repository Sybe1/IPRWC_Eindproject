import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-filter-target-audience',
  templateUrl: './filter-target-audience.component.html',
  styleUrls: ['./filter-target-audience.component.scss']
})
export class FilterTargetAudienceComponent {
  @Input() allTargetAudience:string[] = [];
  isTargetAudienceCollapsed: boolean = true;
  @Output() targetAudienceFilterChange: EventEmitter<string[]> = new EventEmitter<string[]>();

  selectedTargetAudience: string[] = ["Men", "Women", "Unisex", "Children"];

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

