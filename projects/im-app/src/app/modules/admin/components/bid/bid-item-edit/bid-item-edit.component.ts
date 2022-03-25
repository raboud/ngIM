import {
  AfterViewInit,
  Component,
  ElementRef,
  Inject,
  OnInit,
  ViewChildren,
} from '@angular/core';
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

import { BidItemEdit } from '../../../models/bidsheet.model';
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
    category: [
      this.data.category,
      [Validators.required, Validators.maxLength(255)],
    ],
    description: [this.data.description, [Validators.maxLength(255)]],
    ours: [this.data.ours],
    quantity: [
      this.data.quantity
//        , [Validators.minLength(2), Validators.maxLength(2)],
    ],
    subCategory: [this.data.subCategory, Validators.maxLength(10)],
    unitCost: [this.data.unitCost],
  });

  constructor(    public dialogRef: MatDialogRef<BidItemEditComponent>,
    private service: BidSheetService,
    private fb: FormBuilder,
//    private currencyPipe: CurrencyPipe,

    @Inject(MAT_DIALOG_DATA) public data: BidItemEdit
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
