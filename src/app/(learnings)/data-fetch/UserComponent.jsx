const getUser = async () => {
  const res = await fetch("https://jsonplaceholder.typicode.com/users/1", {
    cache: "no-cache",
  });

  await new Promise((resolve, rej) => {
    setTimeout(() => {
      resolve();
    }, 10000);
  });

  if (!res.ok) throw new Error("Something went wrong in getUser");
  return res.json();

  // IN THIS FUNCTION we can also make calls to DB directly and get the data
};

const UserComponent = async () => {
  const user = await getUser();

  return (
    <div>
      <p>Name: {user.name}</p>
      <p>Email: {user.email}</p>
    </div>
  );
};

export default UserComponent;
