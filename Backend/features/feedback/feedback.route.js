import express from 'express';
import { giveFeedback, getAllFeedback, getMyFeedback } from './feedback.controller.js';
import { authenticate, restrictTo } from '../../middleware/auth.middleware.js';

const feedbackRouter = express.Router();

feedbackRouter.use(authenticate);

feedbackRouter.post('/', restrictTo('guest'), giveFeedback);
feedbackRouter.get('/my-feedback', restrictTo('guest'), getMyFeedback);
feedbackRouter.get('/', restrictTo('admin', 'manager'), getAllFeedback);

export default feedbackRouter;
