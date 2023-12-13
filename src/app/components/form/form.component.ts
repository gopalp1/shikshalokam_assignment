import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { data } from 'src/app/Json';
@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit  {
  list:any=data;
  projectForm!: FormGroup;
  showMe:boolean=false;
  constructor(private formBuilder: FormBuilder){  }
 
  ngOnInit(): void {
    this.prepareForm();
  }
 
  prepareForm(){
    const controls:any={};
    this.list?.formFields?.forEach((resp: any) => {
      resp?.fields.forEach((data:any)=>{
        const validationsArray = [];
            if (data?.validations?.isRequired) {
              validationsArray.push(Validators.required);
            };
            if(data?.validations?.pattern){
              validationsArray.push(Validators.pattern(data?.validations?.pattern));
            }
            controls[data?.name] = new FormControl('', validationsArray,)
          });
      })
      this.projectForm = this.formBuilder.group(controls);
    this.showMe=true
  }



  submit(){

    console.log(this.projectForm.value,"form value")
  }
}
