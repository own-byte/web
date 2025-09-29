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
import { ArrowLeft } from "lucide-react"
import Modal from "../../components/ModalDelete"
import ModalEdit from "./ModalEditSecret"

function SecretDetails() {
  const { id } = useParams()
  const { logout, getToken } = useAuth()
  const navigate = useNavigate()
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)
  const [SecretData, setSecretData] = useState();

  // Secret delete
  const [showModal, setShowModal] = useState(false);
  const openModal = () => {
    setShowModal(true);
  };
  const closeModal = () => {
    setShowModal(false);
  };
  const deleteSecret = async () => {
    try {
      setError(null)
      setLoading(true)

      const token = getToken()
      if (!token) {
        logout()
        navigate('/login')
        return
      }

      const { data } = await api.delete(`/secrets/${id}`, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      toast.success(data.message)
      navigate(-1)

    } catch (error) {
      setError(true)
      if (error.response) {
        toast.error(error.response.data?.message || 'Error to delete secret')
      }

      if (error.response?.status === 401) {
        logout()
        navigate('/login')
      }
    } finally {
      setLoading(false)
      setShowModal(false);
    }
  };

  // Secret update
  const [showModalEdit, setShowModalEdit] = useState(false);
  const openModalEdit = () => {
    setShowModalEdit(true);
  };
  const closeModalEdit = () => {
    setShowModalEdit(false);
  };
  const editSecret = async (formData) => {
    try {
      setError(null)
      const token = getToken()
      if (!token) {
        logout()
        navigate('/login')
        return
      }

      const { data } = await api.put(`/secrets/${id}`, {
        name: formData.name,
        description: formData.description,
        value: formData.value
      }, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      toast.success(data.message)
      navigate("/")
    } catch (error) {
      setError(true)
      if (error.response) {
        toast.error(error.response.data?.message || 'Error to update secret')
      }
      if (error.response?.status === 401) {
        logout()
        navigate('/login')
      }
    } finally {
      setShowModalEdit(false);
    }
  };

  const loadSecret = async () => {
    try {
      setError(null)
      setLoading(true)

      const token = getToken()
      if (!token) {
        logout()
        navigate('/login')
        return
      }

      const responseSecret = await api.get(`/secrets/${id}`, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      setSecretData(responseSecret.data.data)


    } catch (error) {
      setError(true)
      if (error.response) {
        toast.error(error.response.data?.message || 'Error to find secret')
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
      loadSecret()
    }
  }, [id])

  if (loading) { return }

  return (
    <DashboardLayout>
      <div className="flex flex-col items-start justify-start mt-1 p-1 rounded gap">
        <div className="flex items-center gap-1 mb-1">
          <button
            onClick={() => navigate(-1)}
            className=" hover:bg-bg-secondary rounded-lg transition-colors group"
          >
            <ArrowLeft size={20} className="text-text-primary group-hover:cursor-pointer" />
          </button>
          <h2 className="text-2xl font-bold text-text-primary">Secret details</h2>
        </div>
        <div className="border border-line flex flex-col gap-2 p-2  w-full">
          <div className='flex items-center justify-between'>
            <div className='flex gap-2 items-center flex-1'>
              <p className="w-20 text-right">Name:</p>
              <input
                type="text"
                disabled
                placeholder={SecretData.name}
                className='bg-bg-secondary-hover p-1 text-text-primary border border-line rounded-md flex-1'
              />
            </div>
            <div className='flex gap-1 items-center ml-4'>
              <button className='bg-bg-secondary border border-line hover:bg-bg-secondary-hover px-3 py-0.5 rounded-lg text-purple-primary transition-all cursor-pointer font-medium' onClick={openModalEdit}>
                Edit
              </button>
              <button className='bg-bg-secondary border border-line hover:bg-bg-secondary-hover px-3 py-0.5 rounded-lg text-red-400 transition-all cursor-pointer font-medium' onClick={openModal}>
                Delete
              </button>
            </div>
          </div>

          <div className='flex gap-2 items-center'>
            <p className="w-20 text-right">Description:</p>
            <input
              type="text"
              disabled
              placeholder={SecretData.description}
              className='bg-bg-secondary-hover p-1 text-text-primary border border-line rounded-md flex-1'
            />
          </div>

          <div className='flex gap-2 items-center'>
            <p className="w-20 text-right">Group:</p>
            <input
              type="text"
              disabled
              placeholder={SecretData.group}
              className='bg-bg-secondary-hover p-1 text-text-primary border border-line rounded-md flex-1'
            />
          </div>

          <div className='flex gap-2 items-center'>
            <p className="w-20 text-right">Value:</p>
            <div className='flex gap-2 flex-1'>
              <input
                type="text"
                disabled
                placeholder="**********"
                className='bg-bg-secondary-hover p-1 text-text-primary border border-line rounded-md flex-1 font-mono'
              />
              <button
                onClick={() => {
                  navigator.clipboard.writeText(SecretData.value)
                  toast.success('Copied successfully');
                }}
                className='bg-bg-secondary border border-line hover:bg-bg-secondary-hover px-3 py-1 rounded-lg text-purple-primary transition-all cursor-pointer font-medium'
                title="Copy value"
              >
                Copy
              </button>
            </div>
          </div>

          <div className='flex gap-6'>
            <div className='flex gap-2 items-center flex-1'>
              <p className="w-20 text-right">Created:</p>
              <input
                type="text"
                disabled
                placeholder={dayjs(SecretData.created_at).format("DD/MM/YYYY HH:mm")}
                className='bg-bg-secondary-hover p-1 text-text-primary border border-line rounded-md flex-1'
              />
            </div>
            <div className='flex gap-2 items-center flex-1'>
              <p className="w-20 text-right">Updated:</p>
              <input
                type="text"
                disabled
                placeholder={dayjs(SecretData.updated_at).format("DD/MM/YYYY HH:mm")}
                className='bg-bg-secondary-hover p-1 text-text-primary border border-line rounded-md flex-1'
              />
            </div>
          </div>
        </div>
        <Modal
          isOpen={showModal}
          onClose={closeModal}
          onExecute={deleteSecret}
          title="Confirm Deletion"
          description={`The secret "${SecretData.name}" will be permanently removed.`}
        />
        <ModalEdit
          isOpen={showModalEdit}
          onClose={closeModalEdit}
          onExecute={editSecret}
          data={SecretData}
        />
      </div>
    </DashboardLayout>
  )
}

export default SecretDetails