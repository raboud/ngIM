import { Component, ElementRef } from "@angular/core";
import { DomSanitizer, SafeHtml } from "@angular/platform-browser";

@Component({
  selector: "my-app",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  content: SafeHtml;

  constructor(private elementRef: ElementRef, private sanitizer: DomSanitizer) {
    this.content = this.sanitizer.bypassSecurityTrustHtml(
      '<button type="button" id="submitButton" (click)="openWindow()">Submit</buttn>'
    );
  }
  openWindow() {
    alert("Welcome");
  }
  ngAfterViewChecked() {
    if (this.elementRef.nativeElement.querySelector("#submitButton")) {
      this.elementRef.nativeElement
        .querySelector("#submitButton")
        .addEventListener("click", this.openWindow.bind(this));
    }
  }
}
