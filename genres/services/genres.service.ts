import { CRUD } from "../../common/interfaces/crud.interface";
import genresDao from "../daos/genres.dao";
import { CreateGenreDto } from "../dto/create.genre.dto";
import { PatchGenreDto } from "../dto/patch.genre.dto";
import { PutGenreDto } from "../dto/put.genre.dto";

class GenresService implements CRUD {
  async list(limit: number, page: number) {
    return genresDao.getGenres(limit, page);
  }

  async create(resource: CreateGenreDto) {
    return genresDao.addGenre(resource);
  }

  async putById(id: string, resource: PutGenreDto) {
    return genresDao.updateGenreById(id, resource);
  }

  async readById(id: string) {
    return genresDao.getGenreById(id);
  }

  async deleteById(id: string) {
    return genresDao.removeGenreById(id);
  }

  async patchById(id: string, resource: PatchGenreDto): Promise<any> {
    return genresDao.updateGenreById(id, resource);
  }
}

export default new GenresService();
