import type { ObjectId } from 'mongoose';
import { model, models, Schema } from 'mongoose';

interface RecipeDocument {
  _id: ObjectId;
  onwer: ObjectId;
  name: string;
  ingredients: Array<string>;
  instruction: string;
  image: { url: string; publicId: string };
}

const recipeSchema = new Schema<RecipeDocument>({
  onwer: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  ingredients: {
    type: [String],
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
});

const Recipe = models.Recipe || model('Recipe', recipeSchema);

export default Recipe;
