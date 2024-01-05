import React from 'react';

const DeleteConfirmation = ({ onCancel, onConfirm }) => {
    return (
        <div className="delete-confirmation">
            <p>Are you sure you want to delete your account?</p>
            <button className="cancel-delete-button" onClick={onCancel}>Cancel</button>
            <button className="confirm-delete-button" onClick={onConfirm}>Delete</button>
        </div>
    );
};

export default DeleteConfirmation;
