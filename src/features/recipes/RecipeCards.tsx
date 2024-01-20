import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import useSWR from 'swr';

import type { GetRecipesResponse } from '@/@types/recipe';

import RecipeCard from './RecipeCard';
import RecipeCardSkeleton from './RecipeCardSkeleton';
import RecipeSearch from './RecipeSearch';

interface Props {
  setTotal(value: number): void;
}

export default function RecipeCards({ setTotal }: Props) {
  const searchParams = useSearchParams();

  const q = searchParams.get('q');
  const pageNumber = searchParams.get('pageNumber');

  const { data, isLoading, error } = useSWR<GetRecipesResponse>(
    `/api/recipes?pageNumber=${pageNumber ?? '1'}&q=${q ?? ''}`
  );

  useEffect(() => {
    if (data) {
      setTotal(data.total);
    }
  }, [data]);

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
    </div>
  );
}
