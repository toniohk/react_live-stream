import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { Row, Col, Button, Form, FormGroup, Label, Input, Card, CardBody, CardText, CardImg } from 'reactstrap'
import { Square, Play, Pause, ArrowLeft } from 'react-feather'

import ApexAreaChart from './components/ApexAreaCharts'
import DelayModal from './components/DelayModal'
import Alert from './components/Alert'

import { useDispatch, useSelector } from 'react-redux'
import { getData, getChartData, pause, resume, stop } from './store/actions/singular'

import background from '../../assets/images/backgrounds/default_background.png'
import logo from '../../assets/images/avatars/default_logo.png'

const Singular = () => {
  const { register, errors, handleSubmit } = useForm()

  const dispatch = useDispatch()
  const singular = useSelector(state => state.singular)
  const { data, reports, target, success } = singular

  const [modal, setModal] = useState({ isOpen: false, type: 'pause' })

  const handleSuccess = (type) => {
    let message = ''
    switch (type) {
      case 'pause':
        message = 'Paused Successfully'
        break
      case 'resume':
        message = 'Resumed Successfully'
        break
      case 'stop':
        message = 'Stopped Successfully'
        break
    
      default:
        break
    }
    return Alert.fire({
      title: 'Success!',
      text: 'message',
      icon: 'success',
      customClass: {
        confirmButton: 'btn btn-primary'
      },
      buttonsStyling: false
    })
  }

  useEffect(() => {
    if (Boolean(success)) {
      handleSuccess(success)
      dispatch({ type: 'SINGULAR_ALERTED' })
    }
  }, [success])

  const loadData = (videoID) => {
    dispatch(getData(videoID))
    dispatch(getChartData(videoID))
  }

  const onSubmit = data => {
    loadData(data.videoID)
  }

  const onAction = value => {
    if (!Boolean(value)) {
      dispatch(stop(data.id))
    } else if (modal.type === 'pause') {
      dispatch(pause(data.id, value))
    } else {
      dispatch(resume(data.id, value))
    }

    setModal(prevState => ({ ...prevState, isOpen: false }))
  }

  return (
    <div className='information-container'>
      {Boolean(target) ? (
        <div className='information'>
          <Row>
            <Col sm='12'>
              <div className='d-flex justify-content-start mb-1'>
                <Button.Ripple
                  className='btn-icon'
                  color='flat-secondary'
                  onClick={() => dispatch({ type: 'SINGULAR_INITIAL' })}
                >
                  <ArrowLeft size={32} />
                </Button.Ripple>
              </div>
            </Col>
            {Boolean(data) && (
              <>
                <Col sm='12'>
                  <Card className='profile mb-2'>
                    <CardImg src={background} alt='Background' top />
                    <div className='position-relative'>
                      <div className='profile-img-container d-flex align-items-center'>
                        <div className='profile-img'>
                          <img className='rounded img-fluid' src={data.thumbnail || logo} alt='Card image' />
                        </div>
                      </div>
                      <div className='profile-action'>
                        <Button.Ripple
                          className='btn-icon rounded-circle'
                          color='danger'
                          disabled={data.status === 'done'}
                          onClick={() => onAction()}
                        >
                          <Square size={16} />
                        </Button.Ripple>
                        {data.status === 'running' ? (
                          <Button.Ripple
                            className='btn-icon rounded-circle'
                            color='warning'
                            disabled={data.status === 'done'}
                            onClick={() => setModal({ isOpen: true, type: 'pause' })}
                          >
                            <Pause size={16} />
                          </Button.Ripple>
                        ) : (
                          <Button.Ripple
                            className='btn-icon rounded-circle'
                            color='success'
                            disabled={data.status === 'done'}
                            onClick={() => setModal({ isOpen: true, type: 'resume' })}
                          >
                            <Play size={16} />
                          </Button.Ripple>
                        )}
                      </div>
                    </div>
                    <div className='profile-description'>
                      <h2>{data.title}</h2>
                      <p>{data.description}</p>
                    </div>
                  </Card>
                </Col>
                <Col sm='12'>
                  <Card className='order-info mb-2'>
                    <CardBody>
                      <h2 className='mb-100'>Order Info</h2>
                      <div className='mt-2 d-flex justify-content-between'>
                        <h5>Order ID:</h5>
                        <CardText>{data.id}</CardText>
                      </div>
                      <div className='mt-2 d-flex justify-content-between'>
                        <h5>Status:</h5>
                        <CardText>{data.status}</CardText>
                      </div>
                      <div className='mt-2 d-flex justify-content-between'>
                        <h5>Perfect Panel ID:</h5>
                        <CardText>{data.external_order_id || '-'}</CardText>
                      </div>
                      <div className='mt-2 d-flex justify-content-between'>
                        <h5>Facebook Video ID:</h5>
                        <CardText>{data.target}</CardText>
                      </div>
                      <div className='mt-2 d-flex justify-content-between'>
                        <h5>Order Amount:</h5>
                        <CardText>{data.amount}</CardText>
                      </div>
                      <div className='mt-2 d-flex justify-content-between'>
                        <h5>Start Amount:</h5>
                        <CardText>{data.start_amount}</CardText>
                      </div>
                      <div className='mt-2 d-flex justify-content-between'>
                        <h5>Target Amount:</h5>
                        <CardText>{data.target_amount}</CardText>
                      </div>
                      <div className='mt-2 d-flex justify-content-between'>
                        <h5>Expire Time:</h5>
                        <CardText>{(new Date(data.end_time)).toLocaleString()}</CardText>
                      </div>
                    </CardBody>
                  </Card>
                </Col>
              </>
            )}
            {reports.length > 0 && (
              <Col sm='12'>
                <ApexAreaChart items={reports} />
              </Col>
            )}
          </Row>
        </div>
      ) : (
        <div className='match-height d-flex align-items-center justify-content-center row'>
          <Form onSubmit={handleSubmit(onSubmit)} className='target-form'>
            <div className='w-100 d-flex justify-content-center'>
              <Label for='videoID'><h1>Please insert Live Video ID</h1></Label>
            </div>
            <FormGroup className='d-flex target-container'>
              <Row className='w-100 m-0'>
                <Col xl={10} md={9} className='py-1'>
                  <Input
                    id='videoID'
                    name='videoID'
                    innerRef={register({ required: true })}
                    invalid={errors.videoID && true}
                    placeholder='Enter Live Video ID'
                  />
                </Col>
                <Col xl={2} md={3} className='py-1'>
                  <Button.Ripple color='primary' type='submit'>
                    Get Info
                  </Button.Ripple>
                </Col>
              </Row>
            </FormGroup>
          </Form>
        </div>
      )}
      <DelayModal
        isOpen={modal.isOpen}
        type={modal.type}
        onClose={() => setModal(prevState => ({ ...prevState, isOpen: false }))}
        onSubmit={onAction}
      />
    </div>
  )
}

export default Singular
