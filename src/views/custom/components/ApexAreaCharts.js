import Chart from 'react-apexcharts'
import { Card, CardBody } from 'reactstrap'

import '@styles/react/libs/charts/apex-charts.scss'

const ApexAreaCharts = ({ items }) => {
  const options = {
    chart: {
      parentHeightOffset: 0,
      toolbar: {
        show: false
      }
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      show: false,
      curve: 'straight'
    },
    legend: {
      position: 'top',
      horizontalAlign: 'start'
    },
    grid: {
      xaxis: {
        lines: {
          show: true
        }
      }
    },
    colors: ['#2bdac7'],
    xaxis: {
      categories: items.map(item => (new Date(item.created_at)).toLocaleString())
    },
    fill: {
      opacity: 1,
      type: 'solid'
    },
    tooltip: {
      shared: false
    },
    yaxis: {
      opposite: false
    }
  }

  const series = [
    {
      name: 'Amount',
      data: items.map(item => item.amount)
    }
  ]

  return (
    <Card>
      <CardBody>
        <Chart options={options} series={series} type='area' height={400} />
      </CardBody>
    </Card>
  )
}
export default ApexAreaCharts
