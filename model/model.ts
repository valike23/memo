export interface Iuser {
    name: string;
    password: string;
    _id?: any;
    matNo: string;
}

export interface Ilogin {
    matNo: string;
    password: string;
}
export interface Imemo {
    _id?: string;
    subject: string;
    content: string;
    sender_matNo: string;
    createdAt?: Date | string;
    respondent?: string;
    respondent_level?: string;
    response?: string;
    status?: string;

}