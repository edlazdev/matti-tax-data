import TaxDataForm from "@components/TaxDataForm";
import TaxDataList from "@components/TaxDataList";
import { useTaxDataStore } from "@store/useTaxData";

interface AppProps {
  color: string;
  title: string;
  data: any;
}

const App: React.FC<AppProps> = ({ color, title, data }) => {
  const { isAddOrEdit } = useTaxDataStore();

  return (
    <div className="flex justify-content-center align-items-center min-h-screen">
      <div className="grid w-full">
        <div className="col-12 md:col-8 lg:col-8 sm:col-4 xs:col-4 mx-auto">
          {!isAddOrEdit ? <TaxDataList /> : <TaxDataForm />}
          {color && <p>{color}</p>}
          {title && <p>{title}</p>}
          {data && <p>{data}</p>}
        </div>
      </div>
    </div>
  );
};

export default App;
