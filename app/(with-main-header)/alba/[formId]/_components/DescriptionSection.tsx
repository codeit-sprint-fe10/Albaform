import { Alba } from '@/types/alba';

type DescriptionSectionProps = Pick<Alba, 'description'>;

const DescriptionSection = ({ description }: DescriptionSectionProps) => {
  return (
    <section>
      <p className="text-black-400 font-regular text-lg lg:text-2xl whitespace-pre-wrap">
        {description}
      </p>
    </section>
  );
};

export default DescriptionSection;
