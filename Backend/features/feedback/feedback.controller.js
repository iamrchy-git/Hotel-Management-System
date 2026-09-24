import * as feedbackService from './feedback.service.js';

// POST /api/feedback  - Give Feedback
export const giveFeedback = async (req, res) => {
    try {
        const feedback = await feedbackService.giveFeedbackService(req.user.id, req.body);
        return res.status(201).json({ success: true, message: 'Feedback submitted', data: { feedback } });
    } catch (error) {
        return res.status(error.status || 500).json({ success: false, message: error.message });
    }
};

// GET /api/feedback
export const getAllFeedback = async (req, res) => {
    try {
        const feedback = await feedbackService.getAllFeedbackService();
        return res.status(200).json({ success: true, data: { feedback } });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

// GET /api/feedback/my-feedback
export const getMyFeedback = async (req, res) => {
    try {
        const feedback = await feedbackService.getFeedbackByGuestService(req.user.id);
        return res.status(200).json({ success: true, data: { feedback } });
    } catch (error) {
        return res.status(error.status || 500).json({ success: false, message: error.message });
    }
};
