import { Component } from '@angular/core';
import { FileTransfer, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { File } from '@ionic-native/file/ngx';
var FileSaver = require('file-saver');
import { Downloader, NotificationVisibility, DownloadRequest } from '@ionic-native/downloader/ngx';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private transfer: FileTransfer, private file: File, private downloader: Downloader) { }


  downloadFIle() {
    const url = 'https://user-images.githubusercontent.com/34903895/43353240-485f2400-925d-11e8-8c8f-48cea702a9a4.png';
    const fileTransfer: FileTransferObject = this.transfer.create();
    console.log('download inicio: ');
    fileTransfer.download(url, this.file.dataDirectory + 'arquivo.png').then((entry) => {
      console.log('download complete: ' + entry.toURL());
      console.log('salvo em', this.file.dataDirectory)
    }, (error) => {
      console.log('download error: ', error);
    });
  }

  downOther() {
    console.log('download complete: 1');

    var file = new File();

    var blob = new Blob(["Hello, world!"], { type: "text/plain;charset=utf-8" });
    FileSaver.saveAs(blob, "hello world.txt");


    console.log('download complete: 2');
  }

  saveMore() {
    var request: DownloadRequest = {
      uri: 'https://user-images.githubusercontent.com/34903895/43353240-485f2400-925d-11e8-8c8f-48cea702a9a4.png',
      title: 'MyDownload',
      description: '',
      mimeType: '',
      visibleInDownloadsUi: true,
      notificationVisibility: NotificationVisibility.VisibleNotifyCompleted,
      destinationInExternalFilesDir: {
        dirType: 'Downloads',
        subPath: 'MyFile.apk'
      }
    };


    this.downloader.download(request)
      .then((location: string) => console.log('File downloaded at:' + location))
      .catch((error: any) => console.error(error));
  }

}
