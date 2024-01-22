'use client';

import { Button, Spinner } from '@nextui-org/react';
import Image from 'next/image';
import { notFound, useRouter } from 'next/navigation';
import { IoChevronBack, IoImageOutline } from 'react-icons/io5';
import useSWR from 'swr';

import type { GetRecipeResponse } from '@/@types/recipe';
import fetcher from '@/utils/fetcher';

interface Props {
  id: string;
}

export default function RecipeInformation({ id }: Props) {
  const router = useRouter();

  const { data, isLoading, error } = useSWR<GetRecipeResponse>(
    `/api/recipes/${id}`,
    fetcher
  );
  if (error) notFound();

  if (isLoading)
    return (
      <div className="flex items-center justify-center">
        <Spinner
          label="Loading..."
          size="lg"
        />
      </div>
    );
  return (
    <div className="px-4">
      <div className="mb-6 flex items-center space-x-4">
        <Button
          isIconOnly
          onClick={() => router.back()}
        >
          <IoChevronBack />
        </Button>
        <div>
          <h1 className="text-4xl font-semibold">{data?.recipe.name}</h1>
          <span className="text-xs text-gray-500">
            By {data?.recipe.owner.name}
          </span>
        </div>
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
        </div>
        <div className=" space-y-6">
          <div className=" w-4/5">
            <h2 className="text-2xl font-semibold">Ingredients</h2>
            <p className=" whitespace-pre-line">{data?.recipe.ingredients}</p>
          </div>

          <div className="">
            <h2 className="text-2xl font-semibold">Directions</h2>
            <p className=" whitespace-pre-line">{data?.recipe.instruction}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
