import "./Button.css";

function Button({
    children,
    variant = "primary",
    type = "button",
    disabled = false,
    onClick
}) {
    return (
        <button
            type={type}
            className={`reusable-button reusable-button--${variant}`}
            disabled={disabled}
            onClick={onClick}
        >
            {children}
        </button>
    );
}

export default Button;