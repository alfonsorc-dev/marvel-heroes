import "./Loading.scss";
import { BarLoader } from "react-spinners";

export interface LoadingProps {
  message?: string;
}
export const Loading = ({ message }: LoadingProps) => {
  return (
    <div className="loading-page">
      <span>{message}</span>
      <BarLoader color="#ec1d24" width={150} />
    </div>
  );
};
