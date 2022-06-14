import {
  AfterViewInit,
  Component,
  ElementRef,
  Inject,
  OnInit,
  ViewChildren,
} from '@angular/core';
import { formatDate,CurrencyPipe } from '@angular/common';
import {
  UntypedFormBuilder,
  FormControlName,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { fromEvent, merge, Observable } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

import { GenericValidator, IsDirty } from 'randr-lib';

import { JobEdit, Address } from '../../models/job-edit.model';
import { JobService } from '../../services/job.service';

@Component({
  selector: 'app-job-edit',
  templateUrl: './job-edit.component.html',
  styleUrls: ['./job-edit.component.scss'],
})
export class JobEditComponent implements OnInit, AfterViewInit, IsDirty {
  @ViewChildren(FormControlName, { read: ElementRef })
  formInputElements: ElementRef[] = [];

  displayMessage: { [key: string]: string } = {};
  private validationMessages: { [key: string]: { [key: string]: string } };
  private genericValidator: GenericValidator;
  private originalData: string = "";

  form: UntypedFormGroup = this.fb.group({
    address1: [
      this.data.address1,
      [Validators.required, Validators.maxLength(255)],
    ],
    address2: [this.data.address2, [Validators.maxLength(255)]],
    city: [this.data.city, Validators.maxLength(50)],
    state: [
      this.data.state,
      [Validators.minLength(2), Validators.maxLength(2)],
    ],
    zipCode: [this.data.zipCode, Validators.maxLength(10)],
    squareFoot: [this.data.squareFoot],
    bedBath: [this.data.bedBath, Validators.required],
    lockBox: [this.data.lockBox],
    gateCode: [this.data.gateCode],
    garageCode: [this.data.garageCode],
    year: [this.data.year],
    renovationBudget: [this.data.renovationBudget],
    ourTotal: [this.data.ourTotal],
    projectEndDate: [
      formatDate(this.data.projectEndDate, 'yyyy-MM-dd', 'en'),
    ],
  });

  constructor(
    public dialogRef: MatDialogRef<JobEditComponent>,
    private service: JobService,
    private fb: UntypedFormBuilder,

    @Inject(MAT_DIALOG_DATA) public data: JobEdit
  ) {
    this.validationMessages = {
      city: {
        required: 'Username is required.',
        minlength: 'Username must be at least three characters.',
        maxlength: 'Username cannot exceed 50 characters.',
      },
    };
    this.genericValidator = new GenericValidator(this.validationMessages);
    this.originalData = JSON.stringify(this.data);
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    // Watch for the blur event from any input element on the form.
    const controlBlurs: Observable<any>[] = this.formInputElements.map(
      (formControl: ElementRef) => fromEvent(formControl.nativeElement, 'blur')
    );

    // Merge the blur event observable with the valueChanges observable
    merge(this.form.valueChanges, ...controlBlurs)
      .pipe(debounceTime(800))
      .subscribe((value) => {
        this.displayMessage = this.genericValidator.processMessages(this.form);
      });
  }

  onSave(): void {
    let a = this.form.value;
    a.id = this.data.id;
    this.service.put(a.id, a).subscribe(item => {
      this.dialogRef.close(a);
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  isDirty(): boolean | Observable<boolean> {
    let a = this.form.value;
    a.id = this.data.id;
      return (this.originalData != JSON.stringify(a));
  }
}
