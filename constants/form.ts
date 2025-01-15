export const EMAIL = {
  format: {
    regExp: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    maxLength: 20,
  },
  message: {
    placeholder: '이메일을 입력해 주세요.',
    required: '이메일은 필수 입력입니다.',
    maxLength: '이메일은 최대 20자 이하입니다.',
    pattern: '이메일 형식으로 작성해 주세요.',
    logInError: '이메일 혹은 비밀번호를 확인해 주세요.',
  },
} as const;

export const PASSWORD = {
  format: {
    regExp: /^([a-zA-Z0-9!@#$%^&*])+$/,
    minLength: 8,
    maxLength: 20,
  },
  message: {
    placeholder: '비밀번호를 입력해 주세요.',
    required: '비밀번호는 필수 입력입니다.',
    minLength: '비밀번호는 최소 8자 이상입니다.',
    maxLength: '비밀번호는 최대 20자 이하입니다.',
    pattern: '비밀번호는 영문, 숫자, 허용된 특수문자만 가능합니다.',
  },
} as const;

export const PASSWORD_EDIT = {
  message: {
    currentPlaceholder: '현재 비밀번호를 입력해 주세요.',
    newPlaceholder: '새로운 비밀번호를 입력해 주세요.',
    confirmationPlaceholder: '새로운 비밀번호를 한 번 더 입력해 주세요.',
    equal: '기존 비밀번호와 다른 값을 입력해 주세요.',
  },
};

export const PASSWORD_CONFIRMATION = {
  message: {
    placeholder: '비밀번호를 한 번 더 입력해 주세요.',
    required: '비밀번호 확인은 필수 입력입니다.',
    notEqual: '비밀번호가 일치하지 않습니다.',
  },
} as const;

export const NAME = {
  format: {
    regExp: /^[a-zA-Z가-힣 ]+$/,
    maxLength: 20,
  },
  message: {
    placeholder: '이름을 입력해 주세요.',
    required: '이름은 필수 입력입니다.',
    maxLength: '이름은 최대 20자 이하입니다.',
    pattern: '이름은 한글, 영문, 공백만 가능합니다.',
  },
} as const;

export const NICKNAME = {
  format: {
    regExp: /^[a-zA-Z가-힣0-9 ]+$/,
    maxLength: 20,
  },
  message: {
    placeholder: '닉네임을 입력해 주세요.',
    required: '닉네임은 필수 입력입니다.',
    maxLength: '닉네임은 최대 20자 이하입니다.',
    pattern: '닉네임은 한글, 영문, 숫자, 공백만 가능합니다.',
  },
} as const;

export const PHONE_NUMBER = {
  format: {
    regExp: /^[0-9]+$/,
    minLength: 9,
    maxLength: 11,
  },
  message: {
    placeholder: '전화번호를 숫자로 입력해 주세요.',
    required: '전화번호는 필수 입력입니다.',
    minLength: '전화번호는 최소 9자 이상입니다.',
    maxLength: '전화번호는 최대 11자 이하입니다.',
    pattern: '전화번호는 숫자만 가능합니다.',
  },
} as const;

export const STORE_NAME = {
  format: {
    maxLength: 20,
  },
  message: {
    placeholder: '가게 이름을 입력해 주세요.',
    required: '가게 이름은 필수 입력입니다.',
    maxLength: '가게 이름은 최대 20자 이하입니다.',
  },
} as const;

export const LOCATION = {
  message: {
    placeholder: '가게 위치를 설정해 주세요.',
    required: '가게 이름은 필수 설정입니다.',
    error: '위치 등록에 문제가 발생했습니다',
  },
} as const;

export const EXPERIENCE_MONTHS = {
  format: {
    regExp: /^[0-9]+$/,
    maxLength: 3,
  },
  message: {
    placeholder: '경력을 개월 수로 입력해 주세요.',
    required: '경력은 필수 입력입니다.',
    maxLength: '경력은 최대 3자 이하입니다.',
    pattern: '경력은 숫자만 가능합니다.',
  },
} as const;

export const RESUME = {
  message: {
    placeholder: '이력서 제출하기',
    required: '이력서는 필수 제출입니다.',
    extension: 'PDF 또는 WORD 파일만 가능합니다.',
    error: '이력서 제출에 문제가 발생했습니다',
  },
} as const;

export const INTRODUCTION = {
  format: {
    maxLength: 200,
  },
  message: {
    placeholder: '자기소개를 200자 이하로 입력해 주세요.',
    required: '자기소개는 필수 입력입니다.',
    maxLength: '자기소개는 최대 200자 이하입니다.',
  },
} as const;

export const STEP_1_FIELDS = [
  'title',
  'description',
  'recruitmentEndDate',
  'recruitmentStartDate',
  'imageUrls',
];

export const STEP_2_FIELDS = [
  'numberOfPositions',
  'gender',
  'education',
  'age',
  'preferred',
];

export const STEP_3_FIELDS = [
  'location',
  'workStartTime',
  'workEndTime',
  'hourlyWage',
  'isNegotiableWorkDays',
  'isPublic',
  'workDays',
  'workEndDate',
  'workStartDate',
];
