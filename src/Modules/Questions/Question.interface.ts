export type TQuestion = {
   question: string;
   options: TOptions[];
   correctAnswer: string;
   level: string;
   createdAt?: Date;
   updatedAt?: Date;
   timeAllowed?: number;
}

export type TOptions = {
   serial: string,
   text: string;
   isCorrect: boolean;
}
