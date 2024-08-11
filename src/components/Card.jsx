export default function Card({ children, className }) {
	return <div className={`w-full bg-box rounded-2xl px-4 py-3 ${className}`}>{children}</div>;
}
