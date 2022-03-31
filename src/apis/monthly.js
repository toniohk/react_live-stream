import api from './api'
import config from './config'

const {DOMAIN_ID, USER_ID} = config

const getInfo = (target) => {
  return new Promise((resolve, reject) => {
    api.get(`/domains/${DOMAIN_ID}/services/FacebookAutoBuffViewer/users/${USER_ID}/orders?target=${target}`).then(response => {
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
    api.get(`/services/FacebookAutoBuffViewer/targets/${target}/reports`).then(response => {
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

const deactiveOrder = (order_id) => {
  return new Promise((resolve, reject) => {
    api.post(`/domains/${DOMAIN_ID}/services/FacebookAutoBuffViewer/users/${USER_ID}/orders/${order_id}/~deactive`).then(response => {
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

const activeOrder = (order_id) => {
  return new Promise((resolve, reject) => {
    api.post(`/domains/${DOMAIN_ID}/services/FacebookAutoBuffViewer/users/${USER_ID}/orders/${order_id}/~active`).then(response => {
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

const getSubInfo = (order_id) => {
  return new Promise((resolve, reject) => {
    api.get(`/domains/${DOMAIN_ID}/users/${USER_ID}/services/FacebookAutoBuffViewer/orders/${order_id}/sub-orders`).then(response => {
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

const pauseSubOrder = (order_id, subOrder_id) => {
  return new Promise((resolve, reject) => {
    api.post(`/domains/${DOMAIN_ID}/services/FacebookAutoBuffViewer/users/${USER_ID}/orders/${order_id}/sub-orders/${subOrder_id}/~pause`).then(response => {
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

const resumeSubOrder = (order_id, subOrder_id) => {
  return new Promise((resolve, reject) => {
    api.post(`/domains/${DOMAIN_ID}/services/FacebookAutoBuffViewer/users/${USER_ID}/orders/${order_id}/sub-orders/${subOrder_id}/~resume`).then(response => {
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

export { getInfo, getReports, deactiveOrder, activeOrder, getSubInfo, pauseSubOrder, resumeSubOrder }