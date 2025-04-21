import JobForm from "@/components/JobForm/page";
import JobsDisplay from "@/components/JobsDisplay/page";

export default function Home() {
  return (
    <div className="flex justify-center align-top  flex-col sm:flex-row">
      <JobForm />
      <JobsDisplay />
    </div>
  );
}
