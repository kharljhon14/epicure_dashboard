import { Button, ModalBody, ModalHeader } from '@nextui-org/react';

import type { SelectedRecipe } from './RecipeCards';

interface Props {
  selectedRecipe?: SelectedRecipe;
  handleDelete(): void;
  isLoading: boolean;
  onClose(): void;
}

export default function RecipeDeleteConfirmationBody({
  selectedRecipe,
  handleDelete,
  isLoading,
  onClose,
}: Props) {
  return (
    <>
      <ModalHeader className="flex flex-col items-center justify-center space-y-2">
        <span className="text-2xl font-semibold text-danger-600">
          Confirm Deletion
        </span>
        <div className="text-sm text-neutral-500">
          Are you sure you want to delete {selectedRecipe?.recipe.name}?
        </div>
      </ModalHeader>
      <ModalBody className="flex justify-end">
        <Button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            handleDelete();
          }}
          disabled={isLoading}
          isLoading={isLoading}
          color="danger"
        >
          Yes, delete it!
        </Button>
        <Button
          disabled={isLoading}
          onClick={onClose}
        >
          No, keep it
        </Button>
      </ModalBody>
    </>
  );
}
