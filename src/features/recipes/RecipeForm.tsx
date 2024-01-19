'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Input, Textarea } from '@nextui-org/react';
import Image from 'next/image';
import { useState } from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { Controller, useForm } from 'react-hook-form';
import { IoCloudUploadOutline } from 'react-icons/io5';

import type { RecipeSchemaType } from '@/schemas/recipe';
import { RecipeSchema } from '@/schemas/recipe';

export default function RecipeForm() {
  const [preview, setPreview] = useState<File | null>(null);
  const {
    register,
    handleSubmit,
    control,
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
        <Controller
          control={control}
          name="image"
          render={({ field: { onChange, ...field } }) => {
            return (
              <div>
                <input
                  type="file"
                  id="recipeImage"
                  {...field}
                  value=""
                  onChange={(event) => {
                    if (event.target.files) {
                      onChange(event.target.files[0]);
                      setPreview(event.target.files[0]);
                    }
                  }}
                  accept="image/png, image/jpeg"
                  className="hidden"
                />
                <label
                  htmlFor="recipeImage"
                  className="cursor-pointer"
                >
                  <div className=" relative flex h-56 items-center justify-center  rounded-lg border-2 border-dashed border-neutral-200 bg-neutral-50 p-4 ">
                    <div className="flex flex-col items-center space-y-2 font-bold text-neutral-800">
                      <IoCloudUploadOutline size={46} />
                      <span>Select recipe image</span>
                    </div>

                    {preview && (
                      <div className="absolute inset-0 overflow-hidden rounded-lg transition-opacity duration-250 hover:opacity-20">
                        <Image
                          width={100}
                          height={100}
                          src={URL.createObjectURL(preview)}
                          alt="Recipe"
                          style={{
                            width: 'auto',
                            height: 'auto',
                            objectPosition: 'center',
                            objectFit: 'cover',
                          }}
                        />
                      </div>
                    )}
                  </div>
                </label>
              </div>
            );
          }}
        />

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
