import logonobg from "../assets/icons/logonobg.png";

const Header = (props) => {
  return (
    <div className="mb-4 md:ml-64 p-4 flex items-center">
      <img
        className="w-12 h-12 mr-3"
        src={logonobg}
        alt="Budget Wingman Logo"
      />
      <h1 className="text-xl font-bold text-[#6147AA]">Budget Wingman</h1>
    </div>
  );
};

export default Header;
