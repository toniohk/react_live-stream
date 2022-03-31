import { useContext, useEffect } from 'react'
import { Card, CardHeader, CardTitle, CardBody, CardText, Row, Col } from 'reactstrap'
import Chart from 'react-apexcharts'
import { HelpCircle } from 'react-feather'
import { ThemeColors } from '@src/utility/context/ThemeColors'

import { useDispatch, useSelector } from 'react-redux'
import { getReports } from './store/actions/resource'

const Dashboard = () => {
  const { colors } = useContext(ThemeColors)
  const dispatch = useDispatch()
  const resource = useSelector(state => state.resource)

  useEffect(() => {
    dispatch(getReports())
  }, [])

  const options = {
    chart: {
      sparkline: {
        enabled: true
      },
      dropShadow: {
        enabled: true,
        blur: 3,
        left: 1,
        top: 1,
        opacity: 0.1
      }
    },
    colors: ['#51e5a8'],
    plotOptions: {
      radialBar: {
        offsetY: 10,
        startAngle: -150,
        endAngle: 150,
        hollow: {
          size: '77%'
        },
        track: {
          background: '#ebe9f1',
          strokeWidth: '50%'
        },
        dataLabels: {
          name: {
            show: false
          },
          value: {
            color: '#5e5873',
            fontFamily: 'Montserrat',
            fontSize: '2.86rem',
            fontWeight: '600'
          }
        }
      }
    },
    fill: {
      type: 'gradient',
      gradient: {
        shade: 'dark',
        type: 'horizontal',
        shadeIntensity: 0.5,
        gradientToColors: [colors.success.main],
        inverseColors: true,
        opacityFrom: 1,
        opacityTo: 1,
        stops: [0, 100]
      }
    },
    stroke: {
      lineCap: 'round'
    },
    grid: {
      padding: {
        bottom: 30
      }
    }
  },
    series = (Boolean(resource.total) && Boolean(resource.available)) ? [parseInt(parseInt(resource.available) / parseInt(resource.total) * 100)] : [0]

  return (
    <div id='dashboard'>
      <Row className='match-height d-flex align-items-center justify-content-center'>
        <Col xl='4' lg='6' md='8' xs='12'>
          {(Boolean(resource.total) && Boolean(resource.available)) && (
            <Card>
              <CardHeader>
                <CardTitle tag='h4'>Resource Overview</CardTitle>
                <HelpCircle size={18} className='text-muted cursor-pointer' />
              </CardHeader>
              <CardBody className='p-0'>
                <Chart options={options} series={series} type='radialBar' height={245} />
              </CardBody>
              <Row className='border-top text-center mx-0'>
                <Col xs='6' className='border-right py-1'>
                  <CardText className='text-muted mb-0'>Total</CardText>
                  <h3 className='font-weight-bolder mb-0'>{resource.total}</h3>
                </Col>
                <Col xs='6' className='py-1'>
                  <CardText className='text-muted mb-0'>Available</CardText>
                  <h3 className='font-weight-bolder mb-0'>{resource.available}</h3>
                </Col>
              </Row>
            </Card>
          )}
        </Col>
      </Row>
    </div>
  )
}

export default Dashboard
