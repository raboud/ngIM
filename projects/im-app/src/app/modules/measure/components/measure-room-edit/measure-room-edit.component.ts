import { AfterViewInit, Component, ElementRef, Inject, OnInit, ViewChildren } from '@angular/core';
import { FormArray, FormBuilder, FormControlName, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { fromEvent, merge, Observable } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

import { GenericValidator } from 'randr-lib';
import { Cut, MeasureRoomEdit, Transition } from '../../models/measure.model';
import { MeasureService } from '../../services/measure.service';
import { identifierName } from '@angular/compiler';

@Component({
  selector: 'app-measure-room-edit',
  templateUrl: './measure-room-edit.component.html',
  styleUrls: ['./measure-room-edit.component.scss']
})
export class MeasureRoomEditComponent implements OnInit, AfterViewInit {
  @ViewChildren(FormControlName, { read: ElementRef })
  formInputElements: ElementRef[] = [];

  showDeleted = false;



  displayMessage: { [key: string]: string } = {};
  private validationMessages: { [key: string]: { [key: string]: string } };
  private genericValidator: GenericValidator;
  form: FormGroup = this.fb.group({
    id: [this.data?.id],
    room: [this.data?.room],
    description: [this.data?.description],
    disconnected: [this.data?.disconnected],
    leftToRight: [this.data?.leftToRight],
    floor: [this.data?.floor],
    deleted: [this.data?.deleted],
    cuts: this.fb.array([]),
    transitions: this.fb.array([])

  });

  constructor(public dialogRef: MatDialogRef<MeasureRoomEditComponent>,
    private service: MeasureService,
    private fb: FormBuilder,
    //    private currencyPipe: CurrencyPipe,

    @Inject(MAT_DIALOG_DATA) public data: MeasureRoomEdit
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
    console.log("room edit " + JSON.stringify(this.data));
    this.data?.cuts.forEach(cut => {
      this.addCut(cut);
    });
    this.data?.transitions.forEach(transition => {
      this.addTransition(transition);
    });
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
    console.log(a);
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




  get cuts() {
    return this.form.controls["cuts"] as FormArray;
  }

  addCut(cut: Cut | null) {
    console.log(cut);
    if (cut == null) {
      cut = {
        id: 0,
        width: 0,
        length: 0,
        notes: "",
        deleted: false
      }
      this.data.cuts.push(cut)
    }
    const cutForm = this.fb.group({
      id: [cut.id],
      width: [cut.width, Validators.required],
      length: [cut.length, Validators.required],
      deleted: [cut.deleted],
      notes: [cut.notes, Validators.maxLength(1000)]
    });
    this.cuts.push(cutForm);
  }

  deleteCut(cutIndex: number) {
    if (this.data.cuts[cutIndex].id == 0) {
      this.cuts.removeAt(cutIndex);
      this.data.cuts.splice(cutIndex, 1);
    }
    else {
      const cutForm: FormGroup = this.cuts.at(cutIndex) as FormGroup
      cutForm.controls["deleted"].setValue(true);
    }
    this.form.updateValueAndValidity();
  }

  restoreCut(cutIndex: number) {
    const cutForm: FormGroup = this.cuts.at(cutIndex) as FormGroup
    cutForm.controls["deleted"].setValue(false);
    this.form.updateValueAndValidity();
  }

  hideCut(cutIndex: number): boolean {
    return this.isCutDeleted(cutIndex) && !this.isChecked();
  }

  isCutDeleted(cutIndex: number): boolean{
    const cutForm: FormGroup = this.cuts.at(cutIndex) as FormGroup
    return cutForm.controls["deleted"].value;
  }

  get transitions() {
    return this.form.controls["transitions"] as FormArray;
  }


  addTransition(trans: Transition | null) {
    if (trans == null) {
      trans = {
        id: 0,
        type: "",
        length: 0,
        notes: "",
        deleted: false
      }
      this.data.transitions.push(trans)
      console.log("Adding Transition");
      console.log(this.data.transitions)
    }

    const transForm = this.fb.group({
      id: [trans.id],
      type: [trans.type, Validators.required],
      length: [trans.length, Validators.required],
      deleted: [trans.deleted],
      notes: [trans.notes, Validators.maxLength(1000)]
    });
    this.transitions.push(transForm);
  }


  deleteTransition(transIndex: number) {
    if (this.data.transitions[transIndex].id == 0) {
      this.transitions.removeAt(transIndex);
      this.data.transitions.splice(transIndex, 1);
    }
    else {
      const transForm: FormGroup = this.transitions.at(transIndex) as FormGroup
      transForm.controls["deleted"].setValue(true);
    }
    this.form.updateValueAndValidity();



  }

  restoreTransition(transIndex: number) {
    const transForm: FormGroup = this.transitions.at(transIndex) as FormGroup
    transForm.controls["deleted"].setValue(false);
    this.form.updateValueAndValidity();
  }

  hideTransition(transIndex: number): boolean {
    return this.isTransationDeleted(transIndex) && !this.isChecked();
  }

  isTransationDeleted(transIndex: number): boolean {
    const transForm: FormGroup = this.transitions.at(transIndex) as FormGroup
    return transForm.controls["deleted"].value;
  }

  isChecked() : boolean {
    return this.showDeleted;
  }

}
