import Script from 'next/script';
import FormNavigator from './_components/FormNavigator';

const AddFormPage = () => {
  return (
    <>
      <Script
        src="//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"
        strategy="beforeInteractive"
      />
      <Script
        src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_API_KEY}&libraries=services&autoload=false`}
        strategy="beforeInteractive"
      />
      <FormNavigator />
    </>
  );
};

export default AddFormPage;
