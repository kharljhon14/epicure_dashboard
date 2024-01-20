'use client';

import { Pagination } from '@nextui-org/react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { SWRConfig } from 'swr';

import fetcher from '@/utils/fetcher';

import RecipeCards from './RecipeCards';

export default function RecipesContainer() {
  const searchParams = useSearchParams();
  const pathName = usePathname();

  const pageNumber = searchParams.get('pageNumber');
  const router = useRouter();

  const [total, setTotal] = useState<number | null>();

  return (
    <SWRConfig value={{ fetcher }}>
      <RecipeCards setTotal={setTotal} />
      {total && total > 12 && (
        <div className="mt-10 flex items-center justify-center">
          <Pagination
            showControls
            page={parseInt(pageNumber ?? '1', 10)}
            onChange={(p) => {
              router.push(`${pathName}?pageNumber=${p}`);
            }}
            total={Math.ceil(total / 12)}
          />
        </div>
      )}
    </SWRConfig>
  );
}
