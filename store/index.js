export const state = () => ({
  userName: 'siloahapiweb',
  password: '4qe3aI1!XSZA)Q^mR*wIChEE',
  token: '',
  orderNumber: '',
  apiData: {},
  recordId: '',
  // status 0 means success
  paymentStatus: null,
  paymentResult: {},
  busy: true
})

export const mutations = {
  SET_TOKEN(state, payload) {
    state.token = payload
  },
  SET_ORDERNUMBER(state, payload) {
    state.orderNumber = payload
  },
  SET_APIDATA(state, payload) {
    state.apiData = payload
  },
  SET_PAYMENTSTATUS(state, payload) {
    state.paymentStatus = payload
  },
  SET_PAYMENTRESULT(state, payload) {
    state.paymentResult = payload
  },
  SET_RECORDID(state, payload) {
    state.recordId = payload
  },
  SET_BUSY(state, payload) {
    state.busy = payload
  },
}

export const getters = {
  GET_USERNAME: (state) => state.userName,
  GET_PASSWORD: (state) => state.password,
  GET_TOKEN: (state) => state.token,
  GET_ORDERNUMBER: (state) => state.orderNumber,
  GET_APIDATA: (state) => state.apiData,
  GET_PAYMENTSTATUS: (state) => state.paymentStatus,
  GET_PAYMENTRESULT: (state) => state.paymentResult,
  GET_RECORDID: (state) => state.recordId,
  GET_BUSY: (state) => state.busy,
}
