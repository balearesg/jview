import {MD5} from "./md5";

class Encryptions {
    generateToken(length?: number, onlyNumbers?: boolean) {
        let result: string = '';
        const characters: string = onlyNumbers ? '0123456789' : 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const charactersLength: number = characters.length;
        for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }

    md5(str) {
        return MD5(str);
    }
}

export /*bundle*/ const encryptions = new Encryptions();