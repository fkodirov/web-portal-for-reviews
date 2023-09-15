import api from "../http";
import { AxiosResponse } from "axios";
import { IReview } from "../models/IReview";
import { UpdateResponse } from "../models/response/UserResponse";

export default class UserService {
  static fetchReviews(
    column: string,
    sort: string
  ): Promise<AxiosResponse<IReview[]>> {
    return api.post<IReview[]>("/reviews", { column, sort });
  }
  static fetchReview(id: number): Promise<AxiosResponse<IReview>> {
    return api.get<IReview>(`/reviews/${id}`);
  }
  static fetchUserReviews(userId: number): Promise<AxiosResponse<IReview[]>> {
    return api.get<IReview[]>(`/user-reviews/${userId}`);
  }
  static addReview(
    title: string,
    nameofart: string,
    category: string,
    tags: string,
    text: string,
    img: string | null,
    authorRating: number,
    rating: number,
    votes: number,
    status: "published" | "draft",
    userId: number
  ): Promise<AxiosResponse<UpdateResponse>> {
    return api.post<UpdateResponse>(`/review`, {
      title,
      nameofart,
      category,
      tags,
      text,
      img,
      authorRating,
      rating,
      votes,
      status,
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
    authorRating: number,
    status: "published" | "draft"
  ): Promise<AxiosResponse<UpdateResponse>> {
    return api.put<UpdateResponse>(`/reviews/${id}`, {
      title,
      nameofart,
      category,
      tags,
      text,
      img,
      authorRating,
      status,
    });
  }
  static updateRating(
    id: number,
    rating: string,
    votes: number
  ): Promise<AxiosResponse<UpdateResponse>> {
    return api.put<UpdateResponse>(`/reviews-rating/${id}`, {
      rating,
      votes,
    });
  }
  static deleteImage(id: number): Promise<AxiosResponse<UpdateResponse>> {
    return api.put<UpdateResponse>(`/image/${id}`);
  }
  static deleteReview(id: number): Promise<AxiosResponse<UpdateResponse>> {
    return api.delete<UpdateResponse>(`/reviews/${id}`);
  }
}
