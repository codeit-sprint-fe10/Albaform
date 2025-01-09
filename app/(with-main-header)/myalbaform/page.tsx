import SearchBar from './_components/SearchBar';
import SearchFilters from './_components/SearchFilters';
import MyAlbas from './_components/MyAlbas';
import WriteButton from './_components/WriteButton';

const Page = () => {
  return (
    <div className="mb-[34px] md:mb-[134px] lg:mb-[106px]">
      <SearchBar />
      <SearchFilters />
      <MyAlbas />
      <WriteButton />
    </div>
  );
};

export default Page;
