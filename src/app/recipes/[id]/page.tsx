import RecipeInformation from '@/features/recipes/RecipeInformation';

interface Props {
  params: {
    id: string;
  };
}

export default function RecipePage({ params }: Props) {
  return (
    <div>
      <RecipeInformation id={params.id} />
    </div>
  );
}
