import { atom } from "recoil"

const tableState: any = atom({
    key: 'table',
    default: [],
});

export default tableState;