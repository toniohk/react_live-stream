import api from './api'

const getResourceReports = () => {
  return new Promise((resolve, reject) => {
    api.get('/services/FacebookBuffViewer/reports').then(response => {
      if (response.status === 200) {
        resolve(response.data)
      } else {
        reject(response)
      }
    }).catch(error => {
      console.log(error)
      reject(error)
    })
  })
}

export { getResourceReports }