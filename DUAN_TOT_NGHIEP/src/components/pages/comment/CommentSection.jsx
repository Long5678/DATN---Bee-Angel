// src/components/CommentSection.jsx
import { useContext, useEffect, useState } from 'react';
import Comment from './comment';
import CommentForm from './add_comment';
import '../../../publics/styles/comment.scss';
import { useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { getCommentByTourID } from '../../../redux/thunk/comment_thunk';
import MainTourRelated from './tour-related/mainTourRelated';

const CommentSection = () => {
  let dispatch = useDispatch()
  const [searchParams] = useSearchParams(); // lấy id từ url
  const tourId = searchParams.get("id");
  let commentsData = useSelector((state) => state.CommentSL?.commentDatas)

  useEffect(() => {
    dispatch(getCommentByTourID(tourId))
  }, [tourId])

  useEffect(() => {
    console.log("commentsData",commentsData);
    
  }, [commentsData])


  return <>
    <div className='d-flex-comment-tourRelated'>
      <div className="comment-section">
        <h2>Bình luận</h2>
        <hr />
        <CommentForm tourId={tourId} />
        {commentsData.map((comment, index) => (
          <Comment key={index} comment={comment} />
        ))}
      </div>

      <MainTourRelated />

    </div>
  </>
};

export default CommentSection;