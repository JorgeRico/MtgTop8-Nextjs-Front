export type InputFormType = {
    name        : string;
    type        : string;
    placeholder : string;
    label       : string;
    value       : string;
    toSend      : any;
    setToSend   : any;
}

export type TextareaFormType = {
    name        : string;
    placeholder : string;
    label       : string;
    value       : string;
    toSend      : any;
    setToSend   : any;
}

export type ErrorMessageFormType = {
    message: string;
}