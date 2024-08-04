const mongoose = require("mongoose");
const FileDto = require("./file-dto");
const { ObjectId } = mongoose.Types;

module.exports = class DocumentDto {
    constructor(model) {
        this.id = model._id.toString();
        this.project = model.project.toString();
        this.name = model.name;
        this.dateUpload = model.dateUpload;
        this.file = this.convertFile(model.file);
    }

    convertFile(file) {
        if(!file) return null

        if(file instanceof ObjectId) return file.toString();

        if(file?._id instanceof ObjectId) return new FileDto(file)

        return null;
    }
};
