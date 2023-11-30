export class CreatePostsDto{
    readonly title: string;
    readonly content: string;
    author: string[];
    readonly category: string[];
}