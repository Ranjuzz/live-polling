import React from 'react';
import { Badge } from '../CommonStyles';
import {LoaderWrapper, Spinner, Message} from './LoaderStyles'

const Loader = () => {
  return (
    <LoaderWrapper>
      <Badge>✨ Intervue Poll</Badge>
      <Spinner />
      <Message>Wait for the teacher to ask questions..</Message>
    </LoaderWrapper>
  );
};

export default Loader;
