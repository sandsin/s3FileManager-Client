import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import { environment } from '../../environments/environment';
import { saveAs } from 'file-saver';


@Component({templateUrl: 'home.component.html'})
export class HomeComponent implements OnInit {
    userName: String;
    userId: String;
    signinUrl: String;
    files: FileList;
    viewFiles = false;
    uploadResult: String;
    responseData: any;
    fileList: any;
    userData: any;

    URL: String;

    constructor(private http: HttpClient, private router: Router) {
        this.URL = environment.apiUrl;
    }

    ngOnInit() {
        this.userData = JSON.parse(localStorage.getItem("currentUser"));
        this.userName = this.userData.name;
        this.userId = this.userData.id;
        this.signinUrl = 'login';
        this.onView();
    }

    public onUpload(){
        this.uploadResult = "Uploading!!";
        const fd = new FormData();
        for (let i = 0; i < this.files.length; i++) {
            fd.append('file', this.files[i]);
        }
        this.http.post<ResponseObject>(this.URL+'upload/'+this.userName.replace(/ /g,''),fd).subscribe(data=> this.uploadResult = data[0].responseContent);
        this.onView();
    }

    public onHide(){
        this.viewFiles = false;
    }

    public onView(){
        this.viewFiles = true;
        this.http.get(this.URL+'files/'+this.userName.replace(/ /g,'')).subscribe(data => this.fileList = data);
    }

    public onFileDownload(fileName){
        this.http.get(this.URL+this.userName.replace(/ /g,'')+'/'+fileName, {responseType: 'blob'}).subscribe(data => saveAs(data, fileName))
    }

    public onFileSelected(event){
        this.files = event.target.files;

    }

    public onSignout(){
        localStorage.removeItem("currentUser");
        this.router.navigate([this.signinUrl]);
    }

}

interface ResponseObject {
    responseCode: string;
    responseContent: string;
}
