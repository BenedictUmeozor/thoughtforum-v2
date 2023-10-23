const Avatar = ({ name = "Benedict" }: { name?: string }) => {
  const letter = name[0].toUpperCase();

  // Function to generate a random background color
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
    <div className="avatar" style={avatarStyle}>
      <p>{letter}</p>
    </div>
  );
};

export default Avatar;
