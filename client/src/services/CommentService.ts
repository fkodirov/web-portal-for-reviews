import api from "../http";
import { AxiosResponse } from "axios";
import { IComment } from "../models/IComment";
import { UpdateResponse } from "../models/response/UserResponse";
import { API_URL } from "../http";

export default class CommentService {
  static fetchComments(reviewId: number): Promise<AxiosResponse<IComment[]>> {
    return api.get<IComment[]>(`/comments/${reviewId}`);
  }

  static addComment(
    userId: number,
    reviewId: number,
    comment: string
  ): Promise<AxiosResponse<UpdateResponse>> {
    return api.post<UpdateResponse>(`/comments`, {
      userId,
      reviewId,
      comment,
    });
  }
  static deleteComment(
    reviewId: number,
    userId?: number
  ): Promise<AxiosResponse<UpdateResponse>> {
    return api.delete<UpdateResponse>(`/comments`, {
      data: {
        reviewId,
        userId,
      },
    });
  }
  static startListening(onCommentReceived: (comment: IComment) => void) {
    const eventSource = new EventSource(`${API_URL}/comments-sse`);

    eventSource.onmessage = (event) => {
      const eventData = JSON.parse(event.data);
      onCommentReceived(eventData);
    };

    return eventSource;
  }

  static stopListening(eventSource: EventSource) {
    eventSource.close();
  }
}
