import { PutBookDto } from './put.book.dto';

export interface PatchBookDto extends Partial<PutBookDto> {}
