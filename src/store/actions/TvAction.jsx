import axios from 'axios';
import { loadtv } from '../reducers/tvSlice';
export { removeTv } from '../reducers/tvSlice';

// Async thunk for loading TV details
export const asyncLoadTvs = (id) => async (dispatch, getState) => {
  try {
    // 1️⃣ Fetch all required endpoints in parallel (optional optimization)
    const [detail, externalId, recommendations, similar, translations, videos, watchProviders] = await Promise.all([
      axios.get(`/Tv/${id}`),
      axios.get(`/Tv/${id}/external_ids`),
      axios.get(`/Tv/${id}/recommendations`),
      axios.get(`/Tv/${id}/similar`),
      axios.get(`/Tv/${id}/translations`),
      axios.get(`/Tv/${id}/videos`),
      axios.get(`/Tv/${id}/Watch`)
    ]);

    // 2️⃣ Prepare the final object
    const theUltimateDetails = {
      detail: detail.data,
      externalId: externalId.data,
      recommendations: recommendations.data.results || [],
      similar: similar.data.results || [],
      translations: translations.data.translations?.map(t => t.english_name) || [],
      videos: videos.data,
      watchProviders: watchProviders.data.results?.IN || {}
    };

    // 3️⃣ Dispatch to Redux
    dispatch(loadTv(theUltimateDetails));

  } catch (err) {
    console.error("Error loading TV details:", err);
  }
};
