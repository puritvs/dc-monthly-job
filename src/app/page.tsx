import JobForm from "@/components/JobForm/page";
import JobsDisplay from "@/components/JobsDisplay/page";

export default function Home() {
  return (
    <div>
      <div className="flex flex-col sm:flex-row">
        <JobForm />
        <JobsDisplay />
      </div>
    </div>
  );
}
