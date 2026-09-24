import Feedback from './feedback.model.js';

// Give feedback
export const giveFeedbackService = async (guestId, data) => {
    const { rating, comment, bookingId } = data;
    if (!rating) throw { status: 400, message: 'Rating is required' };
    if (rating < 1 || rating > 5) throw { status: 400, message: 'Rating must be between 1 and 5' };
    return await Feedback.create({ guestId, rating, comment, bookingId });
};

// Get all feedback
export const getAllFeedbackService = async () => {
    return await Feedback.findAll({ order: [['createdAt', 'DESC']] });
};

// Get feedback by guest
export const getFeedbackByGuestService = async (guestId) => {
    return await Feedback.findAll({ where: { guestId } });
};
