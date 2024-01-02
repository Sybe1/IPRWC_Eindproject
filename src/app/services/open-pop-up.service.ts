import { Injectable } from '@angular/core';
import {
  PopUpUpdateClothingTypeComponent
} from "../view/admin/clothing-type-section/pop-up-update-clothing-type/pop-up-update-clothing-type.component";
import {ComponentType} from "@angular/cdk/overlay";
import {MatDialog} from "@angular/material/dialog";

@Injectable({
  providedIn: 'root'
})
export class OpenPopUpService {

  constructor(private dialog: MatDialog) { }

  public openPopupEdit(
    code: string,
    title: string,
    component: ComponentType<any>,
  ): void {
    const dialogRef = this.dialog.open(component, {
      width: '18%',
      data: {
        title: title,
        code: code
      }
    });
    dialogRef.componentInstance.onClose.subscribe(() => {
      window.location.reload();
    });
  }

  public openPopupAdd(
    title: string,
    component: ComponentType<any>
  ): void {
    const dialogRef = this.dialog.open(component, {
      width: '18%',
      data: {
        title: title,
      }
    });
    dialogRef.componentInstance.onClose.subscribe(() => {
      window.location.reload();
    });
  }
}
