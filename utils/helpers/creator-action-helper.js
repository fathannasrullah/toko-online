/**
 * @param  { function }  thunkAPI, function from thunk api, that able to reject, or fullfilled
 * @param  { object }  listOrDetailParams, params object for hitting endpoint
 * @param  { function }  serviceFunc, function hitting endpoint, from service
 * @param  { string }  globalStateName, name global state, require for store response data into global state
 * @returns 
 * async function for list or detail data with create async thunk, with handling data and catch error
 */
export const creatorListOrDetailAction = async (
  thunkAPI,
  listOrDetailParams,
  serviceFunc,
  globalStateName,
) => {
  try {
    const response = await serviceFunc(listOrDetailParams)

    if (!response) throw({ response })

    const { data: responseData } = response

    if (!responseData) throw({ response })

    return { 
      [globalStateName]: responseData
    }
  } catch (error) {
    const { response } = error

    if (!response) {
      return thunkAPI.rejectWithValue(response)
    }

    const { data } = response

    return thunkAPI.rejectWithValue(data)           
  }
}

/**
 * @param  { function }  thunkAPI, function from thunk api, that able to reject, or fullfilled
 * @param  { object }  detailParams, params object for hitting endpoint
 * @param  { function }  serviceFunc, function hitting endpoint, from service
 * @param  { string }  globalStateName, name global state, require for store response data into global state
 * @returns 
 * async function for detail data with create async thunk, with handling data and catch error
 */
export const creatorDetailAction = async (
  thunkAPI,
  detailParams,
  serviceFunc,
  globalStateName,
) => {
  try {
    const response = await serviceFunc(detailParams)

    if (!response) throw({ response })

    const { data: responseData } = response

    if (!responseData) throw({ response })

    return {
      [globalStateName]: responseData
    }
  } catch (error) {
    const { response } = error

    if (!response) {
      return thunkAPI.rejectWithValue(response)
    }

    const { data } = response
  
    return thunkAPI.rejectWithValue(data)
  }
}