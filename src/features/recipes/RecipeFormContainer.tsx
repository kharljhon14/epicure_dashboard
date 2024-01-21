import { Button, useDisclosure } from '@nextui-org/react';
import { IoAdd } from 'react-icons/io5';

import RecipeModal from './RecipeModal';

export default function RecipeFormConatainer() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <Button
        color="primary"
        onClick={onOpen}
        size="md"
      >
        <IoAdd size={16} /> Recipe
      </Button>
      <RecipeModal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      />
    </>
  );
}
