import SpinnerIcon from '@/components/Icons/Spinner';
import './module.css';

interface SpinnerProps {
  label: string;
}

export default function Spinner({label}: SpinnerProps) {
  return (
    <div className="common-spinner" role="status" aria-live="polite">
      <SpinnerIcon />
      <span>{label}</span>
    </div>
  );
}
