import Image from 'next/image';
import type { ScopedMutator } from 'swr/_internal';

import RecipeFormContainer from '../recipes/RecipeFormContainer';

interface Props {
  mutate: ScopedMutator;
}

export default function EmptyRecipes({ mutate }: Props) {
  return (
    <div className="flex flex-col items-center justify-center text-center">
      <h1 className="mb-4 text-4xl font-bold text-primary-600">
        Oops! Nothing Here.
      </h1>
      <p className="mb-6 text-lg text-neutral-700">
        It seems like the recipe book is empty. Let&apos;s spice things up and
        add some delicious recipes!
      </p>
      <RecipeFormContainer mutate={mutate} />
      <Image
        width={600}
        height={600}
        src="/empty.jpg"
        alt="Empty folder"
        style={{ width: 'auto', height: 'auto' }}
      />
    </div>
  );
}
