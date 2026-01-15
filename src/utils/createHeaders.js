const UA =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36";

const createHeaders = (eolAdditionalHeader=true) => {
    let HDR = {
      accept: "application/json, text/plain, */*",
      "user-agent": UA,
      "x-koleo-client": "Nuxt-bbc58bc",
      "x-koleo-version": "2",
    };
    
    if (eolAdditionalHeader) {
      HDR = {
        ...HDR,
        "accept-eol-response-version": "1",
        "content-type": "application/json",
      }
    }
    return HDR;
}

export default createHeaders;
