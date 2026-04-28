export interface ContactSubmission {
    name: string;
    email: string;
    subject: string;
    message: string;
    recaptchaToken: string; // Token de verificação anti-spam
}
export interface Contact {
    id: number;
    name: string;
    email: string;
    subject: string;
    message: string;
    status: 'PENDING' | 'ANSWERED' | 'CLOSED';
    createdAt: string;
}
