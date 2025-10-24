import { useState, type ReactNode } from "react";
import { ClipLoader } from "react-spinners";
import "./WithSpinner.scss";

interface CardWithSpinnerProps {
  renderContent: (isLoading: boolean, onLoad: () => void) => ReactNode;
  spinnerColor?: string;
}

export const CardWithSpinner = ({
  renderContent,
  spinnerColor = "#ec1d24",
}: CardWithSpinnerProps) => {
  const [loading, setLoading] = useState(true);

  return (
    <div className="with-spinner">
      {loading && (
        <div className="with-spinner__overlay">
          <ClipLoader color={spinnerColor} />
        </div>
      )}
      {renderContent(loading, () => setLoading(false))}
    </div>
  );
};
