import api from './api'
import config from './config'

const {DOMAIN_ID, USER_ID} = config

const getInfo = (target) => {
  return new Promise((resolve, reject) => {
    api.get(`/domains/${DOMAIN_ID}/services/FacebookBuffViewer/users/${USER_ID}/orders?target=${target}`).then(response => {
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

const getReports = (target) => {
  return new Promise((resolve, reject) => {
    api.get(`/services/FacebookBuffViewer/targets/${target}/reports`).then(response => {
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

const pauseOrder = (order_id, delay) => {
  return new Promise((resolve, reject) => {
    api.post(`/domains/${DOMAIN_ID}/services/FacebookBuffViewer/users/${USER_ID}/orders/${order_id}/~pause`, {
      decrease_delay: delay
    }).then(response => {
      if (response.status === 201) {
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

const resumeOrder = (order_id, delay) => {
  return new Promise((resolve, reject) => {
    api.post(`/domains/${DOMAIN_ID}/services/FacebookBuffViewer/users/${USER_ID}/orders/${order_id}/~resume`, {
      increase_delay: delay
    }).then(response => {
      if (response.status === 201) {
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

const stopOrder = (order_id) => {
  return new Promise((resolve, reject) => {
    api.post(`/domains/${DOMAIN_ID}/services/FacebookBuffViewer/users/${USER_ID}/orders/${order_id}/~stop`).then(response => {
      if (response.status === 201) {
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

export { getInfo, getReports, pauseOrder, resumeOrder, stopOrder }