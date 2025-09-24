import { useAuth } from "../../contexts/AuthContext"
import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import api from "../../services/api"
import { toast } from "react-toastify"
import DashboardLayout from "../global/dashboardLayout"
import dayjs from "dayjs";
import "dayjs/locale/pt-br";

function AllSecrets() {
    const { logout, getToken } = useAuth()
    const navigate = useNavigate()
    const [allSecrets, setAllSecrets] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    const loadSecrets = async () => {
        try {
            setLoading(true)
            setError(null)

            const token = getToken()
            if (!token) {
                logout()
                navigate('/login')
                return
            }

            const response = await api.get("/secrets/", {
                withCredentials: true,
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            setAllSecrets(response.data.data)

        } catch (error) {
            setError(true)
            if (error.response) {
                toast.error(error.response.data?.message || 'Error to find secrets')
            }

            if (error.response?.status === 401) {
                logout()
                navigate('/login')
            }
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        loadSecrets()
    }, [])

    if (loading) {
        return (
            <div className="min-h-screen flex">
                <div className="text-text-primary">Loading...</div>
            </div>
        )
    }

    return (
        <DashboardLayout>

            <div className="flex flex-col  items-start justify-start mt-1 p-1 rounded">
                <h2 className="text-2xl font-bold text-text-primary px-1">Secrets</h2>

                {error && (
                    <p className="mt-2 text-text-secondary">Error to found secrets</p>
                )}

                {!error && (
                    <div className="rounded-md p-1 w-full">
                        {allSecrets && allSecrets.length > 0 && (
                            <ul className="space-y-1">
                                {allSecrets.map((secret) => (
                                    <li key={secret.id} className="relative bg-bg-secondary border border-line p-4 rounded-lg border-l hover:bg-bg-secondary-hover cursor-pointer transition-colors">
                                        <div className="flex justify-between items-start">
                                            <div className="flex flex-col items-start gap-3">
                                                <p className="text-text-primary font-medium">{secret.name}</p>
                                                <p className="text-text-secondary text-sm">{secret.description}</p>
                                            </div>
                                            <div className="flex flex-col items-end gap-3">
                                                <div className="bg-purple-secondary text-text-primary px-2 py-1 rounded-full text-sm font-medium w-max">
                                                    {secret.group}
                                                </div>
                                                <p className="text-sm text-text-secondary">Updated: {dayjs(secret.updated_at).format("DD/MM/YYYY HH:mm")}</p>
                                            </div>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                )}
            </div>
        </DashboardLayout>
    )
}

export default AllSecrets