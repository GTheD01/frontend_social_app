interface SuggestedPeopleProps {
  logo: string;
  username: string;
  profession: string;
}

const SuggestedPeople = ({
  logo,
  username,
  profession,
}: SuggestedPeopleProps) => {
  return (
    <div className="flex items-center mt-6">
      <img
        src={logo}
        alt="user pic"
        className="w-12 h-12 object-contain rounded-full hover:cursor-pointer"
      />
      <div>
        <p className="text-sky-500 text-md hover:cursor-pointer">{username}</p>
        <span className="text-gray-400 text-sm">{profession}</span>
      </div>
      <span className="ml-auto rounded-full bg-gray-300 w-7 h-7 text-center hover:cursor-pointer">
        +
      </span>
    </div>
  );
};

export default SuggestedPeople;
