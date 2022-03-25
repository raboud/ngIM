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
  FormBuilder,
  FormControlName,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { fromEvent, merge, Observable } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

import { GenericValidator } from 'randr-lib';

import { JobEdit, Address } from '../../../models/job-edit.model';
import { JobService } from '../../../services/job.service';

@Component({
  selector: 'app-job-edit',
  templateUrl: './job-edit.component.html',
  styleUrls: ['./job-edit.component.scss'],
})
export class JobEditComponent implements OnInit, AfterViewInit {
  @ViewChildren(FormControlName, { read: ElementRef })
  formInputElements: ElementRef[] = [];

  displayMessage: { [key: string]: string } = {};
  private validationMessages: { [key: string]: { [key: string]: string } };
  private genericValidator: GenericValidator;
  form: FormGroup = this.fb.group({
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
    projectEndDate: [
      formatDate(this.data.projectEndDate, 'yyyy-MM-dd', 'en'),
    ],
  });

  constructor(
    public dialogRef: MatDialogRef<JobEditComponent>,
    private service: JobService,
    private fb: FormBuilder,
    private currencyPipe: CurrencyPipe,

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
  }

  ngOnInit(): void {
    const currency = this.currencyPipe.transform(this.data.renovationBudget)
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
    console.log(this.form.value);
    //    this.service.put(this.data.id, this.data).subscribe(item => {
    //      this.dialogRef.close(this.data);
    //    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
