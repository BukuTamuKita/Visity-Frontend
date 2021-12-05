export const capitalizeFirstLetter = (words) => {
  if (words) {
      words = "" + words;
      const arr = words.split(" ");

      for (let i = 0; i < arr.length; i++) {
          arr[i] =
              arr[i].charAt(0).toUpperCase() +
              arr[i].slice(1).toLowerCase();
      }

      const result = arr.join(" ");
      console.log("result: ", result);
      
      return result;
  }

  return "";
};

export const dataURLtoFile = (url, filename) => {
  let arr = url.split(','),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]),
      n = bstr.length,
      u8arr = new Uint8Array(n);

  while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
  }

  return new File([u8arr], filename, {type:mime});
};