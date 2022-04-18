import { useSetRecoilState, useResetRecoilState } from 'recoil';

import { useFetchWrapper } from '_helpers';
import { bikesAtom, bikeAtom } from '_state';

export { useBikeActions };

function useBikeActions () {
    const baseUrl = `${process.env.REACT_APP_API_URL}/bikes`;
    const fetchWrapper = useFetchWrapper();
    const setBikes = useSetRecoilState(bikesAtom);
    const setBike = useSetRecoilState(bikeAtom);

    return {
        getVehicleStatus,
        getData,
        getAllbikes,
        getBikeById,
        resetBikes: useResetRecoilState(bikesAtom),
        resetBike: useResetRecoilState(bikeAtom),
    }

    function getVehicleStatus() {
        return fetchWrapper.get(`${baseUrl}/getVehicleStatus`).then(setBikes);
    }

    function getData() {
        return fetchWrapper.get(`${baseUrl}/getData`).then(setBikes);
    }
    function getAllbikes() {
        return fetchWrapper.get(`${baseUrl}/getAllbikes`).then(setBikes);
    }
    function getBikeById(id) {
        return fetchWrapper.get(`${baseUrl}/${id}`).then(setBike);
    }

}
