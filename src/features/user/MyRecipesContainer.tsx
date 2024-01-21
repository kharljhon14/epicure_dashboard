'use client';

import { Pagination } from '@nextui-org/react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import useSWR from 'swr';

import type { GetRecipesResponse } from '@/@types/recipe';
import type { GetUserResponse } from '@/@types/user';
import { PAGINATION_LIMIT } from '@/utils/contansts';
import fetcher from '@/utils/fetcher';

import RecipeCards from '../recipes/RecipeCards';
import RecipeCardSkeleton from '../recipes/RecipeCardSkeleton';
import RecipeFormContainer from '../recipes/RecipeFormContainer';

export default function MyRecipesContainer() {
  const searchParams = useSearchParams();
  const pathName = usePathname();
  const router = useRouter();

  // Get query Params
  const q = searchParams.get('q');
  const pageNumber = searchParams.get('pageNumber');

  const { data: userData } = useSWR<GetUserResponse>('/api/user', fetcher);
  const { data, isLoading, error, mutate } = useSWR<GetRecipesResponse>(
    `/api/recipes?pageNumber=${pageNumber ?? '1'}&q=${q ?? ''}&owner=${userData?.user?.id}`,
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
        <>
          <div className="mb-6 flex flex-col items-center justify-between">
            <h1 className=" mb-6 text-center text-2xl font-extrabold text-gray-600 lg:text-left lg:text-3xl">
              🌱 Your Delicious Creations, {userData?.user.name}!
            </h1>
            <RecipeFormContainer mutate={mutate} />
          </div>

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
  );
}
