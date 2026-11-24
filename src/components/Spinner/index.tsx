import './module.css';

interface SpinnerProps {
  label: string;
}

export default function Spinner({label}: SpinnerProps) {
  return (
    <div className="common-spinner" role="status" aria-live="polite">
      <svg
        className="common-spinner-icon animate-spin"
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M12 4V1L8 5l4 4V6c3.31 0 6 2.69 6 6 0 1.01-.25 1.97-.7 2.8l1.46 1.46C19.54 15.03 20 13.57 20 12c0-4.42-3.58-8-8-8zm0 14c-3.31 0-6-2.69-6-6 0-1.01.25-1.97.7-2.8L5.24 7.74C4.46 8.97 4 10.43 4 12c0 4.42 3.58 8 8 8v3l4-4-4-4v3z" />
      </svg>
      <span>{label}</span>
    </div>
  );
}
