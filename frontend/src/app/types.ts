export interface CodeRequest{
    code: string;
}

export interface CodeResponse{
    result: string;
    success: boolean;
    attempts: string[];
    correct_code?: string;
    correct_position: boolean[];
    time: number;
}