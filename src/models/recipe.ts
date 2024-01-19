import type { Model, ObjectId } from 'mongoose';
import { model, models, Schema } from 'mongoose';

interface RecipeDocument {
  owner: ObjectId;
  name: string;
  ingredients: string;
  instruction: string;
  image?: { url: string; publicId: string };
}

const recipeSchema = new Schema<RecipeDocument>(
  {
    owner: {
      type: Schema.ObjectId,
      ref: 'User',
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
