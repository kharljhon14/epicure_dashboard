'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Input, Textarea } from '@nextui-org/react';
import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';

import type { RecipeSchemaType } from '@/schemas/recipe';
import { RecipeSchema } from '@/schemas/recipe';

export default function RecipeForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RecipeSchemaType>({
    resolver: zodResolver(RecipeSchema),
  });

  const onSubmit: SubmitHandler<RecipeSchemaType> = async (data) => {
    const res = await fetch('/api/recipes', {
      method: 'POST',
      body: JSON.stringify(data),
    });

    if (res.ok) {
      alert('nice!');
    } else {
      const { error } = await res.json();

      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="space-y-4">
        <Input
          {...register('name')}
          label="Name*"
          isInvalid={!!errors.name?.message}
          errorMessage={errors.name?.message && errors.name.message}
        />

        <Textarea
          {...register('ingredients')}
          label="Ingredients*"
          isInvalid={!!errors.ingredients?.message}
          errorMessage={
            errors.ingredients?.message && errors.ingredients.message
          }
          minRows={12}
        />

        <Textarea
          {...register('instruction')}
          label="Instructions*"
          isInvalid={!!errors.instruction?.message}
          errorMessage={
            errors.instruction?.message && errors.instruction.message
          }
          minRows={12}
        />
      </div>
      <Button
        type="submit"
        color="primary"
        className="mt-6 w-full"
        size="lg"
      >
        Submit
      </Button>
    </form>
  );
}
