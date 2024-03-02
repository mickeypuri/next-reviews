import { ArrowPathIcon } from "@heroicons/react/24/outline";

export default function Loading() {
  return (
    <div className="flex justify-center py-6">
      <ArrowPathIcon className="animate-spin h-12 text-orange-700 w-12" />
    </div>
  );
}