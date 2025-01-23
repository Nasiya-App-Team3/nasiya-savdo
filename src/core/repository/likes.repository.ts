import { Repository } from 'typeorm';
import { Likes } from '../entity/index';

export type ImagesRepository = Repository<Likes>;
