const mongoose = require("mongoose")
const FileDto = require("./file-dto");
const UserDto = require("./user-dto");
const { ObjectId } = mongoose.Types;
module.exports = class ProjectDto {
    files = {
        brif: null,
        contract: null,
        strategy: null,
    };
    constructor(model) {
        this.id = model._id;
        this.isActive = model.isActive;
        this.name = model.name;
        this.logo = this.convertLogo(model.logo)
        this.administrator = model.administrator.toString();
        this.customer = this.convertCustomer(model.customer);
        this.team = this.convertTeam(model.team);
        this.color = model.color;
        this.instagram = model.instagram;
        this.instagramTokenAPI = model.instagramTokenAPI;
        this.facebook = model.facebook;
        this.tiktok = model.tiktok;
        this.linkFigma = model.linkFigma;
        this.linkCanva = model.linkCanva;
        this.workingHours = {
            from: model.workingHours.from,
            to: model.workingHours.to,
        };
        this.workingDays = model.workingDays;
        this.notes = model.notes;
    }

    convertLogo(logo) {
        if(!logo) return null

        if(logo instanceof ObjectId) return logo

        if(logo?._id instanceof ObjectId) return new FileDto(logo)

        return null;
    }

    convertCustomer(user) {
        if(!user) return null

        if(user instanceof ObjectId) return user.toString()

        if(user?._id instanceof ObjectId) return new UserDto(user, 'basic')

        return null
    }

    convertTeam(team) {
        return team.map(teamMember => ({user: teamMember.user.toString(), role: teamMember.role}))
    }
};
