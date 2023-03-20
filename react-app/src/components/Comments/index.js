
import { useDispatch, useSelector } from "react-redux";

const Comments = () => {
  const singleComment = useSelector((state) => state.comments.oneComment);
  const sessionUser = useSelector((state) => state.session.user);

  return (
    <div className="comments-container">
      <h3> Comments </h3>
      <span>
        {singleComment.comment} by {sessionUser.name}
      </span>
    </div>
  );
};

export default Comments;
