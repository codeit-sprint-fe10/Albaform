import { Recruitment } from '@/types/recruitment';

type RequirementsProps = Pick<
  Recruitment,
  'numberOfPositions' | 'gender' | 'education' | 'age' | 'preferred'
>;

const Requirements = ({
  numberOfPositions,
  gender,
  education,
  age,
  preferred,
}: RequirementsProps) => {
  return (
    <section>
      <h3 className="py-[16px] font-semibold text-2lg lg:text-3xl">
        모집 조건
      </h3>
      <div className="rounded-lg border border-line-100 px-[16px] py-[10px] bg-background-100 lg:p-[24px]">
        <table className="font-regular text-md text-left lg:text-xl">
          <tbody>
            <tr>
              <th className="text-black-200 min-w-[100px] whitespace-nowrap py-2 align-top font-regular">
                모집인원
              </th>
              <td className="text-black-400 py-2">{numberOfPositions}명</td>
            </tr>
            <tr>
              <th className="text-black-200 min-w-[100px] whitespace-nowrap py-2 align-top font-regular">
                성별
              </th>
              <td className="text-black-400 py-2">{gender}</td>
            </tr>
            <tr>
              <th className="text-black-200 min-w-[100px] whitespace-nowrap py-2 align-top font-regular">
                학력
              </th>
              <td className="text-black-400 py-2">{education}</td>
            </tr>
            <tr>
              <th className="text-black-200 min-w-[100px] whitespace-nowrap py-2 align-top font-regular">
                연령
              </th>
              <td className="text-black-400 py-2">{age}</td>
            </tr>
            <tr>
              <th className="text-black-200 min-w-[100px] whitespace-nowrap py-2 align-top font-regular">
                우대사항
              </th>
              <td className="text-black-400 py-2">{preferred}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default Requirements;
