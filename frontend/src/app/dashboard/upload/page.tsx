"use client";

import { useState } from "react";
import { useProject } from "@/context/ProjectContext";

export default function UploadProjectPage() {

  const { createProject } = useProject();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    techStack: "",
    githubLink: "",
    liveLink: "",
    image: "",
    readme: "",
    projectType: "Ownership Transfer",
    compensationType: "Free",
    price: 0,
    negotiable: true,
    difficulty: "Intermediate",
    lookingFor: "",
    tags: ""
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {

    const { name, value, type } = e.target;

    setFormData({
      ...formData,
      [name]: type === "checkbox"
        ? (e.target as HTMLInputElement).checked
        : value
    });

  };

  const handleSubmit = async (e: React.FormEvent) => {

    e.preventDefault();

    const data = {
      ...formData,
      techStack: formData.techStack.split(",").map(item => item.trim()),
      tags: formData.tags.split(",").map(item => item.trim())
    };

    try {

      const res = await createProject(data);

      alert(res.message);

      setFormData({
        title: "",
        description: "",
        category: "",
        techStack: "",
        githubLink: "",
        liveLink: "",
        image: "",
        readme: "",
        projectType: "Ownership Transfer",
        compensationType: "Free",
        price: 0,
        negotiable: true,
        difficulty: "Intermediate",
        lookingFor: "",
        tags: ""
      });

    } catch (error: any) {

      alert(error.response?.data?.message || "Project upload failed");

    }

  };

  return (

    <div className="mx-auto max-w-7xl">

      <div className="mb-6">

        <h1 className="text-3xl font-bold text-white">
          Upload Project
        </h1>

        <p className="mt-2 text-sm text-gray-400">
          Share your repository with the community and find collaborators, buyers or maintainers.
        </p>

      </div>

      <form
        onSubmit={handleSubmit}
        className="space-y-6 rounded-2xl border border-white/10 bg-[#111118] p-5 sm:p-6 lg:p-8"
      >
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-300">Project Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter project title"
            className="w-full rounded-xl border border-white/10 bg-[#181820] px-4 py-3 text-sm text-white outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20" required
          />
        </div>

        <div>
          <label className="mb-2 block text-sm text-gray-300">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Describe your project"
            rows={4}
            className="w-full rounded-xl border border-white/10 bg-[#181820] px-4 py-3 text-white outline-none resize-y"
            required
          />
        </div>

        <div className="grid gap-5 md:grid-cols-2">

          <div>
            <label className="mb-2 block text-sm text-gray-300">Category</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full rounded-xl border border-white/10 bg-[#181820] px-4 py-3 text-sm text-white outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20"
              required
            >
              <option value="">Select Category</option>
              <option>Web Development</option>
              <option>Mobile App</option>
              <option>AI / ML</option>
              <option>Blockchain</option>
              <option>Cyber Security</option>
              <option>Cloud Computing</option>
              <option>Healthcare</option>
              <option>Education</option>
              <option>Finance</option>
              <option>IoT</option>
              <option>Game Development</option>
              <option>Desktop Application</option>
              <option>Open Source</option>
              <option>Other</option>
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm text-gray-300">Difficulty</label>
            <select
              name="difficulty"
              value={formData.difficulty}
              onChange={handleChange}
              className="w-full rounded-xl border border-white/10 bg-[#181820] px-4 py-3 text-sm text-white outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20"
            >
              <option>Beginner</option>
              <option>Intermediate</option>
              <option>Advanced</option>
            </select>
          </div>

        </div>

        <div>
          <label className="mb-2 block text-sm text-gray-300">Tech Stack</label>
          <input
            type="text"
            name="techStack"
            value={formData.techStack}
            onChange={handleChange}
            placeholder="React, Node.js, MongoDB, Express"
            className="w-full rounded-xl border border-white/10 bg-[#181820] px-4 py-3 text-sm text-white outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm text-gray-300">GitHub Repository</label>
          <input
            type="url"
            name="githubLink"
            value={formData.githubLink}
            onChange={handleChange}
            placeholder="https://github.com/username/project"
            className="w-full rounded-xl border border-white/10 bg-[#181820] px-4 py-3 text-sm text-white outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20"
            required
          />
        </div>

        <div>
          <label className="mb-2 block text-sm text-gray-300">Live Demo</label>
          <input
            type="url"
            name="liveLink"
            value={formData.liveLink}
            onChange={handleChange}
            placeholder="https://yourproject.com"
            className="w-full rounded-xl border border-white/10 bg-[#181820] px-4 py-3 text-sm text-white outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm text-gray-300">Project Image URL</label>
          <input
            type="url"
            name="image"
            value={formData.image}
            onChange={handleChange}
            placeholder="https://image-url.com/project.png"
            className="w-full rounded-xl border border-white/10 bg-[#181820] px-4 py-3 text-sm text-white outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm text-gray-300">README / Additional Details</label>
          <textarea
            name="readme"
            value={formData.readme}
            onChange={handleChange}
            rows={6}
            placeholder="Project documentation..."
            className="w-full rounded-xl border border-white/10 bg-[#181820] px-4 py-3 text-white outline-none resize-none"
          />
        </div>

        <div className="grid gap-5 md:grid-cols-2">

          <div>
            <label className="mb-2 block text-sm text-gray-300">Project Type</label>
            <select
              name="projectType"
              value={formData.projectType}
              onChange={handleChange}
              className="w-full rounded-xl border border-white/10 bg-[#181820] px-4 py-3 text-sm text-white outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20"
            >
              <option>Ownership Transfer</option>
              <option>Project Sale</option>
              <option>Collaboration</option>
              <option>Looking For Contributors</option>
              <option>Looking For Maintainer</option>
              <option>Hiring Developers</option>
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm text-gray-300">Compensation Type</label>
            <select
              name="compensationType"
              value={formData.compensationType}
              onChange={handleChange}
              className="w-full rounded-xl border border-white/10 bg-[#181820] px-4 py-3 text-sm text-white outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20"
            >
              <option>Free</option>
              <option>Fixed Price</option>
              <option>Negotiable</option>
              <option>Revenue Sharing</option>
            </select>
          </div>

        </div>

        <div className="grid gap-5 md:grid-cols-2">

          <div>
            <label className="mb-2 block text-sm text-gray-300">Price (₹)</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              placeholder="0"
              min={0}
              className="w-full rounded-xl border border-white/10 bg-[#181820] px-4 py-3 text-sm text-white outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20"
            />
          </div>

          <div className="flex items-center rounded-xl border border-white/10 bg-[#181820] px-4 py-3">
            <label className="flex items-center gap-3 text-sm text-gray-300">
              <input
                type="checkbox"
                name="negotiable"
                checked={formData.negotiable}
                onChange={handleChange}
                className="h-5 w-5 accent-violet-600"
              />
              Negotiable Price
            </label>
          </div>

        </div>

        <div>
          <label className="mb-2 block text-sm text-gray-300">Looking For</label>
          <input
            type="text"
            name="lookingFor"
            value={formData.lookingFor}
            onChange={handleChange}
            placeholder="Frontend Developer, ML Engineer, UI Designer..."
            className="w-full rounded-xl border border-white/10 bg-[#181820] px-4 py-3 text-sm text-white outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm text-gray-300">Tags</label>
          <input
            type="text"
            name="tags"
            value={formData.tags}
            onChange={handleChange}
            placeholder="AI, React, Healthcare, Startup"
            className="w-full rounded-xl border border-white/10 bg-[#181820] px-4 py-3 text-sm text-white outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20"
          />
        </div>

        <div className="rounded-2xl border border-violet-500/20 bg-violet-500/10 p-5 sm:p-6">

          <h3 className="mb-3 text-lg font-semibold text-violet-300">
            Marketplace Preview
          </h3>

          <div className="space-y-2 text-sm leading-7 text-gray-300">

            <p><span className="font-semibold text-white">Title:</span> {formData.title || "Not Added"}</p>

            <p><span className="font-semibold text-white">Category:</span> {formData.category || "Not Selected"}</p>

            <p><span className="font-semibold text-white">Project Type:</span> {formData.projectType}</p>

            <p><span className="font-semibold text-white">Compensation:</span> {formData.compensationType}</p>

            <p><span className="font-semibold text-white">Price:</span> ₹{formData.price}</p>

            <p><span className="font-semibold text-white">Difficulty:</span> {formData.difficulty}</p>

            <p><span className="font-semibold text-white">Looking For:</span> {formData.lookingFor || "Not Specified"}</p>

          </div>

        </div>

        <button
          type="submit"
          className="w-full rounded-xl bg-gradient-to-r from-violet-600 to-purple-600 py-3.5 text-sm font-semibold text-white transition hover:scale-[1.02] hover:shadow-[0_0_25px_rgba(139,92,246,.35)]"
        >
          Upload Project
        </button>

      </form>

    </div>

  );
}