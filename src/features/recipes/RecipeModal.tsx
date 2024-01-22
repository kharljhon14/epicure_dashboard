import { Modal, ModalBody, ModalContent, ModalHeader } from '@nextui-org/react';
import type { ScopedMutator } from 'swr/_internal';

import type { RecipeDocument } from '@/models/recipe';

import RecipeForm from './RecipeForm';

interface Props {
  isOpen: boolean;
  onOpenChange(isOpen: boolean): void;
  onClose(): void;
  mutate: ScopedMutator;
  selectedRecipe?: RecipeDocument;
}

export default function RecipeModal({
  isOpen,
  onOpenChange,
  onClose,
  mutate,
  selectedRecipe,
}: Props) {
  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      size="xl"
    >
      <ModalContent className="py-4">
        <ModalHeader className="flex flex-col items-center justify-center space-y-2">
          <span className="text-3xl font-semibold text-neutral-800">
            {selectedRecipe ? 'Update Recipe' : 'Add Recipe'}
          </span>
        </ModalHeader>
        <ModalBody>
          <RecipeForm
            onClose={onClose}
            mutate={mutate}
            selectedRecipe={selectedRecipe}
          />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
