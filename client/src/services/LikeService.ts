import api from "../http";
import { AxiosResponse } from "axios";
import { ILike } from "../models/Ilike";
import { UpdateResponse } from "../models/response/UserResponse";

export default class LikeService {
  static fetchLikes(userId: number): Promise<AxiosResponse<ILike[]>> {
    return api.get<ILike[]>(`/likes/${userId}`);
  }

  static addLike(
    userId: number,
    reviewId: number
  ): Promise<AxiosResponse<UpdateResponse>> {
    return api.post<UpdateResponse>(`/likes`, {
      userId,
      reviewId,
    });
  }

  static deleteLike(
    userId: number,
    reviewId: number
  ): Promise<AxiosResponse<UpdateResponse>> {
    return api.delete<UpdateResponse>(`/likes`, {
      data: {
        userId,
        reviewId,
      },
    });
  }

  static reviewLikes(ids: number[]): Promise<AxiosResponse<ILike[]>> {
    return api.post<ILike[]>(`/likes-review`, {
      ids,
    });
  }
}
