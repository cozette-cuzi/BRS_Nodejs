import debug from "debug";
import shortid from "shortid";
import mongooseService from "../../common/services/mongoose.service";
import { CreateGenreDto } from "../dto/create.genre.dto";
import { PatchGenreDto } from "../dto/patch.genre.dto";
import { PutGenreDto } from "../dto/put.genre.dto";

const log: debug.IDebugger = debug("app:genres-dao");

class GenresDao {
  Schema = mongooseService.getMongoose().Schema;

  genreSchema = new this.Schema(
    {
      _id: String,
      name: String,
      style: String,
    },
    { id: false }
  );

  Genre = mongooseService.getMongoose().model("Genres", this.genreSchema);

  constructor() {
    log("Created new instance of GenresDao");
  }

  async addGenre(genreFields: CreateGenreDto) {
    const genreId = shortid.generate();
    const genre = new this.Genre({
      _id: genreId,
      ...genreFields,
    });
    await genre.save();
    return genreId;
  }

  async getGenres(limit = 25, page = 0) {
    return this.Genre.find()
      .limit(limit)
      .skip(limit * page)
      .exec();
  }

  async updateGenreById(
    genreId: string,
    genreFields: PatchGenreDto | PutGenreDto
  ) {
    const existingGenre = await this.Genre.findOneAndUpdate(
      { _id: genreId },
      { $set: genreFields },
      { new: true }
    ).exec();

    return existingGenre;
  }

  async getGenreById(genreId: string) {
    return this.Genre.findOne({ _id: genreId }).populate("Genre").exec();
  }

  async removeGenreById(genreId: string) {
    return this.Genre.deleteOne({ _id: genreId }).exec();
  }
}

export default new GenresDao();
