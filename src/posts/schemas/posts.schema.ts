import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";


@Schema({ timestamps: true })
export class Post {

    @Prop({ type: String, required: true })
    title: string;

    @Prop({ type: String, required: true })
    content: string;

    @Prop({ type: [String], required: true })
    author: string[];

    @Prop({ type: [String], required: true })
    category: string[];
}

export const PostSchema = SchemaFactory.createForClass(Post);