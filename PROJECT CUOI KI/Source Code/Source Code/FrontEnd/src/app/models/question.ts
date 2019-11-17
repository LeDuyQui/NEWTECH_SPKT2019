import { Option } from './option';

export interface Question {
    id: number;
    question: string;
    isShuffle: string;
    subjectid: number;
    questiontypeid: number;
    options: Option;
}
