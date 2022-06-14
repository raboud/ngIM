import { AfterViewInit, Component, ElementRef, Inject, OnInit, ViewChildren  } from '@angular/core';
import { UntypedFormBuilder, FormControlName, UntypedFormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { fromEvent, merge, Observable } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

import { GenericValidator } from 'randr-lib';
import { MeasureItemEdit } from '../../models/measure.model';
import { MeasureService } from '../../services/measure.service';

@Component({
  selector: 'app-measure-item-edit',
  templateUrl: './measure-item-edit.component.html',
  styleUrls: ['./measure-item-edit.component.scss']
})
export class MeasureItemEditComponent implements OnInit, AfterViewInit {
  @ViewChildren(FormControlName, { read: ElementRef })
  formInputElements: ElementRef[] = [];

  displayMessage: { [key: string]: string } = {};
  private validationMessages: { [key: string]: { [key: string]: string } };
  private genericValidator: GenericValidator;
  form: UntypedFormGroup = this.fb.group({
    id: [this.data?.id ],
    material: [this.data?.material,  [Validators.required, Validators.maxLength(255)]],
    deleted: [this.data?.deleted],
    rolledGoods: [this.data?.rolledGoods],
    width: [this.data?.width]

  });

  constructor(public dialogRef: MatDialogRef<MeasureItemEditComponent>,
    private fb: UntypedFormBuilder,
    //    private currencyPipe: CurrencyPipe,

    @Inject(MAT_DIALOG_DATA) public data: MeasureItemEdit
  ) {
    this.validationMessages = {
      material: {
        required: 'Username is required.',
        minlength: 'Username must be at least three characters.',
        maxlength: 'Username cannot exceed 50 characters.',
      },
    };
    this.genericValidator = new GenericValidator(this.validationMessages);
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
    this.dialogRef.close(a);
  }

  onCancel(): void {
    this.dialogRef.close();
  }


  isDirty(): boolean | Observable<boolean> {
    let a = this.form.value;
    a.id = this.data.id;

 //   console.log(JSON.stringify(this.data));
 //   console.log(JSON.stringify(a));

    return (JSON.stringify(this.data) != JSON.stringify(a));
  }

  hideWidth() :boolean {
    console.log(this.form.controls["rolledGoods"].value)
    return !this.form.value.rolledGoods ;
  }
}
