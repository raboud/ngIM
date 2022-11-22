import { AfterViewInit, Component, ElementRef, Inject, OnInit, ViewChildren  } from '@angular/core';
import { FormBuilder, FormControlName, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { fromEvent, merge, Observable } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

import { GenericValidator } from 'randr-lib';

import { SummaryItemEdit } from '../../../models/summary.model';
import { BidSheetService } from '../../../services/bid-sheet.service';

@Component({
  selector: 'app-summary-item-edit',
  templateUrl: './summary-item-edit.component.html',
  styleUrls: ['./summary-item-edit.component.scss']
})

export class SummaryItemEditComponent implements OnInit, AfterViewInit {
  @ViewChildren(FormControlName, { read: ElementRef })
  formInputElements: ElementRef[] = [];

  displayMessage: { [key: string]: string } = {};
  private validationMessages: { [key: string]: { [key: string]: string } };
  private genericValidator: GenericValidator;
  form: FormGroup = this.fb.group({
    id: [this.data?.id],
    categoryId: [this.data?.categoryId],
    description: [this.data?.description, [Validators.maxLength(200)]],
  });

  constructor(public dialogRef: MatDialogRef<SummaryItemEditComponent>,
    private service: BidSheetService,
    private fb: FormBuilder,
    //    private currencyPipe: CurrencyPipe,

    @Inject(MAT_DIALOG_DATA) public data: SummaryItemEdit
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
    a.id = this.data.id;
    this.dialogRef.close(a);
  }

  onCancel(): void {
    this.dialogRef.close();
  }


  isDirty(): boolean | Observable<boolean> {
    let a = this.form.value;
    a.id = this.data.id;
    return (JSON.stringify(this.data) != JSON.stringify(a));
  }
}
