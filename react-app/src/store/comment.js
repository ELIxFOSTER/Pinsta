
const GET_COMMENTS = "comments/get_comments";
const GET_ONE_COMMENT = "comments/get_one_comment";
const CREATE_COMMENT = "comments/create_one";
const DELETE_COMMENT = "comments/delet";

const getComments = (comment) => {
  return {
    type: GET_COMMENTS,
    payload: comment,
  };
};

const getPcomments = (comments) => {
  return {
    type: GET_ONE_COMMENT,
    payload: comments,
  };
};

const createComment = (obj) => {
  return {
    type: CREATE_COMMENT,
    payload: obj,
  };
};

const deleteSingleComment = (id) => {
  return {
    type: DELETE_COMMENT,
    payload: id,
  };
};

export const get_all_comments = () => async (dispatch) => {
  const response = await fetch("/api/comments/");

  if (response.ok) {
    const data = await response.json();
    dispatch(getComments(data));
  }
};

export const getPinComments = (id) => async (dispatch) => {
  const response = await fetch(`/api/comments/${id}`);

  if (response.ok) {
    const data = await response.json();
    dispatch(getPcomments(data));
    return data;
  }
};

export const createNewComment = (commentData) => async (dispatch) => {
  const response = await fetch("/api/comments/new", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(commentData),
  });
  if (response.ok) {
    const newComment = await response.json();
    dispatch(createComment(newComment));
  } else {
    const errorData = await response.json();
    console.log("error in this response", errorData.errors);
    return errorData;
  }
};

export const deleteComment = (commentId) => async (dispatch) => {
  const response = await fetch(`/api/comments/${commentId}`, {
    method: "DELETE",
  });

  if (response.ok) {
    dispatch(deleteSingleComment(commentId));
  }
};

let initialState = {
  allComments: {},
  pinComments: {},
};

export default function commentReducer(state = initialState, action) {
  switch (action.type) {
    case GET_COMMENTS: {
      return {
        ...state,
        allComments: action.payload,
      };
    }
    case GET_ONE_COMMENT: {
      const newState = { ...state, pinComments: {} };
      action.payload.forEach((ele) => (newState.pinComments[ele.id] = ele));
      return newState;
    }
    case CREATE_COMMENT: {
      const newState = { ...state, pinComments: { ...state.pinComments } };
      newState.pinComments[action.payload.id] = action.payload;
      return newState;
    }
    case DELETE_COMMENT: {
      const newState = { ...state, pinComments: { ...state.pinComments } };
      delete newState.pinComments[action.payload];
      return newState;
    }
    default:
      return state;
  }
}
