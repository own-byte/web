import { useAuth } from "../../contexts/AuthContext"
import { useState } from "react"
import { useRef } from "react"
import { useNavigate, Link } from "react-router-dom"
import { toast } from "react-toastify"
import api from "../../services/api"
import DashboardLayout from "../global/dashboardLayout"

function GroupCreate() {
    const { logout, getToken } = useAuth()
    const navigate = useNavigate();
    const nameRef = useRef()
    const descriptionRef = useRef()
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    async function handleSubmit(event) {
        event.preventDefault()
        try {
            setLoading(true)
            setError(null)

            const token = getToken()
            if (!token) {
                logout()
                navigate('/login')
                return
            }
            const { data } = await api.post('/groups',
                {
                    name: nameRef.current.value,
                    description: descriptionRef.current.value
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            toast.success(data.message)
        } catch (error) {
            if (error.response) {
                toast.error(error.response.data.message)
            } else if (error.request) {
                toast.error('Connection error. Check your internet.')
            } else {
                toast.error('Unexpected error')
            }
        }
        navigate("/")
    }

    return (
        <DashboardLayout>
            <div className="mt-30 flex items-center justify-center">
                <div className="max-w-md w-full mx-4">
                    <div className="bg-bg-secondary p-8 rounded-lg sh border border-line">
                        <h2 className="text-2xl font-bold mb-4 text-center text-text-primary">New Group</h2>

                        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                            <input
                                ref={nameRef}
                                className="w-full px-3 py-2 bg-bg-secondary text-text-primary border border-line rounded-md focus:outline-none focus:border-purple-secondary"
                                type="text"
                                placeholder="Name"
                                required
                            />
                            <input
                                ref={descriptionRef}
                                className="w-full px-3 py-2 bg-bg-secondary text-text-primary border border-line rounded-md focus:outline-none focus:border-purple-secondary"
                                type="name"
                                placeholder="Description (Optional)"
                            />
                            <div className="flex gap-2 mt-2">
                                <button
                                    type="submit" className="w-full bg-purple-primary text-white py-2 px-4 rounded-md cursor-pointer">
                                    Create
                                </button>
                                <button className="w-full bg-bg-secondary border border-line text-red-400 py-2 px-4 rounded-md cursor-pointer hover:bg-bg-secondary-hover" onClick={() => navigate("/")}>
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    )
}

export default GroupCreate