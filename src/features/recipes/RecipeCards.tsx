import type { RecipeDocument } from '@/models/recipe';

import RecipeCard from './RecipeCard';

interface Props {
  recipes: Array<RecipeDocument>;
}

export default function RecipeCards({ recipes }: Props) {
  return (
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
  );
}
