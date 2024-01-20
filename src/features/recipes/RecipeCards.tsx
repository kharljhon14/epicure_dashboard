import { Pagination } from '@nextui-org/react';
import { useSearchParams } from 'next/navigation';
import useSWR from 'swr';

import type { GetRecipesResponse } from '@/@types/recipe';

import RecipeCard from './RecipeCard';
import RecipeCardSkeleton from './RecipeCardSkeleton';
import RecipeSearch from './RecipeSearch';

export default function RecipeCards() {
  const searchParams = useSearchParams();
  const q = searchParams.get('q');

  const { data, isLoading, error } = useSWR<GetRecipesResponse>(
    `/api/recipes?q=${q ?? ''}`
  );

  if (error) return <div>Failed to load</div>;
  if (isLoading)
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <div className="flex items-center justify-center">
          <RecipeCardSkeleton />
        </div>
        <div className="flex items-center justify-center">
          <RecipeCardSkeleton />
        </div>
        <div className="flex items-center justify-center">
          <RecipeCardSkeleton />
        </div>
        <div className="flex items-center justify-center">
          <RecipeCardSkeleton />
        </div>
        <div className="flex items-center justify-center">
          <RecipeCardSkeleton />
        </div>
        <div className="flex items-center justify-center">
          <RecipeCardSkeleton />
        </div>
        <div className="flex items-center justify-center">
          <RecipeCardSkeleton />
        </div>
        <div className="flex items-center justify-center">
          <RecipeCardSkeleton />
        </div>
      </div>
    );

  return (
    <div className="space-y-6">
      <RecipeSearch />
      {/* <RecipeForm /> */}
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
      <Pagination
        total={data?.recipes.length ?? 0}
        initialPage={1}
      />
    </div>
  );
}
