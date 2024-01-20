'use client';

import { SWRConfig } from 'swr';

import fetcher from '@/utils/fetcher';

import RecipeCards from './RecipeCards';

export default function RecipesContainer() {
  return (
    <SWRConfig value={{ fetcher }}>
      <RecipeCards />
    </SWRConfig>
  );
}
