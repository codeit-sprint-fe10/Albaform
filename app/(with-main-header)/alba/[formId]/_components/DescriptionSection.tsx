import { Alba } from '@/types/alba';

type SectinoDescriptionProps = Pick<Alba, 'description'>;

const DescriptionSection = ({ description }: SectinoDescriptionProps) => {
  return (
    <section>
      <p className="text-black-400 font-regular text-lg lg:text-2xl whitespace-pre-wrap">
        {description}
      </p>
    </section>
  );
};

export default DescriptionSection;
