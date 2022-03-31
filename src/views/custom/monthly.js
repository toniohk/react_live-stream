import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { Row, Col, Button, Form, FormGroup, Label, Input, Card, CardBody, CardText, CardImg } from 'reactstrap'
import { Play, Pause, ArrowLeft } from 'react-feather'

import ApexAreaChart from './components/ApexAreaCharts'
import Alert from './components/Alert'

import { useDispatch, useSelector } from 'react-redux'
import { getData, getChartData, deactive, active, getSubData, pause, resume } from './store/actions/monthly'

import background from '../../assets/images/backgrounds/default_background.png'
import logo from '../../assets/images/avatars/default_logo.png'

const Monthly = () => {
  const { register, errors, handleSubmit } = useForm()

  const dispatch = useDispatch()
  const monthly = useSelector(state => state.monthly)

  const { data, reports, subData, target, success } = monthly

  const handleSuccess = (type) => {
    let message = ''
    switch (type) {
      case 'deactive':
        message = 'Deactivated Successfully'
        break
      case 'active':
        message = 'Activated Successfully'
        break
      case 'pause':
        message = 'Paused Successfully'
        break
      case 'resume':
        message = 'Resumed Successfully'
        break 
    
      default:
        break
    }
    return Alert.fire({
      title: 'Success!',
      text: message,
      icon: 'success',
      customClass: {
        confirmButton: 'btn btn-primary'
      },
      buttonsStyling: false
    })
  }

  const getReportsError = () => {
    return Alert.fire({
      title: 'Error!',
      text: 'No livestream',
      icon: 'error',
      customClass: {
        confirmButton: 'btn btn-primary'
      },
      buttonsStyling: false
    })
  }

  useEffect(() => {
    if (Boolean(target) && Boolean(data)) {
      dispatch(getSubData(data.id))

      if (data.metadata.running.length > 0) dispatch(getChartData(data.metadata.running[0]))
      else getReportsError()
    }
  }, [target, data])

  useEffect(() => {
    if (Boolean(success)) {
      handleSuccess(success)
      dispatch({ type: 'MONTHLY_ALERTED' })
    }
  }, [success])

  const loadData = (pageID) => {
    dispatch(getData(pageID))
  }

  const onSubmit = data => {
    loadData(data.pageID)
  }

  const onAction = type => {
    switch (type) {
      case 'deactive':
        dispatch(deactive(data.id))
        break
      case 'active':
        dispatch(active(data.id))
        break
      case 'pause':
        dispatch(pause(data.id, subData.id))
        break
      case 'resume':
        dispatch(resume(data.id, subData.id))
        break

      default:
        break
    }
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
                  onClick={() => dispatch({ type: 'MONTHLY_INITIAL' })}
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
                        {['created', 'running'].includes(data.status) ? (
                          <Button.Ripple
                            className='btn-icon rounded-circle'
                            color='warning'
                            disabled={data.status === 'done'}
                            onClick={() => onAction('deactive')}
                          >
                            <Pause size={16} />
                          </Button.Ripple>
                        ) : (
                          <Button.Ripple
                            className='btn-icon rounded-circle'
                            color='success'
                            disabled={data.status === 'done'}
                            onClick={() => onAction('active')}
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
                      {data.status !== 'done' && (
                        <div className='mt-2 d-flex justify-content-between'>
                          <h5>Status:</h5>
                          <CardText>{data.status}</CardText>
                        </div>
                      )}
                      <div className='mt-2 d-flex justify-content-between'>
                        <h5>Target Type:</h5>
                        <CardText>{data.target_type}</CardText>
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
                        <h5>Daily limit:</h5>
                        <CardText>{data.daily_limit}</CardText>
                      </div>
                      <div className='mt-2 d-flex justify-content-between'>
                        <h5>Today Remain:</h5>
                        <CardText>{data.today_remain}</CardText>
                      </div>
                      <div className='mt-2 d-flex justify-content-between'>
                        <h5>Last Reset Time:</h5>
                        <CardText>{(new Date(data.last_reset_time)).toLocaleString()}</CardText>
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
            {Boolean(subData) && (
              <Col sm='12'>
                <Card className='order-info mb-2'>
                  <CardBody>
                    <div className='d-flex justify-content-between'>
                      <h2 className='mb-100'>Sub Order Info</h2>
                      {subData.status === 'running' ? (
                        <Button.Ripple
                          className='btn-icon rounded-circle'
                          color='warning'
                          disabled={subData.status === 'done'}
                          onClick={() => onAction('pause')}
                        >
                          <Pause size={16} />
                        </Button.Ripple>
                      ) : (
                        <Button.Ripple
                          className='btn-icon rounded-circle'
                          color='success'
                          disabled={subData.status === 'done'}
                          onClick={() => onAction('resume')}
                        >
                          <Play size={16} />
                        </Button.Ripple>
                      )}
                    </div>
                    <div className='mt-2 d-flex justify-content-between'>
                      <h5>Detected:</h5>
                      <CardText>{(new Date(subData.created_at)).toLocaleString()}</CardText>
                    </div>
                    <div className='mt-2 d-flex justify-content-between'>
                      <h5>Facebook Video ID:</h5>
                      <CardText>{subData.target}</CardText>
                    </div>
                    <div className='mt-2 d-flex justify-content-between'>
                      <h5>Status:</h5>
                      <CardText>{subData.status}</CardText>
                    </div>
                    <div className='mt-2 d-flex justify-content-between'>
                      <h5>Order Amount:</h5>
                      <CardText>{subData.amount}</CardText>
                    </div>
                    <div className='mt-2 d-flex justify-content-between'>
                      <h5>Start Amount:</h5>
                      <CardText>{subData.start_count}</CardText>
                    </div>
                    <div className='mt-2 d-flex justify-content-between'>
                      <h5>Target Amount:</h5>
                      <CardText>{subData.target_count}</CardText>
                    </div>
                    <div className='mt-2 d-flex justify-content-between'>
                      <h5>Expire Time:</h5>
                      <CardText>{(new Date(subData.end_time)).toLocaleString()}</CardText>
                    </div>
                  </CardBody>
                </Card>
              </Col>
            )}
          </Row>
        </div>
      ) : (
        <div className='match-height d-flex align-items-center justify-content-center row'>
          <Form onSubmit={handleSubmit(onSubmit)} className='target-form'>
            <div className='w-100 d-flex justify-content-center'>
              <Label for='pageID'><h1>Please insert Profile/Page ID</h1></Label>
            </div>
            <FormGroup className='d-flex target-container'>
              <Row className='w-100 m-0'>
                <Col xl={10} md={9} className='py-1'>
                  <Input
                    id='pageID'
                    name='pageID'
                    innerRef={register({ required: true })}
                    invalid={errors.pageID && true}
                    placeholder='Enter Profile/Page ID'
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
    </div>
  )
}

export default Monthly
