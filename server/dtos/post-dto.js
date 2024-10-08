module.exports = class PostDto {
    constructor(model) {
        this.id = model._id.toString();
        this.project = model.project.toString();
        this.status = model.status;
        this.author = model.author.toString();
        this.dateCreated = model.dateCreated;
        this.datePublish = model.datePublish;
        this.social = model.social;
        this.typePost = model.typePost;
        this.params = this.setParams(model);
    }

    setParams(model) {
        const params = model.params;

        if(this.social === "instagram") {

            if (this.typePost === "publication") {
                return {
                    media: params.media,
                    description: params.description,
                    aspectRatio: params.aspectRatio,
                }
            }

            if (this.typePost === "stories") {
                return {
                    media: params.media,
                }
            }

            if (this.typePost === "reels") {
                return {
                    media: params.media,
                    musicTrack: params.musicTrack,
                    description: params.description,
                }
            }

        }

        if(this.social === "tiktok") {

            if (this.typePost === "publication") {
                return {
                    media: params.media,
                    description: params.description,
                }
            }

            if (this.typePost === "stories") {
                return {
                    media: params.media,
                }
            }

        }

        return {}
    }
};
