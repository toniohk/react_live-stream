// ** Icons Import
import { Heart } from 'react-feather'

const Footer = () => {
  return (
    <div className='d-flex justify-content-center'>
      <span className='float-md-left d-block d-md-inline-block mt-25'>
        © {new Date().getFullYear()}{' '} by Company
      </span>
    </div>
  )
}

export default Footer
