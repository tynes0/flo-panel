export default function DeleteUserModal({ open, user, onClose, onConfirm }) {
    if (!open || !user) return null;

    return (
        <div className="overlay">
            <div className="modal danger">
                <h3>Kullanıcıyı Sil</h3>

                <p style={{ textAlign: "center" }}>
                    <strong>{user.name}</strong> adlı kullanıcıyı silmek
                    istediğine emin misin?
                </p>

                <div className="modal-actions">
                    <button
                        className="cancel"
                        onClick={onClose}
                    >
                        İptal
                    </button>

                    <button
                        className="danger-btn"
                        onClick={() => onConfirm(user._id)}
                    >
                        Sil
                    </button>
                </div>
            </div>
        </div>
    );
}
