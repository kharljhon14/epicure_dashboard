import Image from 'next/image';

export default function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center text-center">
      <h1 className="mb-4 text-4xl font-bold text-primary-600">
        Oops! It seems you&apos;ve lost your way.
      </h1>

      <Image
        width={600}
        height={600}
        src="/404.jpg"
        alt="not found"
        style={{ width: 'auto', height: 'auto' }}
      />
    </div>
  );
}
