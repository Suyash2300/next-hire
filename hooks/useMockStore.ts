import { useState, useEffect } from "react";
import { Job } from "../types";

export interface User {
    id: string;
    name: string;
    email: string;
    role: "admin" | "user";
    avatar?: string;
}

const INITIAL_JOBS: Job[] = [
    {
        id: "1",
        title: "Senior Frontend Engineer",
        company: "TechFlow",
        location: "Remote",
        description: "We are looking for a React expert to lead our frontend team.",
        createdAt: new Date("2025-01-20").toISOString(),
    },
    {
        id: "2",
        title: "Product Designer",
        company: "Creative Studio",
        location: "New York, NY",
        description: "Design beautiful and functional user interfaces.",
        createdAt: new Date("2025-01-22").toISOString(),
    },
    {
        id: "3",
        title: "Backend Developer",
        company: "DataSystems",
        location: "Austin, TX",
        description: "Experience with Node.js and PostgreSQL required.",
        createdAt: new Date("2025-01-25").toISOString(),
    },
];

const INITIAL_USERS: User[] = [
    {
        id: "u1",
        name: "Alex Johnson",
        email: "alex@example.com",
        role: "admin",
        avatar: "https://i.pravatar.cc/150?u=u1",
    },
    {
        id: "u2",
        name: "Sarah Smith",
        email: "sarah@example.com",
        role: "user",
        avatar: "https://i.pravatar.cc/150?u=u2",
    },
    {
        id: "u3",
        name: "Michael Brown",
        email: "michael@example.com",
        role: "user",
        avatar: "https://i.pravatar.cc/150?u=u3",
    },
];

export function useMockStore() {
    const [jobs, setJobs] = useState<Job[]>([]);
    const [users, setUsers] = useState<User[]>([]);
    const [isLoaded, setIsLoaded] = useState(false);

    // Load from LocalStorage on mount
    useEffect(() => {
        const storedJobs = localStorage.getItem("nexthire_jobs");
        const storedUsers = localStorage.getItem("nexthire_users");

        if (storedJobs) {
            setJobs(JSON.parse(storedJobs));
        } else {
            setJobs(INITIAL_JOBS);
            localStorage.setItem("nexthire_jobs", JSON.stringify(INITIAL_JOBS));
        }

        if (storedUsers) {
            setUsers(JSON.parse(storedUsers));
        } else {
            setUsers(INITIAL_USERS);
            localStorage.setItem("nexthire_users", JSON.stringify(INITIAL_USERS));
        }

        setIsLoaded(true);
    }, []);

    // Helpers to update state and localStorage
    const addJob = (job: Job) => {
        const newJobs = [job, ...jobs];
        setJobs(newJobs);
        localStorage.setItem("nexthire_jobs", JSON.stringify(newJobs));
    };

    const deleteJob = (id: string) => {
        const newJobs = jobs.filter((j) => j.id !== id);
        setJobs(newJobs);
        localStorage.setItem("nexthire_jobs", JSON.stringify(newJobs));
    };

    const addUser = (user: User) => {
        const newUsers = [user, ...users];
        setUsers(newUsers);
        localStorage.setItem("nexthire_users", JSON.stringify(newUsers));
    };

    const deleteUser = (id: string) => {
        const newUsers = users.filter((u) => u.id !== id);
        setUsers(newUsers);
        localStorage.setItem("nexthire_users", JSON.stringify(newUsers));
    };

    return {
        jobs,
        users,
        isLoaded,
        addJob,
        deleteJob,
        addUser,
        deleteUser,
    };
}
