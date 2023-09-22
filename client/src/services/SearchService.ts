import api from "../http";
import { AxiosResponse } from "axios";
import { IReview } from "../models/IReview";

export default class SearchService {
  static fetchReviews(searchQuery: string): Promise<AxiosResponse<IReview[]>> {
    return api.post<IReview[]>("/search", { searchQuery });
  }
}
