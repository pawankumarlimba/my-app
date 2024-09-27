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
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
                user: "23b4fb30ee79e4",
                pass: "9d44693caf4fa3"
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
