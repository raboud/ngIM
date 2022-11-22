import { AfterViewInit, Component, ElementRef, Inject, OnInit, ViewChildren  } from '@angular/core';
import { FormBuilder, FormControlName, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { fromEvent, merge, Observable } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

import { GenericValidator } from 'randr-lib';
import { BidSheetService } from '../../../services/bid-sheet.service';
import { SummaryAreaEdit, SummaryItemAreaEdit } from '../../../models/summary.model';

@Component({
  selector: 'app-summary-area-edit',
  templateUrl: './summary-area-edit.component.html',
  styleUrls: ['./summary-area-edit.component.scss']
})
export class SummaryAreaEditComponent implements OnInit, AfterViewInit {
  @ViewChildren(FormControlName, { read: ElementRef })
  formInputElements: ElementRef[] = [];

  displayMessage: { [key: string]: string } = {};
  private validationMessages: { [key: string]: { [key: string]: string } };
  private genericValidator: GenericValidator;
  form: FormGroup = this.fb.group({
    id: [this.data?.bidAreaId],
    description: [this.data?.area.description, [Validators.maxLength(1000)]],
    quantity: [this.data?.quantity],
    unitCost: [this.data?.unitCost],
    ours: [this.data?.ours],
    deleted: [this.data?.deleted],
    row: [this.data?.row]
  });

  constructor(public dialogRef: MatDialogRef<SummaryAreaEditComponent>,
    private fb: FormBuilder,


    @Inject(MAT_DIALOG_DATA) public data: SummaryItemAreaEdit
  ) {
    this.validationMessages = {
      description: {
        maxlength: 'Description cannot exceed 1000 characters.',
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
    a.id = this.data.bidAreaId;
    this.dialogRef.close(a);
  }

  onCancel(): void {
    this.dialogRef.close();
  }


  isDirty(): boolean | Observable<boolean> {
    let a = this.form.value;
    a.id = this.data.bidAreaId;
    console.log(JSON.stringify(this.data));
    console.log(JSON.stringify(a));
    return (JSON.stringify(this.data) != JSON.stringify(a));
  }
}
