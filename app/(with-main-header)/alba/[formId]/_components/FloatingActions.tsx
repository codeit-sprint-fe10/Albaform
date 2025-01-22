'use client';

import { Alba } from '@/types/alba';
import Image from 'next/image';
import { deleteAlbaScrap, postAlbaScrap } from '@/services/alba';
import React, { useState } from 'react';
import KakaoScript from '@/components/KakaoScript';
import { toast } from 'react-toastify';
import { useUserStore } from '@/store/user';

type FloatingActionsProps = Pick<
  Alba,
  'id' | 'isScrapped' | 'title' | 'imageUrls' | 'description'
>;

const FloatingActions = ({
  id,
  isScrapped,
  title,
  imageUrls,
  description,
}: FloatingActionsProps) => {
  const [isActiveScrapped, setIsActiveScrapped] = useState(isScrapped);
  const user = useUserStore((state) => state.user);

  const handleScrapClick = async () => {
    try {
      const result = isActiveScrapped
        ? await deleteAlbaScrap(id)
        : await postAlbaScrap(id);
      setIsActiveScrapped(result);
      toast.success(`스크랩 ${result ? '저장' : '삭제'} 성공!`);
    } catch (error) {
      console.error(error);
      toast.error('스크랩 요청 실패');
    }
  };

  const handleShare = () => {
    const { Kakao, location } = window;

    Kakao.Share.sendDefault({
      objectType: 'feed',
      content: {
        title,
        description,
        imageUrl:
          imageUrls?.[0] || 'https://www.albaform.store/images/opengraph.png',
        link: {
          mobileWebUrl: location.href,
          webUrl: location.href,
        },
      },
    });
  };

  return (
    <aside className="fixed bottom-10 right-4 flex flex-col z-10">
      {user && (
        <button
          type="button"
          onClick={handleScrapClick}
          aria-label="스크랩하기"
        >
          <Image
            src={`/icons/bookmark-circle-${isActiveScrapped ? 'active' : 'inactive'}.svg`}
            alt=""
            width={54}
            height={54}
            className="lg:w-16 lg:h-16"
          />
        </button>
      )}
      <button type="button" aria-label="공유하기" onClick={handleShare}>
        <Image
          src={`/icons/share-circle.svg`}
          alt=""
          width={54}
          height={54}
          className="lg:w-16 lg:h-16"
        />
      </button>
      <KakaoScript />
    </aside>
  );
};

export default FloatingActions;
