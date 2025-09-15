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
        <div className="min-h-screen bg-bg text-text-secondary flex flex-col">
            <div className="flex justify-between items-center mx-10 mt-7">
                <h1 className="text-2xl font-bold text-text-primary">Own Byte</h1>
                <button
                    onClick={handleLogout}
                    className="bg-bg-secondary border border-line px-4 py-2 rounded-lg text-red-400 hover:bg-bg-secondary-hover cursor-pointer transition-all font-medium"
                >
                    Logout
                </button>
            </div>
            <main className="flex-1 p-6 bg-bg-secondary border border-line rounded-lg m-10 shadow-lg">
                {children}
            </main>
            <div className="text-text-secondary text-center pb-4">
                <p className="text-sm">Develop by <a className="underline" target="_blank" href="https://github.com/ViniciusCassemira">Vinicius</a></p>
            </div>
        </div>
    )
}

export default DashboardLayout