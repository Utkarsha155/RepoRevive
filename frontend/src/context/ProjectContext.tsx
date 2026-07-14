"use client";

import { createContext, useContext } from "react";
import api from "@/services/api";

type ProjectContextType = {
  createProject: (data: any) => Promise<any>;
  getAllProjects: () => Promise<any>;
  getMyProjects: () => Promise<any>;
  getProject: (id: string) => Promise<any>;
  updateProject: (id: string, data: any) => Promise<any>;
  deleteProject: (id: string) => Promise<any>;
};

const ProjectContext = createContext<ProjectContextType | null>(null);

export const ProjectProvider = ({ children }: { children: React.ReactNode }) => {

  const createProject = async (data: any) => {
    const res = await api.post("/project/create", data);
    return res.data;
  };

  const getAllProjects = async () => {
    const res = await api.get("/project/all");
    return res.data;
  };

  const getMyProjects = async () => {
    const res = await api.get("/project/my");
    return res.data;
  };

  const getProject = async (id: string) => {
    const res = await api.get(`/project/${id}`);
    return res.data;
  };

  const updateProject = async (id: string, data: any) => {
    const res = await api.put(`/project/update/${id}`, data);
    return res.data;
  };

  const deleteProject = async (id: string) => {
    const res = await api.delete(`/project/delete/${id}`);
    return res.data;
  };

  return (
    <ProjectContext.Provider value={{ createProject, getAllProjects, getMyProjects, getProject, updateProject, deleteProject }}>
      {children}
    </ProjectContext.Provider>
  );
};

export const useProject = () => {
  const context = useContext(ProjectContext);
  if (!context) throw new Error("useProject must be used inside ProjectProvider");
  return context;
};