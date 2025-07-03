// Dummy test file, will delete it at the END -_-

const validateEmail = (email) => {
  const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email);
};

console.log(validateEmail("em_ail@aSd.com"));
