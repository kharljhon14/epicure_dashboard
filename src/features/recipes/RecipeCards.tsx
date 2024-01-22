import { Modal, ModalContent, useDisclosure } from '@nextui-org/react';
import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import useSWR, { useSWRConfig } from 'swr';

import type { GetUserResponse } from '@/@types/user';
import type { RecipeDocument } from '@/models/recipe';
import fetcher from '@/utils/fetcher';

import MyRecipeCard from './MyRecipeCard';
import RecipeCard from './RecipeCard';
import RecipeDeleteConfirmationBody from './RecipeDeleteConfirmationBody';
import RecipeModal from './RecipeModal';

interface Props {
  recipes: Array<RecipeDocument>;
}

export interface SelectedRecipe {
  recipe: RecipeDocument;
  state: 'update' | 'delete';
}

export default function RecipeCards({ recipes }: Props) {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const {
    isOpen: updateIsOpen,
    onOpen: updateOnOpen,
    onOpenChange: updateOnChange,
    onClose: updateOnClose,
  } = useDisclosure();

  const [selectedRecipe, setSelectedRecipe] = useState<SelectedRecipe>();
  const [isLoading, setIsloading] = useState(false);

  const pathName = usePathname();

  const searchParams = useSearchParams();

  // Get query Params
  const q = searchParams.get('q');
  const pageNumber = searchParams.get('pageNumber');

  const { mutate } = useSWRConfig();
  const { data } = useSWR<GetUserResponse>('/api/user', fetcher);

  const handleDelete = async () => {
    setIsloading(true);
    const res = await fetch(`/api/recipes/${selectedRecipe?.recipe._id}`, {
      method: 'DELETE',
    });
    if (res.ok)
      mutate(
        `/api/recipes?pageNumber=${pageNumber ?? '1'}&q=${q ?? ''}&owner=${data?.user?.id}`
      );
    onClose();
    toast.success('Recipe Deleted!');

    setIsloading(false);
  };

  useEffect(() => {
    if (selectedRecipe) {
      if (selectedRecipe.state === 'delete') onOpen();
      else if (selectedRecipe.state === 'update') updateOnOpen();
    }
  }, [selectedRecipe]);

  return (
    <>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {recipes?.map((recipe) => (
          <div
            key={recipe._id.toString()}
            className="flex items-center justify-center"
          >
            {pathName.includes('user') ? (
              <MyRecipeCard
                setSelectedRecipe={setSelectedRecipe}
                recipe={recipe}
              />
            ) : (
              <RecipeCard recipe={recipe} />
            )}
          </div>
        ))}
      </div>

      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        size="lg"
      >
        <ModalContent className="rounded-md bg-white py-4">
          <RecipeDeleteConfirmationBody
            selectedRecipe={selectedRecipe}
            handleDelete={handleDelete}
            isLoading={isLoading}
            onClose={onClose}
          />
        </ModalContent>
      </Modal>

      <RecipeModal
        isOpen={updateIsOpen}
        onOpenChange={updateOnChange}
        onClose={updateOnClose}
        mutate={mutate}
        selectedRecipe={selectedRecipe?.recipe}
      />
    </>
  );
}
