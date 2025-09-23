import { useAuth } from "../../contexts/AuthContext"
import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import api from "../../services/api"
import { toast } from "react-toastify"

function List() {
  const { logout, getToken } = useAuth()
  const navigate = useNavigate()
  const [allGroups, setAllGroups] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const loadGroups = async () => {
    try {
      setLoading(true)
      setError(null)

      const token = getToken()
      if (!token) {
        logout()
        navigate('/login')
        return
      }

      const { data } = await api.get("/groups/", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      if (data && data.groups) {
        setAllGroups(data.groups)
      } else {
        setAllGroups([])
      }
    } catch (error) {
      setError(true)
      toast.error(error.message)

      if (error.response?.status === 401) {
        logout()
        navigate('/login')
      }
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadGroups()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen flex">
        <div className="text-text-primary">Loading...</div>
      </div>
    )
  }

  return (
    <div className="flex flex-col w-2/7 items-start justify-start mt-1 p-1 rounded">
      <h2 className="text-2xl font-bold text-text-primary px-1">Groups</h2>

      {error && (
        <p className="mt-2 text-text-secondary">Error to found groups</p>
      )}

      {!error && (
        <div className="rounded-md p-1 w-full">
          {allGroups && allGroups.length > 0 && (
            <ul className="space-y-1">
              {allGroups.map((group) => (
                <li key={group.id} className="relative bg-bg-secondary border border-line p-4 rounded-lg border-l hover:bg-bg-secondary-hover cursor-pointer transition-colors" onClick={() => navigate(`/group/${group.id}`)}>
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <p className="text-text-primary font-medium mb-1">{group.name}</p>
                      <p className="text-text-secondary text-sm">{group.description}</p>
                    </div>
                    <div className="bg-purple-secondary text-text-primary px-3 py-1 rounded-full text-sm font-medium">
                      {group.secretsCount}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  )
}

export default List