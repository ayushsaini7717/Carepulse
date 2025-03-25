import { atom } from "recoil";

const emailAtom = atom({
    key: 'emailAtom', 
    default: '', 
});

export default emailAtom;