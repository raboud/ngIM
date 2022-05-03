import { HttpClient, HttpEventType } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-image-container',
  templateUrl: './images-container.component.html',
  styleUrls: ['./images-container.component.scss']
})
export class ImagesContainerComponent implements OnInit {
  @Input() jobId: number = 0;
  @Input() type: string = "";

  processing: boolean = false;
  progress: number = 0;
  message: string | undefined;

  constructor(    private route: ActivatedRoute, private http: HttpClient) {
   }

  ngOnInit(): void {
  }


  onDragOver(event: any) {
    console.log("onDragOver " + event)
    event.preventDefault();
  }

  onDropSuccess(event: any) {
    console.log("onDropSuccess " + event)
    event.preventDefault();

    this.onFileChange(event.dataTransfer.files);
  }

  onChange(event:any ) {
    console.log("onChange " + event)
    this.onFileChange(event.target.files);
  }

  private onFileChange(files: FileList) {
    console.log("onFileChange " + files)
    this.progress = 0;
    this.message = undefined;

    if (files.length === 0) {
      console.log('no files');
      return;
    }

    const formData = new FormData();

    let index: number = 0;

    while (index < files.length)
    {
      console.log(files[index]);
        formData.append('files', files[index], files[index].name);
        index++;
     }

     console.log(formData);

    this.http.post(`https://localhost:5001/api/job/${this.jobId}/images/${this.type}`, formData, {reportProgress: true, observe: 'events'})
      .subscribe(event => {
        if (event.type === HttpEventType.UploadProgress)
          this.progress = Math.round(100 * event.loaded /(event.total ?? 0));
        else if (event.type === HttpEventType.Response) {
          this.message = 'Upload success.';
          this.progress = 0;
//          this.onUploadFinished.emit(event.body);
        }
      });
  }

}
