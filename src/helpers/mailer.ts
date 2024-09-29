import nodemailer, { SentMessageInfo } from 'nodemailer';

interface EmailParams {
    email: string; 
    useremail: string;
    username: string; 
    message: string; 
}

export const sendEmail = async ({
    email,
    useremail,
    username,
    message,
}: EmailParams): Promise<SentMessageInfo> => { 

    try {
        const transport = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
        secure: true,
            auth: {
              user: "llimba53@gmail.com",
              pass: "eexx ziyr ruoi imnv"
            }
          });

        const mailOption = {
            from: useremail,
            to: email,
            subject: "New Response for Client",
            text: "Hello world?",
            html: `
                <p>Name:</p>
                ${username}
                <br>
                <p>Email:</p>
                ${useremail}
                <br>
                <p>Message:</p>
                ${message}
            `,
        };

        const mailResponse = await transport.sendMail(mailOption);
        
        return mailResponse; // Now correctly returns a SentMessageInfo type
    } catch (error: unknown) {
        if (error instanceof Error) {
            throw new Error(error.message);
        } else {
            throw new Error("An unknown error occurred");
        }
    }
};
