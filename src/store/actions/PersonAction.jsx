import axios from 'axios';
import { loadperson } from '../reducers/PersonSlice';

export {removePerson} from '../reducers/PersonSlice';
export {loadPerson} from '../reducers/PersonSlice';

export const asyncLoadPersons = (id) => async(dispatch , getState) => {
try{
    const detail = await axios.get(`/Person/${id}`)
    const externalid = await axios.get(`/Person/${id}/external_ids`)
    const combinedCredits = await axios.get(`/Person/${id}/combined_credits`)
    const tvCredits = await axios.get(`/Person/${id}/tv_credits`)
    const movieCredits = await axios.get(`/Person/${id}/movie_credits`)
   
    
   let theultimateDetails = {
    detail : detail.data,
    externalid : externalid.data,
   combinedCredits :combinedCredits.data,
   movieCredits :movieCredits.data,
    tvCredits : tvCredits.data,
   }
   dispatch(loadperson(theultimateDetails))

}catch (err){
    console.log("error", err);
    
};


}