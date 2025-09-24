import React from 'react'
import { toast } from "react-toastify"
import { useParams } from 'react-router-dom'
import { useAuth } from "../../contexts/AuthContext"
import { useNavigate } from "react-router-dom"
import DashboardLayout from '../global/dashboardLayout'
import api from "../../services/api"
import { useEffect, useState } from 'react'
import dayjs from "dayjs";
import "dayjs/locale/pt-br";

function GroupSecrets() {
  const { id } = useParams()
  const groupId = parseInt(id)
  const { logout, getToken } = useAuth()
  const navigate = useNavigate()
  const [group, setGroup] = useState([])
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

      const responseSecret = await api.get(`/groups/${id}/secrets`, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      setAllSecrets(responseSecret.data.data)

      const responseGroup = await api.get(`/groups/${id}`, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      setGroup(responseGroup.data.data);


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
    if (id) {
      loadSecrets()
    }
  }, [id])

  return (
    <DashboardLayout>
      <div className="flex flex-col  items-start justify-start mt-1 p-1 rounded">
        <h2 className="text-2xl font-bold text-text-primary px-1">Details</h2>
        <div className="border border-line flex flex-col gap-3 p-1 w-full">
          <div className='flex items-center justify-between'>
            <div className='flex gap-2 items-center'>
              <p>Name:</p>
              <input type="text" disabled placeholder={group.name} className='bg-bg-secondary-hover p-1 text-text-primary border border-line rounded-md' />
            </div>
            <div className='flex gap-1 items-center'>
              <button className='bg-bg-secondary border border-line hover:bg-bg-secondary-hover px-3 py-0.5 rounded-lg text-purple-primary transition-all cursor-pointer font-medium'>
                Edit
              </button>
              <button className='bg-bg-secondary border border-line hover:bg-bg-secondary-hover px-3 py-0.5 rounded-lg text-red-400 transition-all cursor-pointer font-medium'>
                Delete
              </button>
            </div>
          </div>
          <div className='flex gap-2 items-center'>
            <p>Description:</p>
            <input type="text" disabled placeholder={group.description} className='bg-bg-secondary-hover p-1 text-text-primary border border-line rounded-md' />
          </div>
          <div className='flex justify-between'>
            <div className='flex gap-2 items-center'>
              <p>Created:</p>
              <input type="text" disabled placeholder={dayjs(group.created_at).format("DD/MM/YYYY HH:mm")} className='bg-bg-secondary-hover p-1 text-text-primary border border-line rounded-md' />
            </div>
            <div className='flex gap-2 items-center'>
              <p>Updated:</p>
              <input type="text" disabled placeholder={dayjs(group.updated_at).format("DD/MM/YYYY HH:mm")} className='bg-bg-secondary-hover p-1 text-text-primary border border-line rounded-md' />
            </div>
          </div>
        </div>

        <h2 className="text-2xl font-bold text-text-primary px-1">Secrets</h2>

        {error && (
          <p className="mt-2 text-text-secondary">Error to found secrets</p>
        )}

        {!error && (
          <div className="rounded-md p-1 w-full">
            {allSecrets && allSecrets.length > 0 ? (
              <ul className="space-y-1">
                {allSecrets.map((secret) => (
                  <li key={secret.id} className="relative bg-bg-secondary border border-line p-4 rounded-lg border-l hover:bg-bg-secondary-hover cursor-pointer transition-colors">
                    <div className="flex justify-between items-start">
                      <div className="flex flex-col items-start gap-3">
                        <p className="text-text-primary font-medium">{secret.name}</p>
                        <p className="text-text-secondary text-sm">{secret.description}</p>
                      </div>
                      <div className="flex flex-col items-start">
                        <p className="text-sm text-text-secondary">Updated: {dayjs(secret.updated_at).format("DD/MM/YYYY HH:mm")}</p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <div className='flex flex-col items-center w-full h-80 justify-center gap-1'>
                <img src="/disease.png" alt="Confused person" className='w-40' />
                <p className='text-text-secondary'>No secrets here</p>
                <button className="bg-bg-secondary border border-line hover:bg-bg-secondary-hover px-2 py-1 rounded-lg text-purple-primary transition-all cursor-pointer font-medium" onClick={() => navigate("/secret/create")}>
                  New Secret
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}

export default GroupSecrets