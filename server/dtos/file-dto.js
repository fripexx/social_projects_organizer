module.exports = class FileDto {
    constructor(model) {
        this.id = model._id;
        this.mimetype = model.mimetype;
        this.dateCreated = model.dateCreated;
        this.path = model.path;
        this.belongTo = {
            id: model.belongTo.id,
            model: model.belongTo.model
        }

        if(model?.cropped) this.getCropped(model.cropped)
    }

    getCropped(obj) {
        try {
            if(obj) {
                const cropped = obj.toObject();
                const returnData = {};

                for (const key in cropped) {
                    if (cropped.hasOwnProperty(key)) {
                        const croppedPath = cropped[key];

                        if (key !== "_id" && croppedPath) {
                            returnData[key] = croppedPath;
                        }
                    }
                }

                this.cropped = returnData;
            }
        } catch (e) {
            console.error(e);
        }
    }

};
