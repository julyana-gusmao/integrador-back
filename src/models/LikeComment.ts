export interface LikeOrDislikeDB {
    user_id: string,
    comment_id: string,
    like: number
}

export interface LikeOrDislikeModel {
    user_id: string,
    comment_id: string,
    like: number
}

export enum COMMENT_LIKE{
    ALREADY_LIKED = "ALREADY LIKED",
    ALREADY_DISLIKED = "ALREADY DISLIKED"
}

export class LikeOrDislike {
    constructor(
        private userId: string,
        private commentId: string,
        private like: number
    ) { }

    public getUserId(): string {
        return this.userId
    }

    public setUserId(value: string): void {
        this.userId = value
    }

    public getCommentId(): string {
        return this.commentId
    }

    public setCommentId(value: string): void {
        this.commentId = value
    }

    public getLike(): number {
        return this.like
    }

    public setLike(value: number){
        this.like = value
    }

    public toDBModel(): LikeOrDislikeDB {
        return {
            user_id: this.userId,
            comment_id: this.commentId,
            like: this.like
        }
    }

    public toBusinessModel(): LikeOrDislikeModel {
        return {
            user_id: this.userId,
            comment_id: this.commentId,
            like: this.like
        }
    }

}
