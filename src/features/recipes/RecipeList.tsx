import useSWR from 'swr';

export default function RecipeList() {
  const { data, isLoading, error } = useSWR('/api/recipes');

  if (error) return <div>Failed to load</div>;
  if (isLoading) return <div>Loading...</div>;

  console.log(data);

  return (
    <div>
      <h1>Recipe List</h1>
    </div>
  );
}
