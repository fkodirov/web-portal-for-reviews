import { useState, useContext, useEffect } from "react";
import { observer } from "mobx-react-lite";
import CommentService from "../services/CommentService";
import { Context } from "../main";
import Avatar from "@mui/material/Avatar";
import { IComment } from "../models/IComment";
import UserService from "../services/UserService";
import { IUser } from "../models/IUser";

const Comments: React.FC<{ reviewId: number }> = ({ reviewId }) => {
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState<IComment[]>([]);
  const [usersName, setUsersName] = useState<IUser[]>([]);
  const { store } = useContext(Context);
  console.log(usersName);
  useEffect(() => {
    const source = CommentService.startListening((eventData) => {
      setComments((prevComments) => [...prevComments, eventData]);
    });

    return () => {
      CommentService.stopListening(source);
    };
  }, []);

  useEffect(() => {
    if (reviewId) getComments();
  }, [reviewId]);

  useEffect(() => {
    if (
      comments.length != 0 &&
      !comments.every((comment) =>
        usersName.some((user) => user.id === comment.userId)
      )
    )
      getUsersName();
  }, [comments]);

  const getComments = async () => {
    try {
      const response = await CommentService.fetchComments(reviewId);
      setComments(response.data);
    } catch (e) {
      console.log(e);
    }
  };
  const getUsersName = async () => {
    try {
      const ids = comments.map((comment) => comment.userId);
      const response = await UserService.fetchUsersName(ids);
      setUsersName(response.data);
    } catch (e) {
      console.log(e);
    }
  };

  const handleSubmit = async () => {
    try {
      await CommentService.addComment(store.user.id, reviewId, comment);
      setComment("");
    } catch (e) {
      console.log(e);
    }
  };
  function stringToColor(string: string) {
    let hash = 0;
    let i;

    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = "#";

    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }

    return color;
  }

  function stringAvatar(name: string) {
    return {
      sx: {
        bgcolor: stringToColor(name),
      },
      children: `${name.split(" ")[0][0]}`,
    };
  }
  function formatDate(dateString: string): string {
    const inputDate = new Date(dateString);
    const currentDate = new Date();

    const todayStart = new Date(currentDate);
    todayStart.setHours(0, 0, 0, 0);

    const yesterdayStart = new Date(todayStart);
    yesterdayStart.setDate(todayStart.getDate() - 1);

    if (inputDate >= todayStart) {
      return "Сегодня";
    } else if (inputDate >= yesterdayStart) {
      return "Вчера";
    } else {
      const diffInDays = Math.floor(
        (currentDate.getTime() - inputDate.getTime()) / (24 * 60 * 60 * 1000)
      );
      return `${diffInDays} дней назад`;
    }
  }

  return (
    <>
      <div className="container-fluid">
        <div className="mb-3">
          <label htmlFor="comment-field" className="form-label fs-5">
            Add a comment
          </label>
          <textarea
            className="form-control"
            id="comment-field"
            rows={4}
            placeholder="Comment..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          ></textarea>
          <div className="text-end mt-3">
            <button className="btn btn-primary" onClick={() => handleSubmit()}>
              Добавить{" "}
            </button>
          </div>
        </div>
        <div className="mb-3">
          <h4 className="fs-5 my-3">Comments</h4>
          {comments.map((e, index) => (
            <div key={index} className="d-flex gap-3">
              <Avatar
                className="mt-1"
                {...stringAvatar(
                  usersName
                    .find((user) => user.id === e.userId)
                    ?.name?.toUpperCase()
                    .toString() || ""
                )}
              />
              <div>
                <div className="d-flex gap-3">
                  <p className="mb-0">
                    <b>{e.userId}</b>
                  </p>
                  <p className="mb-0">
                    <small className="text-muted">{formatDate(e.date)}</small>
                  </p>
                </div>
                <p>{e.comment}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default observer(Comments);
