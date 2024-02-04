const If = ({ condition, otherwise, children }) => {
  if (!!condition) {
    return children;
  }
  return otherwise;
};

export default If;
