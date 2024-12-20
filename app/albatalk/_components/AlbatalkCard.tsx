import React from 'react';

const AlbatalkCard = () => {
  return (
    <div className="w-full h-72 p-6 border rounded-2xl">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <div className="max-w-80">알바 추천해주세요</div>
          <div className="max-w-80">
            알바 추천해주세요 알바 추천해주세요 알바 추천해주세요 알바
            추천해주세요 알바 추천해주세요 알바 추천해주세요
          </div>
        </div>
        <div className="flex">
          <div className="flex w-full justify-between">
            <div className="flex gap-4">
              <div className="flex gap-1">
                {/* <div className="">프로필이미지</div> */}
                <div className="">김코드</div>
              </div>
              <div className="">|</div>
              <div className="">2024.08.06</div>
            </div>
            <div className="flex gap-3">
              <div className="flex gap-1">
                {/* <div className=''>댓글아이콘</div> */}
                <div className="">10</div>
              </div>
              <div className="flex gap-1">
                {/* <div className=''>좋아요아이콘</div> */}
                <div className="">10</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlbatalkCard;
