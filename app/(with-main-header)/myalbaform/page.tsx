import SearchBar from './_components/SearchBar';
import SearchFilters from './_components/SearchFilters';
import MyAlbas from './_components/MyAlbas';
import WriteButton from './_components/WriteButton';

const Page = () => {
  return (
    <div className="mb-[9px] md:mb-3.5 lg:mb-14">
      <SearchBar />
      <SearchFilters />
      <MyAlbas />
      <WriteButton />
    </div>
  );
};

export default Page;
