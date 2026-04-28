export interface Booking {
    id: number;
    roomId: number;
    roomName: string;
    startTime: string;
    endTime: string;
    userName: string;
    userEmail: string;
    userInstitution: string;
    purpose: string;
    status: 'PENDING' | 'APPROVED' | 'REJECTED';
}
