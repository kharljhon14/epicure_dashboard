'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Input, Textarea } from '@nextui-org/react';
import Image from 'next/image';
import { useRef, useState } from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { Controller, useForm } from 'react-hook-form';
import { IoTrashOutline } from 'react-icons/io5';

import type { RecipeSchemaType } from '@/schemas/recipe';
import { RecipeSchema } from '@/schemas/recipe';

export default function RecipeForm() {
  const imageInputRef = useRef<HTMLInputElement>(null);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    reset,
    getValues,
    watch,
    resetField,
    formState: { errors },
  } = useForm<RecipeSchemaType>({
    resolver: zodResolver(RecipeSchema),
  });

  const onSubmit: SubmitHandler<RecipeSchemaType> = async (data) => {
    setIsLoading(true);
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('instruction', data.instruction);
    formData.append('ingredients', data.ingredients);

    if (data.image) {
      formData.append('image', data.image);
    }

    const res = await fetch('/api/recipes', {
      method: 'POST',
      body: formData,
    });
    if (res.ok) {
      alert('nice!');

      reset();
    } else {
      const { error } = await res.json();
      console.error(error);
    }
    setIsLoading(false);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      autoComplete="off"
    >
      <div className="space-y-4">
        <Controller
          control={control}
          name="image"
          render={({ field: { value, onChange, ...fields } }) => {
            return (
              <div>
                <input
                  type="file"
                  id="recipeImage"
                  {...fields}
                  value={value?.filepath}
                  onChange={(event) => {
                    if (event.target.files) {
                      onChange(event.target.files[0]);
                    }
                  }}
                  onClick={(e) => {
                    e.currentTarget.value = '';
                  }}
                  accept="image/png, image/jpeg"
                  className="hidden"
                  ref={imageInputRef}
                  disabled={isLoading}
                />
              </div>
            );
          }}
        />

        <div className="flex space-x-2">
          <div className=" relative flex h-28 w-28 shrink-0 items-center justify-center rounded-lg border-2 border-dashed  border-neutral-200 bg-neutral-50 p-4 md:h-48 md:w-48">
            <div className="flex flex-col items-center space-y-2 font-bold text-neutral-400">
              <span className="text-center text-xs md:text-sm">
                Recipe image
              </span>
            </div>

            {watch('image') && (
              <div className=" absolute inset-0 overflow-hidden rounded-lg transition-opacity duration-250">
                <Image
                  width={192}
                  height={192}
                  src={URL.createObjectURL(getValues('image') as File)}
                  alt="Recipe"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectPosition: 'center',
                    objectFit: 'cover',
                  }}
                />
              </div>
            )}
          </div>

          <div>
            <Button
              color="secondary"
              onClick={() => imageInputRef.current?.click()}
              className="shrink-0"
              disabled={isLoading}
            >
              Upload Image
            </Button>
          </div>
        </div>

        <div>
          {watch('image') && (
            <div className="flex items-center justify-between space-x-2">
              <span className="text-ellipsis text-xs">
                {watch('image')?.name}
              </span>
              <Button
                color="danger"
                isIconOnly
                radius="full"
                disabled={isLoading}
                onClick={() => {
                  resetField('image');
                }}
              >
                <IoTrashOutline size={18} />
              </Button>
            </div>
          )}
        </div>

        <Input
          {...register('name')}
          size="sm"
          label="Name*"
          isInvalid={!!errors.name?.message}
          errorMessage={errors.name?.message && errors.name.message}
          disabled={isLoading}
        />

        <Textarea
          {...register('ingredients')}
          size="sm"
          label="Ingredients*"
          isInvalid={!!errors.ingredients?.message}
          errorMessage={
            errors.ingredients?.message && errors.ingredients.message
          }
          disabled={isLoading}
        />

        <Textarea
          {...register('instruction')}
          size="sm"
          label="Instructions*"
          isInvalid={!!errors.instruction?.message}
          errorMessage={
            errors.instruction?.message && errors.instruction.message
          }
          disabled={isLoading}
        />
      </div>
      <Button
        type="submit"
        color="primary"
        className="mt-6 w-full"
        disabled={isLoading}
        isLoading={isLoading}
      >
        Submit
      </Button>
    </form>
  );
}
