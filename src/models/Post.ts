export interface PostDB {
    id: string,
    creator_id: string,
    content: string,
    likes: number,
    dislikes: number,
    comments: number,
    created_at: string,
    updated_at: string
}

export interface PostDBWithCreator extends PostDB{
    creator_username: string
}

export interface PostModel {
    id: string,
    content: string,
    likes: number,
    dislikes: number,
    comments: number,
    createdAt: string,
    updatedAt: string,
    creator: {
        id: string,
        username: string
    }
}

export class Post {
    constructor(
        private id: string,
        private content: string,
        private likes: number,
        private dislikes: number,
        private comments: number,
        private createdAt: string,
        private updatedAt: string,
        private creatorId: string,
        private creatorUsername: string
    ) { }

    public getId(): string {
        return this.id
    }

    public setId(value: string): void {
        this.id = value
    }

    public getContent(): string {
        return this.content
    }

    public setContent(value: string): void {
        this.content = value
    }

    public getLikes(): number {
        return this.likes
    }

    public setLikes(value: number): void {
        this.likes = this.likes + value
    }

    public getDislikes(): number {
        return this.dislikes
    }

    public setDislikes(value: number): void {
        this.dislikes = this.dislikes + value
    }

    public addLike = (): void => {
        this.likes++
    }

    public removeLike = (): void => {
        this.likes--
        if(this.likes === 0) {
            this.likes = 0
        }
    }

    public addDislike = (): void => {
        this.dislikes++
    }

    public removeDislike = (): void => {
        this.dislikes--
        if(this.dislikes === 0) {
            this.dislikes = 0
        }
    }

    public getComments(): number {
        return this.comments
    }

    public setComments(value: number): void {
        this.comments = this.comments + value
    }

    public addComment = (): void => {
        this.comments++
    }

    public removeComment = (): void => {
        this.comments--
        if(this.comments === 0) {
            this.comments = 0
        }
    }

    public getCreatedAt(): string {
        return this.createdAt
    }

    public setCreatedAt(value: string): void {
        this.createdAt = value
    }

    public getUpdatedAt(): string {
        return this.updatedAt
    }

    public setUpdatedAt(value: string): void {
        this.updatedAt = value
    }

    public getCreatorId(): string {
        return this.creatorId
    }

    public setCreatorId(value: string): void {
        this.creatorId = value
    }

    public getCreatorUsername(): string {
        return this.creatorUsername
    }

    public setCreatorUsername(value: string): void {
        this.creatorUsername = value
    }


    public toDBModel(): PostDB {
        return {
            id: this.id,
            creator_id: this.creatorId,
            content: this.content,
            likes: this.likes,
            dislikes: this.dislikes,
            comments: this.comments,
            created_at: this.createdAt,
            updated_at: this.updatedAt
        }
    }

    public toBusinessModel(): PostModel {
        return {
            id: this.id,
            content: this.content,
            likes: this.likes,
            dislikes: this.dislikes,
            comments: this.comments,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt,
            creator: {
                id: this.creatorId,
                username: this.creatorUsername
            }
            }
        }
    }
