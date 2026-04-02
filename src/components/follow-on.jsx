import { FaInstagram, FaXTwitter, FaYoutube } from "react-icons/fa6";

const FollowOn = () => {
  return (
    <div className="faded-text pt-2">
      <span className="text-gray-400 font-medium pb-4 block">Follow us on:</span>
      <div className="flex gap-4 pt-1">
        <a href="#" className="bg-white p-2 rounded-full text-gray-800 hover:bg-indigo-600 hover:text-white transition-all transform hover:scale-110 shadow-lg cursor-pointer group">
          <FaYoutube size={20} className="group-hover:scale-110 transition-transform" />
        </a>
        <a href="#" className="bg-white p-2 rounded-full text-gray-800 hover:bg-pink-600 hover:text-white transition-all transform hover:scale-110 shadow-lg cursor-pointer group">
          <FaInstagram size={20} className="group-hover:scale-110 transition-transform"/>
        </a>
        <a href="#" className="bg-white p-2 rounded-full text-gray-800 hover:bg-blue-400 hover:text-white transition-all transform hover:scale-110 shadow-lg cursor-pointer group">
          <FaXTwitter size={20} className="group-hover:scale-110 transition-transform"/>
        </a>
      </div>
    </div>
  );
};

export default FollowOn;
