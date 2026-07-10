import "../../styles/addTransactionModal.css";
import TransactionForm from "./TransactionForm";
function AddTransactionModal({

    isOpen,

    onClose,

    onSubmit,

    initialData,

}) {

    if (!isOpen) return null;

    return (

        <div className="modal-overlay">

            <div className="modal">

                <div className="modal-header">

                    <h2>    {initialData
                        ? "Edit Transaction"
                        : "Add Transaction"}</h2>

                    <button
                        onClick={onClose}
                    >
                        ✕
                    </button>

                </div>

                <TransactionForm

                    onSubmit={onSubmit}

                    initialData={initialData}

                />

            </div>

        </div>

    );

}

export default AddTransactionModal;