import { Button, useDisclosure } from '@nextui-org/react';
import { IoAdd } from 'react-icons/io5';
import type { ScopedMutator } from 'swr/_internal';

import RecipeModal from './RecipeModal';

interface Props {
  mutate: ScopedMutator;
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
