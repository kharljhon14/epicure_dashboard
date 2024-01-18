'use client';

import useSWR from 'swr';

export default function Recipe() {
  const { data } = useSWR('/api/recipes/65a915867fe49c0cf796c0e3');
  return (
    <div>
      <h1>{data?.recipe.name}</h1>
      <p className=" whitespace-pre-line">{data?.recipe.ingredients}</p>
    </div>
  );
}
