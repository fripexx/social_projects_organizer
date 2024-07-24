import { FileType } from "../store/types/FileType";
import JSZip from "jszip";
import FileService from "../api/services/FileService";
import { saveAs } from "file-saver";

interface FileDownloaderType {
    url: string;
    name: string;
}

class FileDownloader {
    private readonly files: FileDownloaderType[] = [];

    constructor(files: FileType | FileType[]) {
        if (Array.isArray(files)) {
            this.files = files.map(item => ({
                url: `${process.env.REACT_APP_API_URL}/${item.path}`,
                name: item.name,
            }));
        } else {
            this.files = [{
                url: `${process.env.REACT_APP_API_URL}/${files.path}`,
                name: files.name,
            }];
        }
    }

    async downloadFiles(): Promise<void> {

        if (this.files.length === 1) {

            /**
             * Завантаження одного файлу без архіву
             */

            try {
                const file = this.files[0];
                const blob = await FileService.getFile(file.url);

                saveAs(blob, file.name);
            } catch (error) {
                console.error('Помилка завантаженя файлу:', error);
            }

        } else {

            /**
             * Завантаження декількох файлів з архівом
             */

            const zip = new JSZip();

            for (let file of this.files) {
                try {
                    const blob = await FileService.getFile(file.url);

                    zip.file(file.name, blob);
                } catch (error) {
                    console.error('Помилка завантаженя файлів:', error);
                }
            }

            try {
                const content = await zip.generateAsync({ type: 'blob' });

                saveAs(content, 'files.zip');
            } catch (error) {
                console.error('Помилка створення архіву:', error);
            }

        }
    }
}

export default FileDownloader;
