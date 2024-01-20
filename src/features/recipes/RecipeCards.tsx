import useSWR from 'swr';

import type { GetRecipesResponse } from '@/@types/recipe';

import RecipeCard from './RecipeCard';
import RecipeCardSkeleton from './RecipeCardSkeleton';

export default function RecipeCards() {
  const { data, isLoading, error } = useSWR<GetRecipesResponse>('/api/recipes');

  if (error) return <div>Failed to load</div>;
  if (isLoading)
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <RecipeCardSkeleton />
        <RecipeCardSkeleton />
        <RecipeCardSkeleton />
        <RecipeCardSkeleton />
        <RecipeCardSkeleton />
        <RecipeCardSkeleton />
        <RecipeCardSkeleton />
        <RecipeCardSkeleton />
      </div>
    );

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {data?.recipes?.map((recipe) => (
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
