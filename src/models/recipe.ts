import type { Model, ObjectId } from 'mongoose';
import { model, models, Schema } from 'mongoose';

export interface RecipeDocument {
  _id: ObjectId;
  owner: { id: ObjectId; name: string };
  name: string;
  ingredients: string;
  instruction: string;
  image?: { url: string; publicId: string };
  createdAt: Date;
}

const recipeSchema = new Schema<RecipeDocument>(
  {
    owner: {
      type: Object,
      id: {
        type: Schema.ObjectId,
        ref: 'User',
      },
      name: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    ingredients: {
      type: String,
      required: true,
    },
    instruction: {
      type: String,
      required: true,
    },
    image: {
      type: Object,
      url: String,
      publicId: String,
    },
  },
  { timestamps: true }
);

const Recipe = models.Recipe || model('Recipe', recipeSchema);

export default Recipe as Model<RecipeDocument>;
