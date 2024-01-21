import { Modal, ModalBody, ModalContent, ModalHeader } from '@nextui-org/react';
import type { KeyedMutator } from 'swr';

import type { GetRecipesResponse } from '@/@types/recipe';

import RecipeForm from './RecipeForm';

interface Props {
  isOpen: boolean;
  onOpenChange(isOpen: boolean): void;
  onClose(): void;
  mutate: KeyedMutator<GetRecipesResponse>;
}

export default function RecipeModal({
  isOpen,
  onOpenChange,
  onClose,
  mutate,
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
            Add Recipe
          </span>
        </ModalHeader>
        <ModalBody>
          <RecipeForm
            onClose={onClose}
            mutate={mutate}
          />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
