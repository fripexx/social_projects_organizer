module.exports = class FileDto {
    constructor(model) {
        this.id = model._id.toString();
        this.type = model.type;
        this.extension = model.extension;
        this.mimetype = model.mimetype;
        this.dateCreated = model.dateCreated;
        this.path = model.path;
        this.belongTo = {
            id: model.belongTo.id.toString(),
            model: model.belongTo.model
        }
        this.author = model.author.toString();
        this.name = model.name;

        if(model?.cropped) this.addCropped(model.cropped)
    }

    addCropped(cropped) {
        try {
            if(cropped) {
                const returnData = {};

                for (const key in cropped) {
                    if (cropped.hasOwnProperty(key)) if (key !== "_id" && cropped[key]) returnData[key] = cropped[key];
                }

                this.cropped = returnData;
            }
        } catch (e) {
            console.error(e);
        }
    }

};
