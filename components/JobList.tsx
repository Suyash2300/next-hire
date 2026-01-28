import JobCard from "./JobCard";
import { Job } from "../types";

interface JobListProps {
  jobs: Job[];
}

export default function JobList({ jobs }: JobListProps) {
  if (jobs.length === 0) {
    return (
      <p className="text-gray-600 text-center">
        No jobs available at the moment.
      </p>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {jobs.map((job) => (
        <JobCard key={job.id} job={job} />
      ))}
    </div>
  );
}
