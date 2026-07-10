import "../../styles/deleteModal.css";

function DeleteModal({

    isOpen,

    onClose,

    onConfirm,

}) {

    if (!isOpen) return null;

    return (

        <div className="modal-overlay">

            <div className="modal">

                <h2>Delete Transaction</h2>

                <p>

                    Are you sure you want to delete this transaction?

                </p>

                <div className="delete-actions">

                    <button
                        className="cancel-btn"
                        onClick={onClose}
                    >
                        Cancel
                    </button>

                    <button
                        className="confirm-btn"
                        onClick={onConfirm}
                    >
                        Delete
                    </button>

                </div>

            </div>

        </div>

    );

}

export default DeleteModal;