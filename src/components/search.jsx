import { Navigate, useNavigate } from "react-router-dom"

const Search = () => {
  
  const navigate = useNavigate();

  return (
    <div className="flex flex-row items-center justify-between">
      <div className="w-1/5">
        <input
          className="bg-bg-secondary border border-line p-3 rounded-lg w-full text-text-primary placeholder-gray-500 focus:border-purple-500/60 focus:outline-none transition-colors"
          type="text"
          placeholder="Search..."
        />
      </div>
      <div className="flex flex-row gap-2">
        <button className="bg-bg-secondary border border-line hover:bg-bg-secondary-hover p-3 rounded-lg text-purple-primary transition-all cursor-pointer font-medium" onClick={() => navigate("/group/create")}>
          New Group
        </button>
        <button className="bg-bg-secondary border border-line hover:bg-bg-secondary-hover p-3 rounded-lg text-purple-primary transition-all cursor-pointer font-medium" onClick={() => navigate("/secret/create")}>
          New Secret
        </button>
      </div>
    </div>
  )
}

export default Search