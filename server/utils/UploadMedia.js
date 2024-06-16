const sharp = require('sharp');
const path = require('path');
const fs = require('fs');
const mime = require('mime-types');
const iconv = require('iconv-lite');
const uuid = require('uuid');

class UploadMedia {
    sizes = [
        {width: 300, height: 300},
        {width: 600, height: 600},
        {width: 1080, height: 1080}
    ];

    constructor(file, uploadDir) {
        this.file = file;
        this.typeMedia = this.getTypeMedia();
        this.extension = this.getExtension();
        this.dateNow = Date.now();
        this.uuidName = uuid.v4();
        this.fileName = this.getFileName();
        this.dirPath = this.getDirPath(uploadDir);
        this.filePath = this.getFilePath();

        if (this.typeMedia === "image") this.cropped = this.addCropped()
    }

    getTypeMedia() {
        return this.file.mimetype.split('/')[0];
    }

    getExtension() {
        return mime.extension(this.file.mimetype)
    }

    getFileName() {
        if(this.file.mimetype.includes("image") || this.file.mimetype.includes("video")) {
            return `${this.uuidName}.${this.extension}`
        }

        return iconv.decode(Buffer.from(this.file.name, 'binary'), 'utf-8');
    }

    addCropped() {
        const cropped = [];

        for (const size of this.sizes) {
            const croppedFileName = `${this.uuidName}-${size.width}x${size.height}.${this.extension}`;

            cropped.push({
                size, path: {
                    full: `${this.dirPath.full}/${croppedFileName}`,
                    relative: `${this.dirPath.relative}/${croppedFileName}`
                }
            })
        }

        return cropped;
    }

    getDirPath(uploadDir) {
        return {
            full: path.resolve(uploadDir).replace(/\\/g, '/'),
            relative: uploadDir
        };
    }

    getFilePath() {
        return {
            full: `${this.dirPath.full}/${this.fileName}`,
            relative: `${this.dirPath.relative}/${this.fileName}`
        };
    }

    getData() {
        const data = {
            ...this.file,
            name: this.fileName,
            type: this.typeMedia,
            extension: this.extension,
            path: {
                original: this.filePath.relative,
            }
        }

        if (this.typeMedia === "image" && this.cropped) {
            const cropped = {}

            this.cropped.forEach(crop => cropped[`${crop.size.width}`] = crop.path.relative)
            data.path.cropped = cropped
        }

        return data;
    }

    async saveFile() {
        try {
            if (!fs.existsSync(this.dirPath.full)) fs.mkdirSync(this.dirPath.full, {recursive: true});

            await this.file.mv(this.filePath.full);
            //await fs.writeFile(this.filePath.full, this.file.data, () => {})

            if (this.typeMedia === "image" && this.cropped) {
                for (const crop of this.cropped) {
                    await sharp(this.filePath.full)
                        .resize(crop.size.width, crop.size.height, {
                            fit: 'inside',
                        })
                        .toFile(crop.path.full);
                }
            }
        } catch (error) {
            console.error("Помилка збереження файлу:", this.file, error);
            throw error;
        }
    }

}

module.exports = UploadMedia;
