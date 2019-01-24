import { Category } from './category';

export class Kudo {
    id?: string;
    author: string;
    receiver: string;
    category: Category;
    description?: string;
}
