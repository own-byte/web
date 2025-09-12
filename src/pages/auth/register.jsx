import { useRef } from "react"
import { useNavigate, Link } from "react-router-dom"
import { toast } from "react-toastify"
import api from "../../services/api"

function Register() {
  const navigate = useNavigate();
  const nameRef = useRef()
  const emailRef = useRef()
  const passwordRef = useRef()
  
  async function handleSubmit(event) {
    event.preventDefault()
    try {
      const { data } = await api.post('/auth/register', {
        name: nameRef.current.value,
        email: emailRef.current.value,
        password: passwordRef.current.value
      })
      toast.success(data.message)
      navigate('/login')
    } catch(error) {
      if(error.response){
        toast.error(error.response.data?.message)
      }else if(error.request) {
        toast.error('Connection error. Check your internet.')
      }else {
        toast.error('Unexpected error')
      }
    }
  }
  
  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="max-w-md w-full mx-4">
        <div className="bg-[#292A2A] p-8 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-4 text-center text-[#fdfcfb]">Register</h2>
          
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <input 
              ref={nameRef} 
              className="w-full px-3 py-2 bg-black text-[#fdfcfb] border border-[#fdfcfb] rounded-md focus:outline-none focus:border-[#724E91]" 
              type="text" 
              placeholder="Your name" 
              required
            />
            <input 
              ref={emailRef} 
              className="w-full px-3 py-2 bg-black text-[#fdfcfb] border border-[#fdfcfb] rounded-md focus:outline-none focus:border-[#724E91]" 
              type="email" 
              placeholder="Email" 
              required
            />
            <input 
              ref={passwordRef} 
              className="w-full px-3 py-2 bg-black text-[#fdfcfb] border border-[#fdfcfb] rounded-md focus:outline-none focus:border-[#724E91]" 
              type="password" 
              placeholder="Password" 
              required
            />
            <button 
              type="submit"
              className="w-full mt-2 bg-[#724E91] text-white py-2 px-4 rounded-md hover:bg-purple-600 transition-colors"
            >
              Register
            </button>
          </form>
          
          <div className="mt-4 text-center">
            <Link
              to="/login"
              className="text-[#724E91] hover:text-purple-600 text-sm"
            >
              Do you have an account? Log in
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register