export const em = {
  fmt: {
    regExp: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    maxLength: 20,
  },
  msg: {
    placeholder: '이메일을 입력해 주세요.',
    required: '이메일은 필수 입력입니다.',
    maxLength: '이메일은 최대 20자 이하입니다.',
    pattern: '이메일 형식으로 작성해 주세요.',
  },
} as const;

export const pw = {
  fmt: {
    regExp: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    minLength: 8,
    maxLength: 20,
  },
  msg: {
    placeholder: '비밀번호를 입력해 주세요.',
    required: '비밀번호는 필수 입력입니다.',
    minLength: '비밀번호는 최소 8자 이상입니다.',
    maxLength: '비밀번호는 최대 20자 이하입니다.',
    pattern: '비밀번호는 영문, 숫자, 허용된 특수문자만 가능합니다.',
  },
} as const;

export const pwCf = {
  msg: {
    placeholder: '비밀번호를 한 번 더 입력해 주세요.',
    required: '비밀번호 확인은 필수 입력입니다.',
    notEqual: '비밀번호가 일치하지 않습니다.',
  },
} as const;
