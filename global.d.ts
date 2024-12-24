declare namespace daum {
  class Postcode {
    constructor(options: {
      oncomplete: (data: {
        address: string;
        zonecode: string;
        bname?: string;
        addressType: string;
      }) => void;
      onresize?: (size: { width: number; height: number }) => void;
      width?: string;
      height?: string;
    });
    open(): void;
    embed(container: HTMLElement): void;
  }
}

declare namespace kakao.maps {
  function load(callback: () => void): void;

  namespace services {
    const Status: {
      OK: string;
      ZERO_RESULT: string;
      ERROR: string;
    };

    class Geocoder {
      addressSearch(
        address: string,
        callback: (result: { x: string; y: string }[], status: string) => void,
      ): void;
    }
  }
}
