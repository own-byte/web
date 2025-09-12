import { useAuth } from "../../contexts/AuthContext"
import { useNavigate } from "react-router-dom"

function DashboardLayout({ children }) {
    const { logout, getToken } = useAuth()
    const navigate = useNavigate()

    const handleLogout = () => {
        logout()
        navigate('/login')
    }

    return (
         <div className="min-h-screen bg-black text-white flex flex-col">
            <div className="p-8">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold text-white">Own Byte</h1>
                    <button
                        onClick={handleLogout}
                        className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded text-white transition-colors"
                    >
                        Logout
                    </button>
                </div>
            </div>

            <main className="flex-1 p-4 bg-gray-900 border-1 border-white rounded-lg m-10">
                {children}
            </main>

            {}
            <div className="text-white text-center">
                <p>Develop by Vinicius</p>
            </div>
        </div>
    )
}

export default DashboardLayout