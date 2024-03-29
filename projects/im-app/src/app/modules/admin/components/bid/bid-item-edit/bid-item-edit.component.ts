import { AfterViewInit, Component, ElementRef, Inject, OnInit, ViewChildren  } from '@angular/core';
import { FormBuilder, FormControlName, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { fromEvent, merge, Observable } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

import { GenericValidator } from 'randr-lib';

import { BidAreaItemEdit, BidItemEdit } from '../../../models/bidsheet.model';
import { BidSheetService } from '../../../services/bid-sheet.service';

@Component({
  selector: 'app-bid-item-edit',
  templateUrl: './bid-item-edit.component.html',
  styleUrls: ['./bid-item-edit.component.scss']
})

export class BidItemEditComponent implements OnInit, AfterViewInit {
  @ViewChildren(FormControlName, { read: ElementRef })
  formInputElements: ElementRef[] = [];

  displayMessage: { [key: string]: string } = {};
  private validationMessages: { [key: string]: { [key: string]: string } };
  private genericValidator: GenericValidator;
  form: FormGroup = this.fb.group({
    id: [this.data?.bidItemId],
    category: [
      this.data?.item.category,
      [Validators.required, Validators.maxLength(255)],
    ],
    categoryId: [this.data?.item.categoryId],
    description: [this.data?.item.description, [Validators.maxLength(1000)]],
    quantity: [this.data?.quantity],
    unitCost: [this.data?.unitCost],
    ours: [this.data?.ours],
    deleted: [this.data?.deleted],
    row: [this.data?.row]
  });

  constructor(public dialogRef: MatDialogRef<BidItemEditComponent>,
    private service: BidSheetService,
    private fb: FormBuilder,
    //    private currencyPipe: CurrencyPipe,

    @Inject(MAT_DIALOG_DATA) public data: BidAreaItemEdit
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
    a.id = this.data.bidItemId;
    this.dialogRef.close(a);
  }

  onCancel(): void {
    this.dialogRef.close();
  }


  isDirty(): boolean | Observable<boolean> {
    let a = this.form.value;
    a.id = this.data.bidItemId;
    return (JSON.stringify(this.data) != JSON.stringify(a));
  }
}
