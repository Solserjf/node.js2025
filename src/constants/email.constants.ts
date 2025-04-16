import { EmailEnum } from "../enums/email.enum";

type IEmailData = {
    subject: string;
    template: string;
};

type IEmailConstants<T extends Record<string, string>> = {
    [K in keyof T]: IEmailData;
};

export const emailConstants: IEmailConstants<typeof EmailEnum> = {
    [EmailEnum.WELCOME]: {
        subject: "WELCOME",
        template: "welcome",
    },
    [EmailEnum.ACTIVATE]: {
        subject: "ACTIVATE",
        template: "activate",
    },
    [EmailEnum.RECOVERY]: {
        subject: "RECOVERY",
        template: "recovery",
    },
};

export { IEmailConstants, IEmailData };
