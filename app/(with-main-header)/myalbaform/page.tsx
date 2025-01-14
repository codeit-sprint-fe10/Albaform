import { cookies } from 'next/headers';
import SearchBar from './_components/SearchBar';
import SearchFilters from './_components/SearchFilters';
import MyAlbas from './_components/MyAlbas';
import WriteButton from './_components/WriteButton';
import { checkOwner } from '@/utils/auth';

const Page = async () => {
  const cookieStore = await cookies();
  const userRole = cookieStore.get('user_role')?.value;
  const isOwner = checkOwner(userRole);

  return (
    <div className="mb-[34px] md:mb-[134px] lg:mb-[106px]">
      <SearchBar isOwner={isOwner} />
      <SearchFilters isOwner={isOwner} />
      <MyAlbas isOwner={isOwner} />
      {isOwner && <WriteButton />}
    </div>
  );
};

export default Page;
