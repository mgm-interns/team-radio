export default file =>
  new Promise((resolve, reject) => {
    const fileReader = new FileReader();

    fileReader.onload = ({ target: { result } }) => {
      resolve(result);
    };

    fileReader.onerror = reject;

    fileReader.readAsDataURL(file);
  });
