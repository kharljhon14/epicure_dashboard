'use client';

import { Pagination } from '@nextui-org/react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import useSWR from 'swr';

import type { GetRecipesResponse } from '@/@types/recipe';
import { PAGINATION_LIMIT } from '@/utils/contansts';
import fetcher from '@/utils/fetcher';

import EmptyRecipes from '../errors/EmptyRecipes';
import RecipeCards from './RecipeCards';
import RecipeCardSkeleton from './RecipeCardSkeleton';

export default function RecipesContainer() {
  const searchParams = useSearchParams();
  const pathName = usePathname();
  const router = useRouter();

  // Get query Params
  const q = searchParams.get('q');
  const pageNumber = searchParams.get('pageNumber');

  const { data, isLoading, error } = useSWR<GetRecipesResponse>(
    `/api/recipes?pageNumber=${pageNumber ?? '1'}&q=${q ?? ''}`,
    fetcher
  );
  const [total, setTotal] = useState<number | null>();

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
    <div>
      {data?.recipes && (
        <div>
          <h1 className="mx-4 mb-8 text-4xl font-extrabold text-gray-800 lg:mx-0">
            {q
              ? `Results for ${q}`
              : 'Welcome to Your Culinary Playground! 🍽️✨'}
          </h1>
          {data.total <= 0 ? (
            <EmptyRecipes />
          ) : (
            <>
              <RecipeCards recipes={data?.recipes} />
              {total && total > PAGINATION_LIMIT && (
                <div className="mt-10 flex items-center justify-center">
                  <Pagination
                    showControls
                    page={parseInt(pageNumber ?? '1', 10)}
                    onChange={(p) => {
                      router.push(`${pathName}?pageNumber=${p}`);
                    }}
                    total={Math.ceil(total / PAGINATION_LIMIT)}
                  />
                </div>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
}
