export const actionTypes = {
   UPDATE_LEAD_ACCEPTED:'UPDATE_LEAD_ACCEPTED',
   UPDATE_LEAD_CONTACTED:'UPDATE_LEAD_CONTACTED',
   UPDATE_LEAD_STATUS:'UPDATE_LEAD_STATUS',
   UPDATE_LEAD_PIPELINE:'UPDATE_LEAD_PIPELINE',
}

// user(id) accepting lead(id)
export const updateLeadAccepted = (leadid,userid) => {
    return dispatch => {
      let pa = new Promise(function (resolve,reject) {
        fetch(`${API_URL}/leads/accept/${leadid}`,{
          method:"POST",
          headers:{'Content-Type':'application/json'},
          body:JSON.stringify({
            userid
          })
        })
        .then(response => {
          return response.json()
        })
        .then(response => {
          if (response.status == 400) {
              resolve(response.status)
          } else if (response.status == 200) {
              dispatch({type: actionTypes.UPDATE_LEAD_ACCEPTED});
              resolve(response.status)
          }
        })
      })

      return pa

    }
}

// user(id) contacting lead(id)
export const updateLeadContacted = (leadid,userid) => {
    return dispatch => {
      let pa = new Promise(function (resolve,reject) {
        fetch(`${API_URL}/leads/contact/${leadid}`,{
          method:"POST",
          headers:{'Content-Type':'application/json'},
          body:JSON.stringify({
            userid
          })
        })
        .then(response => {
          return response.json()
        })
        .then(response => {
          if (response.status == 400) {
              resolve(response.status)
          } else if (response.status == 200) {
              dispatch({type: actionTypes.UPDATE_LEAD_CONTACTED});
              resolve(response.status)
          }
        })
      })

      return pa

    }
}

// user(id) change status lead(id)
export const updateLeadStatus = (leadid,userid,status) => {
    return dispatch => {
      let pa = new Promise(function (resolve,reject) {
        fetch(`${API_URL}/leads/status/${leadid}`,{
          method:"POST",
          headers:{'Content-Type':'application/json'},
          body:JSON.stringify({
            userid,
            status
          })
        })
        .then(response => {
          return response.json()
        })
        .then(response => {
          if (response.status == 400) {
              resolve(response.status)
          } else if (response.status == 200) {
              dispatch({type: actionTypes.UPDATE_LEAD_STATUS});
              resolve(response.status)
          }
        })
      })

      return pa

    }
}

// user(id) change pipeline lead(id)
export const updateLeadPipeline = (leadid,userid,pipeline) => {
    return dispatch => {
      let pa = new Promise(function (resolve,reject) {
        fetch(`${API_URL}/leads/pipeline/${leadid}`,{
          method:"POST",
          headers:{'Content-Type':'application/json'},
          body:JSON.stringify({
            userid,
            pipeline
          })
        })
        .then(response => {
          return response.json()
        })
        .then(response => {
          if (response.status == 400) {
              resolve(response.status)
          } else if (response.status == 200) {
              dispatch({type: actionTypes.UPDATE_LEAD_PIPELINE});
              resolve(response.status)
          }
        })
      })

      return pa

    }
}