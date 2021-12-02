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