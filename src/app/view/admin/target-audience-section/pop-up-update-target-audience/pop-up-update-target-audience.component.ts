import {Component, EventEmitter, Inject, Output} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormBuilder} from "@angular/forms";
import {ClothingTypeService} from "../../../../services/clothing-type.service";
import {ClothingType} from "../../../../models/clothing-type";
import {TargetAudienceService} from "../../../../services/target-audience.service";
import {TargetAudience} from "../../../../models/target-audience";

@Component({
  selector: 'app-pop-up-update-target-audience',
  templateUrl: './pop-up-update-target-audience.component.html',
  styleUrl: './pop-up-update-target-audience.component.scss'
})
export class PopUpUpdateTargetAudienceComponent {
  @Output() onClose: EventEmitter<void> = new EventEmitter<void>();

  myform = this.buildr.group({
    audience: '',
    description: ''
  });

  constructor(@Inject(MAT_DIALOG_DATA) public data:any, private ref:MatDialogRef<PopUpUpdateTargetAudienceComponent>,
              private buildr:FormBuilder, private targetAudienceService: TargetAudienceService) {
  }
  ngOnInit(): void {
    this.updateClothingType(this.data.code);
  }
  public closePopup(): void{
    this.ref.close('Closed using function');
    this.onClose.emit();
  }

  public updateClothingType(code:any): void{
    this.targetAudienceService.getTargetAudienceById(code).subscribe(item=>{
      this.myform.setValue({
        audience:item.audience,
        description: item.description
      })
    })
  }

  public saveTargetAudience(): void {
    const targetAudienceData: TargetAudience = {
      id: this.data.code || '',
      audience: this.myform.value.audience || '',
      description: this.myform.value.description || '',
    };
    this.targetAudienceService.updateTargetAudience(targetAudienceData).subscribe(res => {
      this.closePopup();
      console.log(res)
    });
  }
}
