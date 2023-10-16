type PropTypes = {
  name: string;
  className?: string;
};

const UserAvatar = ({ name, className }: PropTypes) => {
  const letter = name[0].toUpperCase();

  return <div className={className}>{letter}</div>;
};
export default UserAvatar;
