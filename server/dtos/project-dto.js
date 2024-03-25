const FileModel = require("../models/file-model");
const UserModel = require("../models/user-model");
const FileDto = require("./file-dto");
module.exports = class ProjectDto {
    #logoID;
    logo = null;
    #files = {
        brif: null,
        contract: null,
        strategy: null,
    };
    files = {
        brif: null,
        contract: null,
        strategy: null,
    };
    constructor(model) {
        this.id = model._id;
        this.isActive = model.isActive;
        this.name = model.name;
        this.administrator = model.administrator;
        this.customer = model.customer;
        this.team = model.team;
        this.color = model.color;
        this.instagramTokenAPI = model.instagramTokenAPI;
        this.linkFigma = model.linkFigma;
        this.linkCanva = model.linkCanva;
        this.workingHours = {
            from: model.workingHours.from,
            to: model.workingHours.to,
        };
        this.workingDays = model.workingDays;
        this.notes = model.notes;
        this.#logoID = model.logo;
        this.#files = {
            brif: model.files.brif,
            contract: model.files.contract,
            strategy: model.files.strategy,
        };
    }
    async setPhotoData() {
        try {
            const fileModel = await FileModel.findById(this.#logoID);

            if(fileModel) this.logo = new FileDto(fileModel);
        } catch (error) {
            console.error("Помилка при отриманні фотографії:", error);
        }
    }

    async setCustomerData() {
        try {
            if(this.customer) {
                const findUser = await UserModel.findById(this.customer);

                if(findUser) {
                    this.customerData = {
                        name: findUser.name,
                        surname: findUser.surname,
                        email: findUser.email,
                        phone: findUser.phone,
                    };
                }
            }

        } catch (error) {
            console.error("Помилка при отриманні фотографії:", error);
        }
    }

    async setFilesData(){
        try {
            if(this.#files.brif) {
                const brifModel = await FileModel.findById(this.#files.brif);
                if(brifModel) this.files.brif = new FileDto(brifModel)
            }

            if(this.#files.contract) {
                const contractModel = await FileModel.findById(this.#files.contract);
                if(contractModel) this.files.brif = new FileDto(contractModel)
            }

            if(this.#files.strategy) {
                const strategyModel = await FileModel.findById(this.#files.strategy);
                if(strategyModel) this.files.brif = new FileDto(strategyModel)
            }
        } catch (error) {
            console.error("Помилка при отриманні файлів:", error);
        }
    }
};
