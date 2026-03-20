export type InputFormType = {
    name         : string;
    type         : string;
    placeholder  : string;
    label        : string;
    value        : string;
    handleChange : (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export type TextareaFormType = {
    name         : string;
    placeholder  : string;
    label        : string;
    value        : string;
    handleChange : (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export type ErrorMessageFormType = {
    message: string;
}

export type SendObjectType = {
    name     : string;
    message  : string;
    reply_to : string;
}
