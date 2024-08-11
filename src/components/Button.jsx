import PropTypes from "prop-types";

export default function Button({ disabled, className, children, ...props }) {
	return (
		<button className={`px-5 py-2 text-white font-semibold rounded-md cursor-pointer ${disabled ? "cursor-not-allowed bg-disabled" : "bg-primary"} ${className}`} disabled={disabled} {...props}>
			{children}
		</button>
	);
}

Button.propTypes = {
	disabled: PropTypes.bool,
	children: PropTypes.node.isRequired,
};
