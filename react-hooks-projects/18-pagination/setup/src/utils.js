const paginate = (followers) => {
  const itemsPerPage = 9;
  const pages = Math.ceil(followers.length / itemsPerPage);
  const newFollowers = Array.from({ length: pages }, (_, index) => {
    const startingPoint = index * itemsPerPage;
    return followers.slice(startingPoint, startingPoint + itemsPerPage);
  });
  return newFollowers;
};

export default paginate;
