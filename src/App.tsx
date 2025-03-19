import TaxDataForm from "@components/TaxDataForm";
import TaxDataList from "@components/TaxDataList";
import { useTaxDataStore } from "@store/useTaxData";

function App() {
  const { isAddOrEdit } = useTaxDataStore();

  return (
    <div className="flex justify-content-center align-items-center min-h-screen">
      <div className="grid w-full">
        <div className="col-12 md:col-8 lg:col-8 sm:col-4 xs:col-4 mx-auto">
          {!isAddOrEdit ? <TaxDataList /> : <TaxDataForm />}
        </div>
      </div>
    </div>
  );
}

export default App;
