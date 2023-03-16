const GET_COMMENTS = "comments/get_comments";
const GET_ONE_COMMENT = "comments/get_one_comment";

const getComments = (comment) => {
  return {
    type: GET_COMMENTS,
    payload: comment,
  };
};

const getOneComment = (comment) => {
  return {
    type: GET_ONE_COMMENT,
    payload: comment,
  };
};

export const get_all_comments = () => async (dispatch) => {
  const response = await fetch("/api/comments/");

  if (response.ok) {
    const data = await response.json();
    dispatch(getComments(data));
  }
};

export const get_one_comment = (id) => async (dispatch) => {
  const response = await fetch(`/api/comments/${id}`);

  if (response.ok) {
    const data = await response.json();
    dispatch(getOneComment(data));
  }
};

let initialState = {
  allComments: {},
  oneComment: {},
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
      return {
        ...state,
        oneComment: action.payload,
      };
    }
    default:
      return state;
  }
}