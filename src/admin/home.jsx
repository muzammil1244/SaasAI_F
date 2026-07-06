import { Upload_document } from "./upload";
import { List } from "./list";
import { TodayAppointments } from "./today";

export const Admin_home = () => {
  return (
    <>
      {/* Mobile & Tablet Screen */}
      <div className="flex md:hidden w-screen h-screen items-center justify-center bg-gray-100 p-6">
        <div className="max-w-md text-center bg-white shadow-lg rounded-xl p-6">
          <h1 className="text-2xl font-bold text-red-600">
            Admin Panel
          </h1>

          <p className="mt-4 text-gray-700">
            This admin panel is available only on laptops or desktop computers.
          </p>

          <p className="mt-2 text-sm text-gray-500">
            Please open this page on a larger screen to continue.
          </p>
        </div>
      </div>

      {/* Laptop/Desktop Screen */}
      <div className="hidden md:grid w-screen h-screen grid-cols-3 bg-green">
        <div className="col-span-1 h-full">
          <Upload_document />
        </div>

        <div className="col-span-1 h-full overflow-hidden">
          <List />
        </div>

        <div className="col-span-1 h-full overflow-hidden">
          <TodayAppointments />
        </div>
      </div>
    </>
  );
};