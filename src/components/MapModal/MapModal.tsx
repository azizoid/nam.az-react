import { useRouter } from 'next/router'

import { useSelector } from 'react-redux'

import { selectNamazData } from '@/store/namazSlice'

import { Modal, ModalProps } from './Modal/Modal'
import { Xerite } from './Xerite/Xerite'

export const MapModal = ({ open, onClose }: ModalProps) => {
  const router = useRouter()
  const { city } = useSelector(selectNamazData)

  const handleCityChange = (newCityId: number) => {
    router.push(`/${newCityId}`)
    onClose()
  }

  return (
    <Modal open={open} onClose={onClose}>
      <Xerite onClick={handleCityChange} selectedCity={city ?? 1} />
    </Modal>
  )
}

export default MapModal
