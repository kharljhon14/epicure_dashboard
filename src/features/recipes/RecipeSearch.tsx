import { Input } from '@nextui-org/react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import type { FormEvent } from 'react';
import { useEffect, useState } from 'react';
import { IoSearchOutline } from 'react-icons/io5';

export default function RecipeSearch() {
  const [searchValue, setSearchValue] = useState('');
  const router = useRouter();
  const pathName = usePathname();
  const searchParams = useSearchParams();

  const q = searchParams.get('q');

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    router.push(`${pathName}?q=${searchValue}&pageNumber=1`);
  };
  const handleClear = () => {
    if (q) {
      router.push(`${pathName}`);
    }
    setSearchValue('');
  };

  useEffect(() => {
    if (q) setSearchValue(q);
  }, []);

  return (
    <form
      onSubmit={handleSubmit}
      autoComplete="off"
    >
      <Input
        size="sm"
        variant="bordered"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        isClearable
        onClear={handleClear}
        classNames={{
          base: 'max-w-full sm:max-w-lg h-10',
          mainWrapper: 'h-full',
          input: 'text-small',
          inputWrapper:
            'h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20',
        }}
        placeholder="Type to search..."
        startContent={<IoSearchOutline />}
      />
    </form>
  );
}
