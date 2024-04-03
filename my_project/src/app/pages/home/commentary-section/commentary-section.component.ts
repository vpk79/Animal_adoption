import { Component } from '@angular/core';

@Component({
  selector: 'app-commentary-section',
  templateUrl: './commentary-section.component.html',
  styleUrl: './commentary-section.component.css'
})
export class CommentarySectionComponent {
   isRateToggled: boolean = false;

    toggleRate(){
     this.isRateToggled = !this.isRateToggled;
    }

}
