import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class AwsS3Service {

  apiURL = environment.backendApi

  constructor(private http: HttpClient) { }

  getPresignedURL(object_name) {
    return this.http.get(this.apiURL + 'get-presigned-url?object_name='+ object_name)
  }

  uplaodFileS3(s3_url, formData) {
    return this.http.post(s3_url, formData)
  }
}
