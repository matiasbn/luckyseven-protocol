import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Route extends Document {
  @Prop({ required: true })
  route: string;

  @Prop({ required: true })
  distance: number;
}

export const RouteSchema = SchemaFactory.createForClass(Route);
