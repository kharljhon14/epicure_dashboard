import { Card, Skeleton } from '@nextui-org/react';

export default function RecipeCardSkeleton() {
  return (
    <Card
      className="w-full max-w-sm space-y-5 p-4"
      radius="lg"
    >
      <Skeleton className="rounded-lg">
        <div className=" h-60 rounded-lg bg-default-300" />
      </Skeleton>
      <div className="space-y-3">
        <Skeleton className="w-3/5 rounded-lg">
          <div className="h-3 w-3/5 rounded-lg bg-default-200" />
        </Skeleton>
        <Skeleton className="w-full rounded-lg">
          <div className="h-3 w-full rounded-lg bg-default-300" />
        </Skeleton>
        <Skeleton className="w-full rounded-lg">
          <div className="h-3 w-full rounded-lg bg-default-300" />
        </Skeleton>
      </div>
      <div className="flex items-center justify-between pt-6">
        <Skeleton className="w-2/5 rounded-lg">
          <div className="h-3 w-2/5 rounded-lg bg-default-300" />
        </Skeleton>
        <Skeleton className="w-2/5 rounded-lg">
          <div className="h-3 w-2/5 rounded-lg bg-default-300" />
        </Skeleton>
      </div>
    </Card>
  );
}
