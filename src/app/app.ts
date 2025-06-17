import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {

    designationList: any [] = [];
    roleList: any [] = [];

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
    stepperCompletionValue: number =8;

    goToStep1() {
      const currentStep = this.stepsList.find(m => m.stepName == this.activeStep.stepName);
        if (currentStep) {
          currentStep.isCompltete = true;
        }
        this.setCurrentStep(this.stepsList[0]);
        this.stepperCompletionValue = 8;
      }
    goToStep2() {
      const currentStep = this.stepsList.find(m => m.stepName == this.activeStep.stepName);
        if (currentStep) {
          currentStep.isCompltete = true;
        }
        this.setCurrentStep(this.stepsList[1]);
        this.stepperCompletionValue = 50;
      }
      goToStep3() {
      const currentStep = this.stepsList.find(m => m.stepName == this.activeStep.stepName);
        if (currentStep) {
          currentStep.isCompltete = true;
        }
        this.setCurrentStep(this.stepsList[2]);
        this.stepperCompletionValue = 90;
      }

    employObject: any = {
      "empCode": "",
      "empId": 0,
      "empName": "",
      "empEmailId": "",
      "empDesignationId": 0,
      "empContactNo": "",
      "empAltContactNo": "",
      "empPersonalEmailId": "",
      "empExpTotalYear": 0,
      "empExpTotalMonth": 0,
      "empCity": "",
      "empState": "",
      "empPinCode": "",
      "empAddress": "",
      "empPerCity": "",
      "empPerState": "",
      "empPerPinCode": "",
      "empPerAddress": "",
      "password": "",
      "ErpEmployeeSkills": [],
      "ErmEmpExperiences": []
    }

    ngOnInit(): void {
        this.loadDesignations();
        this.loadAllEmp();
    }
      loadEmployees() {
    this.http.get('http://localhost:3001/api/employees').subscribe((res: any) => {
      this.employObject = res.result;
    });
  }

    activeStep: any = this.stepsList[0];

    setCurrentStep(activeStep: any) {
      this.activeStep = activeStep;
    }
    
    addSkills() {
      const skillObj = {
        "empSkillId": 0,
        "empId": 0,
        "skill": "",
        "totalYearExp": 0,
        "lastVersionUsed": ""
      }
      this.employObject.ErpEmployeeSkills.unshift(skillObj)
    }
    
    addExp() {
      const expObj = {
        "empExpId": 0,
        "empId": 0,
        "companyName": "",
        "startDate": "2025-06-17T15:07:16.249Z",
        "endDate": "2025-06-17T15:07:16.249Z",
        "designation": "",
        "projectsWorkedOn": ""
      }
      this.employObject.ErmEmpExperiences.unshift(expObj)
    }

    constructor(private http: HttpClient, private cdr: ChangeDetectorRef) {
      // Initialize any necessary data or services here
    }

    saveEmployee() {
  this.http.post('http://localhost:3001/api/employees', this.employObject).subscribe({
    next: (res: any) => {
      if (res && res.result) {
        alert('Employee Created Successfully');
      } else {
        alert('Error in Creating Employee');
      }
    },
    error: (err) => {
      alert('Error in Creating Employee');
      console.error(err);
    }
  });
} 
    empList: any [] = [];

    loadAllEmp(){
      this.http.get('http://localhost:3001/api/employees').subscribe((res:any) => {
        this.empList = res.result;
        this.cdr.detectChanges(); // <-- Add this line
      });
    }

    loadDesignations() {
      this.http.get('http://localhost:3000/api/designations').subscribe((res:any) => {
    this.designationList = res.result;
    this.cdr.detectChanges(); // <-- Add this line
  });  
    }

    editEmployee(emp: any) {
      this.employObject = emp;
      this.setCurrentStep(this.stepsList[0]);
      this.stepperCompletionValue = 8;
    }

    isCreateView: boolean = false;


    deleteEmployee(emp: any) {
      this.http.delete(`http://localhost:3001/api/employees/${emp.empId}`).subscribe({
        next: (res: any) => {
          if (res && res.result) {
            alert('Employee Deleted Successfully');
            this.loadAllEmp();
          } else {
            alert('Error in Deleting Employee');
          }
        },
        error: (err) => {
          alert('Error in Deleting Employee');
          console.error(err);
        }
      });
    }

    addNew(){
      this.isCreateView = false;
    }
}