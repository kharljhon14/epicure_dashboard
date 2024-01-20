import { Card, CardBody, CardFooter, CardHeader } from '@nextui-org/react';
import Image from 'next/image';
import { IoImageOutline } from 'react-icons/io5';

import type { RecipeDocument } from '@/models/recipe';

interface Props {
  recipe: RecipeDocument;
}

export default function RecipeCard({ recipe }: Props) {
  return (
    <Card className="w-full max-w-sm p-1 shadow-md">
      <CardHeader className="flex items-center justify-center">
        <div className="relative h-60 w-full overflow-hidden rounded-md">
          {recipe.image ? (
            <Image
              fill
              src={recipe.image?.url}
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
          <h1 className="text-lg font-extrabold text-neutral-800">
            {recipe.name}
          </h1>
          <p className="line-clamp-2 text-ellipsis text-sm">
            {recipe.instruction}
          </p>
        </div>
      </CardBody>
      <CardFooter>
        <div className="flex w-full items-center justify-between text-sm text-neutral-500">
          <span>{recipe.owner.name}</span>
          <span>{new Date(recipe.createdAt).toLocaleDateString()}</span>
        </div>
      </CardFooter>
    </Card>
  );
}
