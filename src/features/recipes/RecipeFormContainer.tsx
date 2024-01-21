import { Button, useDisclosure } from '@nextui-org/react';
import { IoAdd } from 'react-icons/io5';

import RecipeModal from './RecipeModal';

export default function RecipeFormContainer() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

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
      />
    </>
  );
}
