import axios from 'axios'
import { isEmpty } from 'lodash'

/**
 * @param { string } endpoint API endpoint url for get data
 * @param { object } listParams params for get data
 * @returns 
 * async function for get list data
 */
export const creatorListService = async(endpoint, listParams) => {
  if (!isEmpty(listParams) && typeof listParams === 'object') {
    return await axios({
      method: 'GET',
      url: endpoint,
      params: {
        ...listParams
      }
    })
  }

  return await axios({
    method: 'GET',
    url: endpoint,
  })
}


/**
 * @param { string } endpoint API endpoint url for get data
 * @param { string } id unique id for get data base on id
 * @returns 
 * async function for get detail data
 */
export const creatorDetailService = async(endpoint, userID) => {
  const endpointWithID = `${endpoint}/${userID}`
  
  return await axios({
    method: 'GET',
    url: endpointWithID,
  })
}