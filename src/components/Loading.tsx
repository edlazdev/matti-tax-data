import { ProgressSpinner } from "primereact/progressspinner";
import { useUtilStore } from "@/store";

const Loading = () => {
  const loading = useUtilStore((state) => state.loading);

  return (
    loading && (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <ProgressSpinner />
      </div>
    )
  );
};

export default Loading;
