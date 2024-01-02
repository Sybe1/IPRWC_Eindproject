import {Component, Input} from '@angular/core';
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-no-information-found',
  standalone: true,
  imports: [
    NgIf
  ],
  templateUrl: './no-information-found.component.html',
  styleUrl: './no-information-found.component.scss'
})
export class NoInformationFoundComponent {
  @Input() public titleOfInformationNotFound: string | undefined;
  @Input() public listOfInformationNotFound: any[] | undefined;
}
