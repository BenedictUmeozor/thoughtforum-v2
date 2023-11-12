import { memo } from "react";

type PropTypes = {
  name: string;
  className?: string;
};

const UserAvatar = memo(({ name, className }: PropTypes) => {
  const letter = name[0]?.toUpperCase();

  const getRandomColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  const backgroundColor = getRandomColor();

  const avatarStyle = {
    backgroundColor: backgroundColor,
  };

  return (
    <div className={className} style={avatarStyle}>
      {letter}
    </div>
  );
});
export default UserAvatar;
