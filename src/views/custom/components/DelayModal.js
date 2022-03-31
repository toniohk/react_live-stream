import { useState } from 'react'
import { Button, Input, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'

const DelayModal = ({ isOpen, type, onClose, onSubmit }) => {
  const [value, setValue] = useState(1)

  return (
    <Modal
      isOpen={isOpen}
      toggle={() => onClose()}
      className='modal-dialog-centered'
      modalClassName='modal-primary'
    >
      <ModalHeader toggle={() => onClose()}>{type === 'pause' ? 'Descrease' : 'Increase'} Delay</ModalHeader>
      <ModalBody>
        <Input
          name='delay'
          type='number'
          invalid={value < 1 || value > 10}
          placeholder='Enter delay value'
          value={value}
          onChange={e => setValue(parseInt(e.target.value))}
        />
      </ModalBody>
      <ModalFooter>
        <Button color='primary' onClick={() => {
          if (value >= 1 && value <= 10) onSubmit(value)
        }}>
          {type === 'pause' ? 'Pause' : 'Resume'}
        </Button>
      </ModalFooter>
    </Modal>
  )
}

export default DelayModal