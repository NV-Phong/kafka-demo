import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({ require: true })
  username: string;
  @Prop({ require: true })
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
