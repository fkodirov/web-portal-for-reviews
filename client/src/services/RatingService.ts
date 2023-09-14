import api from "../http";
import { AxiosResponse } from "axios";
import { IRating } from "../models/IRating";
import { UpdateResponse } from "../models/response/UserResponse";

export default class RatingService {
  static fetchRatings(userId: number): Promise<AxiosResponse<IRating[]>> {
    return api.get<IRating[]>(`/ratings/${userId}`);
  }

  static addRating(
    userId: number,
    reviewId: number,
    rating: number
  ): Promise<AxiosResponse<UpdateResponse>> {
    return api.post<UpdateResponse>(`/ratings`, {
      userId,
      reviewId,
      rating,
    });
  }
  static updateRating(
    userId: number,
    reviewId: number,
    rating: number
  ): Promise<AxiosResponse<UpdateResponse>> {
    return api.put<UpdateResponse>(`/ratings`, {
      userId,
      reviewId,
      rating,
    });
  }
  static deleteRating(
    reviewId: number,
    userId?: number
  ): Promise<AxiosResponse<UpdateResponse>> {
    return api.delete<UpdateResponse>(`/ratings`, {
      data: {
        reviewId,
        userId,
      },
    });
  }
}
