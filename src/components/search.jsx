import { useNavigate } from "react-router-dom"

const Search = () => {
  const navigate = useNavigate();
  
  return (
    <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 w-full">
      <div className="w-full sm:w-2/5 md:w-1/3 lg:w-1/4">
        <input
          className="bg-bg-secondary border border-line p-2 sm:p-2.5 md:p-3 rounded-lg w-full text-sm md:text-base text-text-primary placeholder-gray-500 focus:border-purple-500/60 focus:outline-none transition-colors"
          type="text"
          placeholder="Search..."
        />
      </div>
      
      <div className="flex flex-row gap-2 w-full sm:w-auto">
        <button 
          className="bg-bg-secondary border border-line hover:bg-bg-secondary-hover px-3 sm:px-4 md:px-5 py-1.5 sm:py-2 rounded-lg text-purple-primary transition-all cursor-pointer font-medium text-sm md:text-base flex-1 sm:flex-none whitespace-nowrap" 
          onClick={() => navigate("/group/create")}
        >
          New Group
        </button>
        <button 
          className="bg-bg-secondary border border-line hover:bg-bg-secondary-hover px-3 sm:px-4 md:px-5 py-1.5 sm:py-2 rounded-lg text-purple-primary transition-all cursor-pointer font-medium text-sm md:text-base flex-1 sm:flex-none whitespace-nowrap" 
          onClick={() => navigate("/secret/create")}
        >
          New Secret
        </button>
      </div>
    </div>
  )
}

export default Search