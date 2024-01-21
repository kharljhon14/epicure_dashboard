'use client';

import Image from 'next/image';
import { IoImageOutline } from 'react-icons/io5';
import useSWR from 'swr';

import type { GetRecipeResponse } from '@/@types/recipe';
import fetcher from '@/utils/fetcher';

interface Props {
  id: string;
}

export default function RecipeInformation({ id }: Props) {
  const { data, isLoading, error } = useSWR<GetRecipeResponse>(
    `/api/recipes/${id}`,
    fetcher
  );
  if (error) return <div>Failed to load</div>;
  if (isLoading) return <div>Loading</div>;
  return (
    <div className="px-4">
      <div className="mb-6 flex flex-col space-y-1">
        <h1 className="text-4xl font-semibold">{data?.recipe.name}</h1>
        <span>By {data?.recipe.owner.name}</span>
      </div>

      <div className="flex flex-col space-y-6 lg:flex-row lg:space-x-6 lg:space-y-0">
        <div className="space-y-6">
          <div className="relative h-96 w-full overflow-hidden rounded-md lg:w-96">
            {data?.recipe.image ? (
              <Image
                fill
                src={data?.recipe.image?.url}
                loading="lazy"
                placeholder="blur"
                blurDataURL="/1x1.png"
                alt={data?.recipe.name}
                sizes="(max-width):760px 100vw 700px"
                style={{
                  objectFit: 'cover',
                  objectPosition: 'center',
                }}
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-neutral-100 text-neutral-500">
                <IoImageOutline size={89} />
              </div>
            )}
          </div>

          <div className="">
            <h2 className="text-2xl font-semibold">Ingredients</h2>
            <p className=" whitespace-pre-line">{data?.recipe.ingredients}</p>
          </div>
        </div>
        <div className=" space-y-6">
          <div className="">
            <h2 className="text-2xl font-semibold">Instructions</h2>
            <p className=" whitespace-pre-line">{data?.recipe.instruction}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
