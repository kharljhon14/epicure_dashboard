import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
} from '@nextui-org/react';
import Image from 'next/image';
import Link from 'next/link';
import type { MouseEvent } from 'react';
import { IoImageOutline } from 'react-icons/io5';
import { MdDeleteOutline, MdOutlineModeEdit } from 'react-icons/md';

import type { RecipeDocument } from '@/models/recipe';

import type { SelectedRecipe } from './RecipeCards';

interface Props {
  recipe: RecipeDocument;
  setSelectedRecipe(recipe: SelectedRecipe): void;
}
export default function MyRecipeCard({ recipe, setSelectedRecipe }: Props) {
  const handleOnClickUpdate = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setSelectedRecipe({ recipe, state: 'update' });
  };

  const handleOnClickDelete = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setSelectedRecipe({ recipe, state: 'delete' });
  };

  return (
    <Link
      href={`/recipes/${recipe._id}`}
      className="flex w-full items-center justify-center"
    >
      <Card className=" min-h-[26rem] w-full max-w-sm p-1 shadow-md">
        <CardHeader className="flex items-center justify-center">
          <div className="relative h-60 w-full overflow-hidden rounded-md">
            {recipe.image ? (
              <Image
                fill
                src={recipe.image?.url}
                loading="lazy"
                placeholder="blur"
                blurDataURL="/1x1.png"
                alt={recipe.name}
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
        </CardHeader>
        <CardBody>
          <div className="space-y-2">
            <h1 className="line-clamp-1 text-ellipsis text-lg font-extrabold text-neutral-800">
              {recipe.name}
            </h1>
            <p className="line-clamp-2 text-ellipsis text-sm">
              {recipe.instruction}
            </p>
          </div>
        </CardBody>
        <CardFooter>
          <div className="flex w-full items-center justify-between text-sm text-neutral-500">
            <div className="space-x-2">
              <Button
                onClick={handleOnClickUpdate}
                color="secondary"
                isIconOnly
              >
                <MdOutlineModeEdit size={22} />
              </Button>
              <Button
                onClick={handleOnClickDelete}
                color="danger"
                isIconOnly
              >
                <MdDeleteOutline size={22} />
              </Button>
            </div>

            <span>{new Date(recipe.createdAt).toLocaleDateString()}</span>
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
}
