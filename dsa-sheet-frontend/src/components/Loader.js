import { FiLoader } from "react-icons/fi";

const Loader = ({size = 25}) => {
  return (
    <div className="flex justify-center items-center h-full">
      {/* <div className="w-8 h-8 border-2 border-t-blue-500 border-gray-300 rounded-full animate-spin"></div> */}
      <FiLoader className="animate-spin mr-2" size={size} />
    </div>
  );
};

export default Loader;
