import { AfterViewInit, Component, ElementRef, Inject, OnInit, ViewChildren  } from '@angular/core';
import { UntypedFormBuilder, FormControlName, UntypedFormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { fromEvent, merge, Observable } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

import { GenericValidator } from 'randr-lib';
import { BidSheetService } from '../../../services/bid-sheet.service';
import { BidAreaEdit } from '../../../models/bidsheet.model';

@Component({
  selector: 'app-bid-area-edit',
  templateUrl: './bid-area-edit.component.html',
  styleUrls: ['./bid-area-edit.component.scss']
})
export class BidAreaEditComponent implements OnInit, AfterViewInit {
  @ViewChildren(FormControlName, { read: ElementRef })
  formInputElements: ElementRef[] = [];

  displayMessage: { [key: string]: string } = {};
  private validationMessages: { [key: string]: { [key: string]: string } };
  private genericValidator: GenericValidator;
  form: UntypedFormGroup = this.fb.group({
    id: [this.data?.id],
    name: [this.data?.name, [Validators.required, Validators.maxLength(50)]],
    description: [this.data?.description, [Validators.maxLength(200)]],
    notes: [this.data?.notes, [Validators.maxLength(2000)]],
    row: [this.data?.row],
    deleted: [this.data?.deleted]
  });

  constructor(public dialogRef: MatDialogRef<BidAreaEditComponent>,
    private fb: UntypedFormBuilder,


    @Inject(MAT_DIALOG_DATA) public data: BidAreaEdit
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
    console.log(JSON.stringify(this.data));
    console.log(JSON.stringify(a));
    return (JSON.stringify(this.data) != JSON.stringify(a));
  }
}
