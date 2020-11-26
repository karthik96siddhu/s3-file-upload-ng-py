import { Component } from '@angular/core';
import { AwsS3Service } from './services/aws-s3.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 's3-file-upload';

  uploadFile: File;
  presignedAWSURL;

  constructor(private awsService: AwsS3Service) {

  }

  handleFileInput(files: FileList) {
    // if more than one file loop through it
    this.uploadFile = files.item(0)
    console.log(this.uploadFile.name);
    this.awsService.getPresignedURL(this.uploadFile.name)
    .subscribe((res: any) => {
      if (res.status) {
        this.presignedAWSURL = res.data
      } else {
        alert(res.msg)
      }
      
    },
    (error) => {
      console.log(error);
      alert(error)
    })
    
  }

  uploadFileS3() {
    if (this.uploadFile) {
      const formData = new FormData();
      formData.append('key', this.presignedAWSURL.fields.key);
      formData.append('AWSAccessKeyId', this.presignedAWSURL.fields.AWSAccessKeyId);
      formData.append('policy', this.presignedAWSURL.fields.policy);
      formData.append('signature', this.presignedAWSURL.fields.signature);
      // make sure adding file at the end
      formData.append('file', this.uploadFile, this.uploadFile.name)
      this.awsService.uplaodFileS3(this.presignedAWSURL.url, formData)
      .subscribe((res: any) => {
        // if file uploaded sucessfully it will return 'null'
        console.log(res);
      },
      (error) => {
        console.log(error);
        alert(error)
      })
    } else {
      alert('please upload file')
    }
  }
}
