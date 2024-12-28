export const SIGN_UP_SENTENCE = {
  applicant: [
    '이미 계정이 있으신가요? ',
    '사장님 회원가입은 사장님 전용 페이지에서 할 수 있습니다.',
  ],
  owner: [
    '이미 사장님 계정이 있으신가요? ',
    '지원자 회원가입은 지원자 전용 페이지에서 할 수 있습니다.',
  ],
} as const;

export const SIGN_IN_SENTENCE = {
  applicant: [
    '아직 계정이 없으신가요? ',
    '사장님 로그인은 사장님 전용 페이지에서 할 수 있습니다.',
  ],
  owner: [
    '사장님 계정이 없으신가요? ',
    '지원자 로그인은 지원자 전용 페이지에서 할 수 있습니다.',
  ],
} as const;
