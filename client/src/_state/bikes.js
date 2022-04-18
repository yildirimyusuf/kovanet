import { atom } from 'recoil';

const bikesAtom = atom({
    key: 'bikes',
    default: null
});

const bikeAtom = atom({
    key: 'bike',
    default: null
});

export { 
    bikesAtom,
    bikeAtom
};