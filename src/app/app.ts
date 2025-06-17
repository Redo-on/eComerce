import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
    stepsList: any [] = [
      {
        stepName: 'Basic Details',
        isCompltete: false
      },
      {
        stepName: 'Skills',
        isCompltete: false
      },
      {
        stepName: 'Experience',
        isCompltete: false
      }
    ]
    activeStep:any = this.stepsList[0];

    setCurrentStep(activeStep: any) {
      this.activeStep = activeStep;
    }
    
}
