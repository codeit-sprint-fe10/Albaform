import { instance } from './axiosInstance';

export const getResumeFile = async (resumeId: number, resumeName: string) => {
  const response = await instance.get<Blob>(`/${resumeId}/download`, {
    responseType: 'blob',
  });

  // 문제점: 파일명을 받아와야하는데 헤더에 정보가 없음
  // const contentDisposition = response.headers['content-disposition'] as string;
  // let filename = 'resume.pdf';
  // if (contentDisposition) {
  //   const matches = /filename="([^"]+)"/.exec(contentDisposition);
  //   if (matches && matches[1]) {
  //     filename = matches[1];
  //   }
  // }

  const url = window.URL.createObjectURL(response.data);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', resumeName);
  document.body.appendChild(link);
  link.click();

  link.remove();
  window.URL.revokeObjectURL(url);
};
