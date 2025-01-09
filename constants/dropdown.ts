export const NUMBER_OF_POSITION_OPTIONS = [
  { key: '0', label: '0' },
  { key: '1', label: '1' },
  { key: '2', label: '2' },
  { key: '3', label: '3' },
  { key: '4', label: '4' },
  { key: '5', label: '5' },
  { key: 'customInput', label: '직접입력' },
];

export const GENDER_OPTIONS = [
  { key: 'genderAny', label: '성별무관' },
  { key: 'male', label: '남성' },
  { key: 'female', label: '여성' },
];

export const EDUCATION_OPTIONS = [
  { key: 'educationAny', label: '학력무관' },
  { key: 'educationHighSchool', label: '고등학교 졸업' },
  { key: 'educationUniversity', label: '대학교 졸업' },
  { key: 'customInput', label: '직접입력' },
];

export const AGE_OPTIONS = [
  { key: 'ageAny', label: '연령무관' },
  { key: 'ageTeens', label: '10대' },
  { key: 'ageTwenties', label: '20대' },
  { key: 'ageThirties', label: '30대' },
  { key: 'ageForties', label: '40대' },
  { key: 'ageFifties', label: '50대' },
  { key: 'ageSixties', label: '60대' },
  { key: 'customInput', label: '직접입력' },
];

export const PREFERRED_OPTIONS = [
  { key: 'none', label: '없음' },
  { key: 'customInput', label: '직접입력' },
];

export const TIME_OPTIONS = [
  { key: '00:00', label: '00:00' },
  { key: '00:30', label: '00:30' },
  { key: '01:00', label: '01:00' },
  { key: '01:30', label: '01:30' },
  { key: '02:00', label: '02:00' },
  { key: '02:30', label: '02:30' },
  { key: '03:00', label: '03:00' },
  { key: '03:30', label: '03:30' },
  { key: '04:00', label: '04:00' },
  { key: '04:30', label: '04:30' },
  { key: '05:00', label: '05:00' },
  { key: '05:30', label: '05:30' },
  { key: '06:00', label: '06:00' },
  { key: '06:30', label: '06:30' },
  { key: '07:00', label: '07:00' },
  { key: '07:30', label: '07:30' },
  { key: '08:00', label: '08:00' },
  { key: '08:30', label: '08:30' },
  { key: '09:00', label: '09:00' },
  { key: '09:30', label: '09:30' },
  { key: '10:00', label: '10:00' },
  { key: '10:30', label: '10:30' },
  { key: '11:00', label: '11:00' },
  { key: '11:30', label: '11:30' },
  { key: '12:00', label: '12:00' },
  { key: '12:30', label: '12:30' },
  { key: '13:00', label: '13:00' },
  { key: '13:30', label: '13:30' },
  { key: '14:00', label: '14:00' },
  { key: '14:30', label: '14:30' },
  { key: '15:00', label: '15:00' },
  { key: '15:30', label: '15:30' },
  { key: '16:00', label: '16:00' },
  { key: '16:30', label: '16:30' },
  { key: '17:00', label: '17:00' },
  { key: '17:30', label: '17:30' },
  { key: '18:00', label: '18:00' },
  { key: '18:30', label: '18:30' },
  { key: '19:00', label: '19:00' },
  { key: '19:30', label: '19:30' },
  { key: '20:00', label: '20:00' },
  { key: '20:30', label: '20:30' },
  { key: '21:00', label: '21:00' },
  { key: '21:30', label: '21:30' },
  { key: '22:00', label: '22:00' },
  { key: '22:30', label: '22:30' },
  { key: '23:00', label: '23:00' },
  { key: '23:30', label: '23:30' },
  { key: '24:00', label: '24:00' },
];

export const PUBLIC_OPTIONS = [
  { key: undefined, label: '전체' },
  { key: true, label: '공개' },
  { key: false, label: '비공개' },
];

export const RECRUIT_OPTIONS = [
  { key: undefined, label: '전체' },
  { key: true, label: '모집 중' },
  { key: false, label: '모집 마감' },
];

export const ALBA_ORDERBY_OPTIONS = [
  { key: 'mostRecent', label: '최신순' },
  { key: 'highestWage', label: '시급 높은순' },
  { key: 'mostApplied', label: '지원자 많은순' },
  { key: 'mostScrapped', label: '스크랩 많은순' },
];

export const MENU_APPLICANT_OPTIONS = [
  { key: 'apply', label: '지원하기' },
  { key: 'scrap', label: '스크랩하기' },
];

export const MENU_OWNER_OPTIONS = [
  { key: 'modify', label: '수정하기' },
  { key: 'delete', label: '삭제하기' },
];

export const TAB_OPTIONS = [
  { key: 'posts', label: '내가 쓴 글' },
  { key: 'comments', label: '내가 쓴 댓글' },
  { key: 'scraps', label: '스크랩' },
] as const;

export const SORT_OPTIONS = [
  { key: 'mostRecent', label: '최신순' },
  { key: 'mostLiked', label: '좋아요순' },
  { key: 'mostCommented', label: '댓글 많은순' },
] as const;

export const TALK_OPTIONS = [
  { key: 'edit', label: '수정하기' },
  { key: 'delete', label: '삭제하기' },
] as const;
