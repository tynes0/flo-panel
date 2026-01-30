import { useState } from "react";
import Modal from "../ui/Modal";

export default function AddTaskModal({
                                         open,
                                         onClose,
                                         taskKey,
                                         taskName,
                                         onAdd,
                                     }) {
    const [amount, setAmount] = useState(1);

    function handleSubmit(e) {
        e.preventDefault();
        onAdd(taskKey, Number(amount));
        setAmount(1);
        onClose();
    }

    return (
        <Modal open={open} onClose={onClose} title={`${taskName} Ekle`}>
            <form onSubmit={handleSubmit}>

                <div className="number-input">
                    <button
                        type="button"
                        onClick={() => setAmount((a) => Math.max(1, a - 1))}
                    >
                        –
                    </button>

                    <input
                        type="number"
                        min="1"
                        value={amount}
                        onChange={(e) => setAmount(Number(e.target.value))}
                    />

                    <button
                        type="button"
                        onClick={() => setAmount((a) => a + 1)}
                    >
                        +
                    </button>
                </div>


                <div className="modal-actions">
                    <button
                        type="button"
                        className="cancel"
                        onClick={onClose}
                    >
                        İptal
                    </button>

                    <button type="submit">
                        Ekle
                    </button>
                </div>
            </form>
        </Modal>
    );
}
