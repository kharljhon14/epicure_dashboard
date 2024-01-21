import type { RecipeDocument } from '@/models/recipe';

export interface GetRecipesResponse {
  status: string;
  recipes: Array<RecipeDocument>;
  total: number;
}

export interface GetRecipeResponse {
  recipe: RecipeDocument;
}
