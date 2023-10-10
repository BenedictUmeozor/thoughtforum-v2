const Avatar = ({ name = "Benedict" }: { name?: string }) => {
  const letter = name[0].toUpperCase();
  return (
    <div className="avatar">
      <p>{letter}</p>
    </div>
  );
};

export default Avatar;
