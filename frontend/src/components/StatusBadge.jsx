import "./StatusBadge.css";

function StatusBadge({
    children,
    status = "default"
}) {
    return (
        <span
            className={`status-badge status-badge--${status}`}
        >
            <span className="status-badge__dot" />

            {children}
        </span>
    );
}

export default StatusBadge;