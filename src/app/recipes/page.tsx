'use client';

import { Card, CardBody, CardHeader } from '@nextui-org/react';
import { SWRConfig } from 'swr';

import RecipeList from '@/features/recipes/RecipeList';
import fetcher from '@/utils/fetcher';

export default function RecipePage() {
  return (
    <div className="flex h-screen w-screen items-center justify-center bg-gradient-to-r from-purple-500 to-pink-500">
      <Card className="hidden w-full max-w-2xl p-4">
        <CardHeader className="flex items-center justify-center">
          <div className="flex flex-col items-center gap-y-4">
            <h1 className="text-3xl font-extrabold text-neutral-800">
              Add Recipe
            </h1>
          </div>
        </CardHeader>
        <CardBody>{/* <RecipeForm /> */}</CardBody>
      </Card>
      <SWRConfig value={{ fetcher }}>
        <RecipeList />
      </SWRConfig>
    </div>
  );
}
