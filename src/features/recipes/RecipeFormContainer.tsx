import { Button, useDisclosure } from '@nextui-org/react';
import { IoAdd } from 'react-icons/io5';
import type { KeyedMutator } from 'swr';

import type { GetRecipesResponse } from '@/@types/recipe';

import RecipeModal from './RecipeModal';

interface Props {
  mutate: KeyedMutator<GetRecipesResponse>;
}

export default function RecipeFormContainer({ mutate }: Props) {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  return (
    <>
      <Button
        color="primary"
        onClick={onOpen}
        size="md"
        className="flex items-center"
      >
        <IoAdd size={18} />
        <span>Recipe</span>
      </Button>
      <RecipeModal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        onClose={onClose}
        mutate={mutate}
      />
    </>
  );
}
