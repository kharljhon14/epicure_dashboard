import { Button, Input } from '@nextui-org/react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import type { FormEvent } from 'react';
import { useEffect, useState } from 'react';
import { IoIosSearch } from 'react-icons/io';

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
      className="mx-6 md:mx-2"
      autoComplete="off"
    >
      <div className="flex items-center space-x-2">
        <Input
          placeholder="Search"
          className="lg:w-1/5"
          size="sm"
          variant="bordered"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          isClearable
          onClear={handleClear}
        />
        <Button
          size="lg"
          color="primary"
          type="submit"
          isIconOnly
        >
          <IoIosSearch size={24} />
        </Button>
      </div>
    </form>
  );
}
