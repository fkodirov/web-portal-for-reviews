import api from "../http";
import { AxiosResponse } from "axios";
import { IReview } from "../models/IReview";
import { UpdateResponse } from "../models/response/UserResponse";

export default class UserService {
  static fetchReviews(): Promise<AxiosResponse<IReview[]>> {
    return api.get<IReview[]>("/reviews");
  }
  static fetchReview(id: number): Promise<AxiosResponse<IReview>> {
    return api.get<IReview>(`/reviews/${id}`);
  }
  static addReview(
    title: string,
    nameofart: string,
    category: string,
    tags: string,
    text: string,
    img: string | null,
    rating: number,
    userId: number
  ): Promise<AxiosResponse<UpdateResponse>> {
    return api.post<UpdateResponse>(`/review`, {
      title,
      nameofart,
      category,
      tags,
      text,
      img,
      rating,
      userId,
    });
  }
  static updateReview(
    id: number,
    title: string,
    nameofart: string,
    category: string,
    tags: string,
    text: string,
    img: string,
    rating: number
  ): Promise<AxiosResponse<UpdateResponse>> {
    return api.put<UpdateResponse>(`/reviews/${id}`, {
      title,
      nameofart,
      category,
      tags,
      text,
      img,
      rating,
    });
  }
  static deleteImage(id: number): Promise<AxiosResponse<UpdateResponse>> {
    return api.put<UpdateResponse>(`/image/${id}`);
  }
  static deleteReview(id: number): Promise<AxiosResponse<UpdateResponse>> {
    return api.delete<UpdateResponse>(`/review/${id}`);
  }
}
