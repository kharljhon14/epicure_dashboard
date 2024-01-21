import type { RecipeDocument } from '@/models/recipe';

import RecipeCard from './RecipeCard';
import RecipeFormConatainer from './RecipeFormContainer';

interface Props {
  recipes: Array<RecipeDocument>;
}

export default function RecipeCards({ recipes }: Props) {
  return (
    <div className="space-y-6">
      <div className="mx-6 flex items-center justify-between">
        <h1 className=" mb-4 text-3xl font-bold text-gray-800 lg:mx-2">
          Recipes
        </h1>
        <RecipeFormConatainer />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {recipes?.map((recipe) => (
          <div
            key={recipe._id.toString()}
            className="flex items-center justify-center"
          >
            <RecipeCard recipe={recipe} />
          </div>
        ))}
      </div>
    </div>
  );
}
